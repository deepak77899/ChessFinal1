import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import io from 'socket.io-client'
import { setColor,setSocket } from '../slices/gameSlice';

const URL = 'http://127.0.0.1:4000/'


function JoinGame() {
    let { id } = useParams();
    const navigate=useNavigate()
const dispatch=useDispatch();
const socket = io(URL,{query: {
  "userId": id
}})


dispatch(setSocket(socket));

    useEffect(()=>{
        socket.on('INIT_GAME',(data)=>{
const GameId=data.gameId;
const color=data.color;
dispatch(setColor(color));
navigate(`/game/${GameId}`)
        })
    },[id])

    const HandleCick=(e)=>{


        socket.emit('message',{
            type:"join_game",
            opponent:id
        })


    }


  return (
    <buttom onClick={HandleCick}>JoinGame</buttom>
  )
}

export default JoinGame