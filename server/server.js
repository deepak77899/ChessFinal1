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
  origin: 'http://localhost:3000', // Specify the allowed origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowing all necessary HTTP methods
}));

// Route setup
app.use("/", router);

// Create HTTP server and attach Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Specify the allowed origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowing all necessary methods
    credentials: true, // Allow credentials (cookies, etc.)
  }
});

// Database connection
require("./config/database").connect();

const gameManager = new GameManager();
const jwt = require('jsonwebtoken');

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("connection hoir hai",userId);
  gameManager.addUser(socket, userId);

  console.log("add user chalra");
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
