const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // References to users playing the game
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the winning user
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  // You can add more fields like game settings, moves, etc. as per your requirement
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
