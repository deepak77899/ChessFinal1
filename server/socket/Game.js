const { Chess } =require('chess.js');

const { GAME_ENDED, INIT_GAME, MOVE }=require('./messages');
const { randomUUID }=require( 'crypto');

class Game {
  constructor(player1UserId, player2UserId, player1mongo, player2mongo) {
    this.player1UserId = player1UserId;
    this.player2UserId = player2UserId;
    this.player1mongo=player1mongo;
    this.player2mongo=player2mongo;
    this.board = new Chess();
    this.gameId =  randomUUID();
    this.moveCount = 0;
    this.timer = null;
    this.moveTimer = null;
    this.result = null;
    this.player1TimeConsumed = 0;
    this.player2TimeConsumed = 0;
    this.startTime = new Date(Date.now());
    this.lastMoveTime = this.startTime;
    


    this.player1UserId.emit('INIT_GAME',{
      gameId:this.gameId,
      color:"white"
    })

    this.player2UserId.emit('INIT_GAME',{
      gameId:this.gameId,
      color:"black"
    })

  }

  async makeMove(socket, move) {
    // validate the type of move using zod

    if (this.moveCount%2 === 0 && socket.id !== this.player1UserId.id) {
      return;
    }
  
    if (this.moveCount%2 ===1 && socket.id !== this.player2UserId.id) {
      return;
    }
  


  
    try {
     this.board.move(move)
    } catch (e) {
      console.error("Error while making move");
      return;
    }


  
  
    if (this.board.isGameOver()) {
      const result = this.board.isDraw()
        ? 'DRAW'
        : this.board.turn() === 'b'
          ? 'WHITE_WINS'
          : 'BLACK_WINS';

          this.player1UserId.emit("game_over",result);
          this.player2UserId.emit('game_over',result);
  
    }
    console.log(this.moveCount)

    console.log("ye hai move",move)
    if((this.moveCount%2)===0){
      console.log("hamara phela move");
      this.player2UserId.emit('move',move);
    }
    else
    {
      console.log("hamara dusra move");
      this.player1UserId.emit('move',move);
    }

    
  
    this.moveCount++;
  }
  
}


module.exports={Game}