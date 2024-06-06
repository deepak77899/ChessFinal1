const express = require('express');
const app = express();
const router = require('./Routes/router');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const { createServer } = require('http'); // Correct import for HTTP server
const { GameManager } = require('./socket/GameManager.js');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    credentials: true
}));

// Route setup


// Create HTTP server and attach Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your client's URL
    methods: ["GET", "POST"],     // HTTP methods allowed
    allowedHeaders: ["my-custom-header"], // Custom headers allowed
    credentials: true             // Whether to allow credentials (cookies, etc.)
  }
});
app.use("/", router);

// Database connection
require("./config/database").connect();



const gameManager = new GameManager();
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
io.on('connection', (socket) => {

  const userId = socket.handshake.query.userId;



  gameManager.addUser(socket, userId);

console.log("add user chalra");
  console.log('a user connected');
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
