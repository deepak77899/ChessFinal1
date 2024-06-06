import React from 'react'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate=useNavigate();
  return (
    <div>This is our HomePage
      <button onClick={()=>{
         navigate('/game');
      }}>play</button>
    </div>
  )
}

export default HomePage