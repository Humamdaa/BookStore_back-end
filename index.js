require("dotenv").config();
const express = require("express");
const http = require("http"); // Import http to create the server
const socketIo = require("socket.io"); // Import Socket.IO
const cors = require("cors");
const connect_to_DB = require("./db");

const app = express();
const setupRoutes = require("./routes/ImportedRoutes");

// Database connection
connect_to_DB();

// Middleware
app.use(express.json());
app.use(cors());

// Setup all routes in one go
setupRoutes(app);

// Create an HTTP server to handle requests
const server = http.createServer(app); // Pass express app to HTTP server

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies)
  },
});
// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  // You can listen for custom events from the client if needed
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start server
const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`Listening on port ${port}...`));
