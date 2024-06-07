import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import io from 'socket.io-client'
import { setColor,setSocket } from '../slices/gameSlice';

const URL = 'http://127.0.0.1:4000/'


function JoinGame() {
    let { id } = useParams();
    const {user}=useSelector(state=>state.auth)
    const myId=user._id
    const navigate=useNavigate()
const dispatch=useDispatch();
const socket = io(URL,{query: {
  "userId": myId
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
    <div className='flex-grow flex items-center justify-center'>
      <button className='mx-5' onClick={HandleCick}>
        <div class="relative">
    <div class="absolute -inset-5">
        <div
            class="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600">
        </div>
    </div>
    <div
        class="relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      >
        Join Game
    </div>
</div></button>
    </div>

  )
}

export default JoinGame