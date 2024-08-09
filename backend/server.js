const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();
const allowedOrigins = ["*", "https://chit-chat-newfrontend.vercel.app"];
const app = express();
app.use(express.json());
app.use(cors());

app.get("/status", (req, res) => {
  res.send({ status: "API is running" });
});
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

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
    console.log(newMessageRecieved);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    // due to this socket.in(room) only reciver can get this emit('stop typing')
    socket.in(room).emit("stop typing");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});
