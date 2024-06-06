const { Server } = require('socket.io');
const {
  GAME_OVER,
  INIT_GAME,
  JOIN_GAME,
  MOVE,
  OPPONENT_DISCONNECTED,
  JOIN_ROOM,
  GAME_JOINED,
  GAME_NOT_FOUND,
  GAME_ALERT,
  GAME_ADDED,
  GAME_ENDED,
  Create_Game
} =require('./messages');
const { Game } =require('./Game');

 class GameManager {

  constructor(io) {
    this.io = io;
    this.games = [];
    this.waitingPlayers = [];
    this.users = [];

  }

  addUser(socket,userId) {
  
    this.users.push(userId);
    this.addHandler(socket,userId);
  }

  removeUser(socket) {
    const user = this.users.find((user) => user.socket === socket);
    if (!user) {
      console.error('User not found?');
      return;
    }
    this.users = this.users.filter((user) => user.socket !== socket);
    SocketManager.getInstance().removeUser(user);
  }

  removeGame(gameId) {
    this.games = this.games.filter((g) => g.gameId !== gameId);
  }

  addHandler(socket,userId) {

    socket.on('message', async (data) => {
      console.log("data check k rhe",data)

      // const message = JSON.parse(data.toString())
const message=data;
console.log("yuhuuu",message.type)
      if(message.type === "create_game"){

        console.log("game create hori",socket.id,userId)
        this.waitingPlayers.push([userId,socket])
        console.log(this.waitingPlayers[0][0])

      }

     
      if (message.type === "join_game") {
console.log(data);
            const waitingPlayer=this.waitingPlayers.find((x)=> x[0]===message.opponent)
            const game=new Game(waitingPlayer[1],socket);
            console.log(waitingPlayer[1]);
            this.games.push(game); 
            console.log("game create ho gyi",this.games[0].gameId)

      }
 

      if (message.type === "move") {
        const gameId = message.gameId;
        const game = this.games.find((game) => game.gameId === gameId);
        if (game) {
          game.makeMove(socket, message.move);
          if (game.result) {
            this.removeGame(game.gameId);
          }
        }
      }

      
    
    });
  }
}

module.exports={GameManager}