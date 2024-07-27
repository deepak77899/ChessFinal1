import { useEffect, useRef, useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import {useParams} from 'react-router-dom'
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'




export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';
const GAME_TIME_MS = 10*60*1000;


export default function GameEngine() {
    let { id } = useParams();
    const navigate=useNavigate()
    const intervalRef = useRef();
    let {user}=useSelector(state=>state.auth)
    const {socket}=useSelector(state=>state.game);
    const [winner, setWinner] = useState("");
  const [isGameOver, setGameOver] = useState(false);

  const [chess, _setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
 const [color,setColor]=useState(null);

 const [currentTurn,setCurrentTurn]=useState(null);

 const [player1TimeConsumed,setPlayer1TimeConsumed]=useState(0);
 const [player2TimeConsumed,setPlayer2TimeConsumed]=useState(0);



    function isPromoting(chess, from,to) {

      const piece = chess.get(from);

      if (piece?.type !== "p") {
        return false;
      }

      if (piece.color !== chess.turn()) {
        return false;
      }

      if (!["1", "8"].some((it) => to.endsWith(it))) {
        return false;
      }

  return chess
    .moves({ square: from, verbose: true })
    .map((it) => it.to)
    .includes(to);
}
  useEffect(()=>{


const uID=user._id;
    socket.on('initialize',(data)=>{
        const c=data.color;
        const f=data.fen;
          chess.load(f);
        setColor(c);
        setFen(f);
        const p1TC=data.player1TimeConsumed;
        const p2TC=data.player2TimeConsumed;
        setPlayer1TimeConsumed(p1TC);
        setPlayer2TimeConsumed(p2TC);
        let turn=chess.turn()
      if(turn==='w'){
        setCurrentTurn("White")
      }
      else{
        setCurrentTurn("Black")
      }
        

        

        

    })
     socket.on('time',(payload)=>{
      const  {player1TimeConsumedPayload,player2TimeConsumedPayload}  = payload;
      setPlayer1TimeConsumed(player1TimeConsumedPayload);
      setPlayer2TimeConsumed(player2TimeConsumedPayload);
     })
    socket.emit('message',{
        type:"validate",
        gameId:id,
        userId:uID
    }
    )





    socket.on(MOVE,(payload)=>{
      const  {move,player1TimeConsumedPayload,player2TimeConsumedPayload}  = payload;
      console.log("ye hai samne ka move",move)
      
        try {
          if (isPromoting(chess, move.from, move.to)) {
            chess.move({
              from: move.from,
              to: move.to,
              promotion: 'q',
            });
            if(currentTurn=='White'){
              setCurrentTurn("Black");
            }
            else{
              setCurrentTurn("White");
            }
          } else {
            chess.move({ from: move.from, to: move.to });
            if(currentTurn=='White'){
              setCurrentTurn("Black");
            }
            else{
              setCurrentTurn("White");
            }
          }
        setFen(chess.fen());
        setPlayer1TimeConsumed(player1TimeConsumedPayload);
        setPlayer2TimeConsumed(player2TimeConsumedPayload);
        } catch (error) {
          console.log('Error', error);
        }
    })
    socket.on(GAME_OVER,(result)=>{
      setGameOver(true);
      setWinner(result);
      clearInterval(intervalRef.current);
      console.log('Game Over');
    })
  },[chess,socket]);


  function onDrop(sourceSquare, targetSquare) {
    try {
      if(isGameOver==true)return ;
      let move=null;
   
      if(chess.turn()!=color[0])
   
      return;
      if (isPromoting(chess, sourceSquare, targetSquare)) {
       move=chess.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q',
        });
      } else {
         move=chess.move({ from: sourceSquare, to: targetSquare });
         if(currentTurn==='White'){
          setCurrentTurn("Black");
        }
        else{
          setCurrentTurn("White");
        }
      }
      console.log(chess);
      //Todo socket.emit move.
      socket.emit('message',
        {
            type:"move",
            move: {
                from:sourceSquare,
                to:targetSquare
            },
            gameId:id
        }


      )
      setFen(chess.fen());
      if(move==null)return false;
      return true;
    } catch (error) {
      console.log('Error', error);   
    }
  }
  
  useEffect(() => {
       intervalRef.current = setInterval(() => {

        if (chess.turn() == 'w') {
          setPlayer1TimeConsumed((p) => p + 1000);
        } else {
          setPlayer2TimeConsumed((p) => p + 1000);
        }


      }, 1000);



      return () => clearInterval(intervalRef.current);
  }, [user]);

  useEffect(()=>{

    if(player1TimeConsumed>=GAME_TIME_MS && color=='white'){
      console.log("p1 time > game time");
      clearInterval(intervalRef.current);
      socket.emit('message',
      {
          type:"timeout",
          winner: "black",
          gameId:id
      }


    )
    }

    if(player2TimeConsumed>=GAME_TIME_MS && color=="black"){
      console.log("p2 time > game time");
      clearInterval(intervalRef.current);
      socket.emit('message',
      {
          type:"timeout",
          winner: "white",
          gameId:id
      }


    )
    }

  },[player1TimeConsumed,player2TimeConsumed]);

function resignHandler(){
  socket.emit('message',
    {
        type:"resign",
        winner:color=="white"?"black":"white",
        gameId:id
    })
}
function HomeHandler(){
  navigate('/');
}
  const getTimer = (timeConsumed) => {
    let timeLeftMs = GAME_TIME_MS - timeConsumed;
    if(timeLeftMs<=0)timeLeftMs = 0;
    const minutes = Math.floor(timeLeftMs / (1000 * 60));
    const remainingSeconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);

    return (
      <div className="glass-container p-4 my-4 rounded-lg shadow-lg max-w-20 max-h-8 flex justify-center items-center">
      <div className="text-xl font-bold text-black">
        {minutes < 10 ? '0' : ''}
        {minutes}:{remainingSeconds < 10 ? '0' : ''}
        {remainingSeconds}
      </div>
    </div>
    
    );
  };
  return (<div className="flex flex-col sm:flex-row w-[100%] justify-center items-center">
          <div className="w-[100%] 2xl:max-w-[500px] xl:max-w-[450px] lg:max-w-[400px] md:max-w-[350px] sm:max-w-[300px] max-w-[80%]   ">
  
      

        <div className="flex justify-between items-center">
        <div className="pacifico-regular text-sm md:text-lg lg:text-xl">{chess.turn()=='w'? ('White'):('Black')}'s Turn</div>
           {getTimer(color==="white"?player2TimeConsumed:player1TimeConsumed)}

        </div>

           <Chessboard className="xl:w-[100%] w-[80%]" position={fen}  boardOrientation={color} onPieceDrop={onDrop} />
          <div className="flex justify-end"> {getTimer(color==="black"?player2TimeConsumed:player1TimeConsumed)}</div>
           </div> 
           <div className="flex items-center justify-center flex-col">
                <div className="p-4 pacifico-regular text-xl">{isGameOver?"Winner is ":""}{winner}</div>
                <div className='flex items-center justify-center'>
                { (!isGameOver)?( <button className='mx-5' onClick={resignHandler}>
                  <div class="relative">
              <div class="absolute -inset-5">
                  <div
                      class="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600">
                  </div>
              </div>
              <div
                  class="relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-xs sm:text-sm md:text-md lg:text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Resign
              </div>
                    </div></button>):(
              <button className='mx-5' onClick={HomeHandler} >
                  <div class="relative">
              <div class="absolute -inset-5">
                  <div
                      class="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600">
                  </div>
              </div>
              <div
                  class="relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-xs sm:text-sm md:text-md lg:text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Home
              </div>
              </div></button>
                )}
              </div>
           </div>
          </div>
        );
}