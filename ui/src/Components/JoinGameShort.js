import React, { useState ,useEffect} from 'react';

import { useSelector,useDispatch } from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import { setColor} from '../slices/gameSlice';

function JoinGameShort() {
    const [inputValue, setInputValue] = useState('');
    const navigate=useNavigate()
    const dispatch=useDispatch();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    
      const handleJoinButtonClick = () => {
        console.log("join click on short uuid");
        console.log(inputValue);
        socket.emit('message',
            {
                type:"join_game_uuid",
                shortgameid:inputValue
            })
      };
      useEffect(()=>{
        socket.on('INIT_GAME',(data)=>{
        const GameId=data.gameId;
        const color=data.color;
        dispatch(setColor(color));
        navigate(`/game/${GameId}`)
        })
    },[])
const {socket}=useSelector(state=>state.game);

  return (
    <div className='flex-grow flex items-center justify-center flex-col sm:flex-row'>
         <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Paste something here"
      />
      <button className='mx-5 mt-10 sm:mt-0' onClick={handleJoinButtonClick}>
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

export default JoinGameShort