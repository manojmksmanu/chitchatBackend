const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config(); // Load environment variables
connectDB(); // Connect to the database

const app = express();
app.use(express.json()); // To accept JSON data from the body
app.use(cors()); // Enable CORS

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // socket is like client all information of client
  console.log("Connected to socket.io hello");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(`User joined room: ${userData._id}`);
    socket.emit("connection");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined chat room: " + room);
  });


  socket.on("new message", (newMessageRecieved) => {
    io.to(newMessageRecieved.chat).emit("messageR", newMessageRecieved);
  });

  // socket.on("disconnect", () => {
  //   console.log("Socket disconnected");
  // });
});
