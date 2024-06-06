


import React from 'react'
import { useSelector } from 'react-redux'
import GameEngine from './GameEngine'

function Game() {
  const { color,socket } = useSelector((state) => state.game);

  return (
    <GameEngine/>
  )
}

export default Game