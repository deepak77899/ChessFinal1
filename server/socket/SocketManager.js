export class SocketManager {
    static instance;
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new SocketManager();
      }
      return this.instance;
    }
  
    constructor() {
      this.socketRooms = new Map();
    }
  
    addSocketToRoom(room, socket) {
      if (!this.socketRooms.has(room)) {
        this.socketRooms.set(room, new Set());
      }
      this.socketRooms.get(room).add(socket);
      socket.join(room);
    }
  
    removeSocketFromRoom(room, socket) {
      if (this.socketRooms.has(room)) {
        this.socketRooms.get(room).delete(socket);
        socket.leave(room);
        if (this.socketRooms.get(room).size === 0) {
          this.socketRooms.delete(room);
        }
      }
    }
  
    broadcast(room, message) {
      if (this.socketRooms.has(room)) {
        this.socketRooms.get(room).forEach((socket) => {
          socket.send(message);
        });
      }
    }
  }
  