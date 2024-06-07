// const { Server } = require('socket.io');
// const {
//   GAME_OVER,
//   INIT_GAME,
//   JOIN_GAME,
//   MOVE,
//   OPPONENT_DISCONNECTED,
//   JOIN_ROOM,
//   GAME_JOINED,
//   GAME_NOT_FOUND,
//   GAME_ALERT,
//   GAME_ADDED,
//   GAME_ENDED,
//   Create_Game
// } =require('./messages');
// const { Game } =require('./Game');

//  class GameManager {

//   constructor(io) {
//     this.io = io;
//     this.games = [];
//     this.waitingPlayers = new Map();;
//     this.users = [];
//   }

//   addUser(socket,userId) {
  
//     this.users.push(userId);
//     this.addHandler(socket,userId);
//   }

//   removeUser(socket) {
//     const user = this.users.find((user) => user.socket === socket);
//     if (!user) {
//       console.error('User not found?');
//       return;
//     }
//     this.users = this.users.filter((user) => user.socket !== socket);
//     SocketManager.getInstance().removeUser(user);
//   }

//   removeGame(gameId) {
//     this.games = this.games.filter((g) => g.gameId !== gameId);
//   }

//   addHandler(socket,userId) {

//     socket.on('message', async (data) => {
//       console.log("data check k rhe",data)

//       // const message = JSON.parse(data.toString())
// const message=data;
// console.log("yuhuuu",message.type)
//       if(message.type === "create_game"){

//         console.log("game create hori",socket.id,userId)
//         this.waitingPlayers.set(userId, socket);
//         console.log(this.waitingPlayers.keys());

//       }
 
//         if (message.type === "join_game") {
//         console.log("Joining game:", data);
//         const opponentSocket = this.waitingPlayers.get(message.opponent);
//         if (opponentSocket) {
//           const game = new Game(opponentSocket, socket);
//           this.games.push(game);
//           console.log("Game created:", this.games[0].gameId);
//           this.waitingPlayers.delete(message.opponent); // Remove the opponent from the waiting list
//         } else {
//           console.error("Opponent not found");
//         }
//         }

//       if (message.type === "move") {
//         const gameId = message.gameId;
//         const game = this.games.find((game) => game.gameId === gameId);
//         if (game) {
//           game.makeMove(socket, message.move);
//           if (game.result) {
//             this.removeGame(game.gameId);
//           }
//         }
//       }
//       if(message.type==="game_over"){
//         const gameId=message.gameId;
//       }
      
    
//     });
//   }
// }

// module.exports={GameManager}

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
} = require('./messages');
const { Game } = require('./Game');

class GameManager {
  constructor(io) {
    this.io = io;
    this.games = new Map();
    this.waitingPlayers = new Map();
    this.users = new Map();
  }

  addUser(socket, userId) {
    this.users.set(userId, socket);
    this.addHandler(socket, userId);
  }

  removeUser(socket) {
    const userId = Array.from(this.users.keys()).find(userId => this.users.get(userId) === socket);
    if (!userId) {
      console.error('User not found?');
      return;
    }
    this.users.delete(userId);
    SocketManager.getInstance().removeUser({ userId, socket });
  }

  removeGame(gameId) {
    this.games.delete(gameId);
  }

  addHandler(socket, userId) {
    socket.on('message', async (data) => {
      console.log("data check k rhe", data, " aur meri user id", userId);

      const message = data;

      if (message.type === "create_game") {
        console.log("game create hori", socket.id, userId);
        this.waitingPlayers.set(userId, socket);
      }

      if (message.type === "join_game") {
        const waitingPlayerSocket = this.waitingPlayers.get(message.opponent);

        if (waitingPlayerSocket) {
          const game = new Game(waitingPlayerSocket, socket, message.opponent, userId);

          this.games.set(game.gameId, game);
          this.waitingPlayers.delete(message.opponent);

          console.log("game create ho gyi", game.gameId);
        }
      }

      if (message.type === "move") {
        const gameId = message.gameId;
        const game = this.games.get(gameId);
        if (game) {
          game.makeMove(socket, message.move);
          if (game.result) {
            this.removeGame(game.gameId);
          }
        }
      }

      if (message.type === 'validate') {
        const gameId = message.gameId;
        const game = this.games.get(gameId);
        if (game) {
          console.log("ye hai hamari game", game.gameId, " ", game.player1mongo, " ", game.player2mongo);
          if (message.userId == game.player1mongo) {
            game.player1UserId = socket;
            socket.emit('initialize', {
              color: "white",
              fen: game.board.fen(),
            });
          } else if (message.userId == game.player2mongo) {
            game.player2UserId = socket;
            socket.emit('initialize', {
              color: "black",
              fen: game.board.fen(),
            });
          } else {
            console.log("not this user's game");
            return;
          }
        }
      }
      if(message.type==='sendGameReq'){
        const friendId=message.friendId;
        const friendSocket=this.users.get(friendId);

        if(friendSocket){
          friendSocket.emit('recieveGameReq',{
            reqId:userId
          })
        }



      }


    });
  }
}

module.exports = { GameManager };