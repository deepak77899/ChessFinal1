import React, { useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import io from 'socket.io-client'
import { useDispatch,useSelector } from 'react-redux'
import { setColor ,setSocket} from "../slices/gameSlice";

const URL = 'http://127.0.0.1:4000'





function CreateGame() {
  const dispatch=useDispatch();
    let { id } = useParams();
const navigate=useNavigate();

const socket = io(URL,{query: {
  "userId": id
}})


dispatch(setSocket(socket));

useEffect(()=>{
    
socket.emit('message',{
  type: "create_game"
})

socket.on('INIT_GAME',(data)=>{
  const GameId=data.gameId;
  const color=data.color;
  dispatch(setColor(color));


  navigate(`/game/${GameId}`)
 })


},[id])



  return (
     <div>
   <div>{`http://localhost:3000/join_game/${id}`}
   </div>
     
     </div>
    
    
  )
}

export default CreateGame