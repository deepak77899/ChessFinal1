import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function HomePage() {
  const navigate=useNavigate();
  const { user } = useSelector((state) => state.auth);

  const HandleCreate=(e)=>{
    
    navigate(`/create_game/`+user._id)

  }

  const HandleJoin=(e)=>{
    
    navigate(`/join_game`);

  }

  return (
    user? ( <div className='flex-grow flex items-center justify-center'>

      <button className='mx-5' onClick={HandleCreate}>
        <div class="relative">
    <div class="absolute -inset-5">
        <div
            class="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600">
        </div>
    </div>
    <div
        class="relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      >
        Create Game
    </div>
</div></button>
      <br/>
      <button className='mx-5' onClick={HandleJoin}> 
        <div class="relative">
    <div class="absolute -inset-5">
        <div
            class="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600">
        </div>
    </div>
    <div
        class="relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        role="button">
        Join Game
    </div>
</div></button>

    </div>): (<div className='flex-grow flex items-center justify-center'> 
      <img src="/7.png" width="500px" alt="cover image" className='mx-auto rounded-lg shadow-lg' />
      <h1 className='pacifico-regular mt-8 text-4xl font-bold text-gray-800 mx-auto'>Welcome to <span>Chessify.com</span></h1>
    </div>)

  )
}

export default HomePage