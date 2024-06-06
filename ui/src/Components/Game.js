import { useEffect, useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
const socket  = require('../Connection/socket').socket;

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';


export default function Game(props) {
  const [chess, _setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());


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
    socket.on(INIT_GAME,()=>{
      _setChess(new Chess());
      setFen(chess.fen());
    })
    socket.on(MOVE,(payload)=>{
      const { move } = payload;
        try {
          if (isPromoting(chess, move.from, move.to)) {
            chess.move({
              from: move.from,
              to: move.to,
              promotion: 'q',
            });
          } else {
            chess.move({ from: move.from, to: move.to });
          }
        setFen(chess.fen());
        } catch (error) {
          console.log('Error', error);
        }
    })
    socket.on(GAME_OVER,()=>{
      console.log("gameover");
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
      }
      console.log(chess);
      //Todo socket.emit move.
      setFen(chess.fen());
      if(move==null)return false;
      return true;
    } catch (error) {
      console.log('Error', error);
    }
  }
  
  if (!socket) return <div>Connecting...</div>;
  return <div className="w-[500px]">
           <Chessboard position={fen}  boardOrientation={props.color} onPieceDrop={onDrop} />
        </div>;
}