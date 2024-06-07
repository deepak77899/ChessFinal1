import { useEffect, useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import {useParams,useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import { setSocket,setColor } from "../slices/gameSlice";
import { useDispatch } from "react-redux";





export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';


export default function GameEngine() {
    let { id } = useParams();
    let {user}=useSelector(state=>state.auth)
    const {socket}=useSelector(state=>state.game);

  const [chess, _setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
 const [color,setColor]=useState(null);

 const [currentTurn,setCurrentTurn]=useState(null);

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
        let turn=chess.turn()
      if(turn==='w'){
        setCurrentTurn("White")
      }
      else{
        setCurrentTurn("Black")
      }
        

        

        

    })

    socket.emit('message',{
        type:"validate",
        gameId:id,
        userId:uID
    }
    )





    socket.on(MOVE,(payload)=>{
      const  move  = payload;
      console.log("ye hai samne ka move",move)
      
        try {
          if (isPromoting(chess, move.from, move.to)) {
            chess.move({
              from: move.from,
              to: move.to,
              promotion: 'q',
            });
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
        } catch (error) {
          console.log('Error', error);
        }
    })
    socket.on(GAME_OVER,(result)=>{
            navigate('/');         

    })
  },[chess,socket]);


  function onDrop(sourceSquare, targetSquare) {
    try {
      let move=null;
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
  
  if (!socket) return <div>Connecting...</div>;
  return <div className="w-[500px]">
  <div>{currentTurn}'s Turn</div>
           <Chessboard position={fen}  boardOrientation={color} onPieceDrop={onDrop} />
        </div>;
}