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
    // <div>This is our HomePage
    //   <button onClick={()=>{
    //      navigate('/game');
    //   }}>play</button>
    // </div>
    user? ( <div>

      <button onClick={HandleCreate}>create game</button>
      <br/>
      <button onClick={HandleJoin}> Join Game</button>

    </div>): (<div> login karo</div>)

  )
}

export default HomePage