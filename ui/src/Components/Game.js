import React from 'react'
import { useSelector } from 'react-redux'
import GameEngine from './GameEngine'

function Game() {
  return (
    <div className='flex-grow flex items-center justify-center'>
      <GameEngine/>
    </div>
  )
}

export default Game