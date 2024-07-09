import { useEffect, useInsertionEffect, useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import {useParams,useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import { setSocket,setColor } from "../slices/gameSlice";
import { useDispatch } from "react-redux";





export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';
const GAME_TIME_MS = 10*60*1000;


export default function GameEngine() {
    let { id } = useParams();
    let {user}=useSelector(state=>state.auth)
    const {socket}=useSelector(state=>state.game);

  const [chess, _setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
 const [color,setColor]=useState(null);

 const [currentTurn,setCurrentTurn]=useState(null);

 const [player1TimeConsumed,setPlayer1TimeConsumed]=useState(0);
 const [player2TimeConsumed,setPlayer2TimeConsumed]=useState(0);

 const dispatch=useDispatch();
 const navigate=useNavigate();


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
           alert(result)       

    })
  },[chess,socket]);


  function onDrop(sourceSquare, targetSquare) {
    try {
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
      const interval = setInterval(() => {

        if (chess.turn() == 'w') {
          setPlayer1TimeConsumed((p) => p + 1000);
        } else {
          setPlayer2TimeConsumed((p) => p + 1000);
        }


      }, 1000);



      return () => clearInterval(interval);
  }, [user]);

  useEffect(()=>{

    if(player1TimeConsumed>=GAME_TIME_MS){
      socket.emit('message',
      {
          type:"timeout",
          winner: "black",
          gameId:id
      }


    )
    }

    if(player2TimeConsumed>=GAME_TIME_MS){
      socket.emit('message',
      {
          type:"timeout",
          winner: "white",
          gameId:id
      }


    )
    }

  },[player1TimeConsumed,player2TimeConsumed])


  const getTimer = (timeConsumed) => {
    const timeLeftMs = GAME_TIME_MS - timeConsumed;
    const minutes = Math.floor(timeLeftMs / (1000 * 60));
    const remainingSeconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);

    return (
      <div className="text-black">
        Time Left: {minutes < 10 ? '0' : ''}
        {minutes}:{remainingSeconds < 10 ? '0' : ''}
        {remainingSeconds}
      </div>
    );
  };

  if (!socket) return <div>Connecting...</div>;
  return <div className="w-[500px]">
  <div>{chess.turn()=='w'? ('White'):('Black')}'s Turn</div>
      

        
           {getTimer(color==="white"?player2TimeConsumed:player1TimeConsumed)}
           <Chessboard position={fen}  boardOrientation={color} onPieceDrop={onDrop} />
           {getTimer(color==="black"?player2TimeConsumed:player1TimeConsumed)}
        </div>;
}