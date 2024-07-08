const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json()); //to accept json data from the body
dotenv.config();
connectDB();
app.use(cors());
app.get("/", (req, res) => {
  res.send("api is running");
});
// app.use("/api/chat", chatRoutes);

app.use("/api", userRoutes);

app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));
