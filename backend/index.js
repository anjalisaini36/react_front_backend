const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 3001;
// app.use(express.json());

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.once("open", () => {
  console.log("connected");
});

io.on("connection", (socket) => {
  console.log(`User Connected:${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User Connected with:${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // socket.emit("receive_message",data);
    console.log("data message:", data);
  });

  // socket.on("recieve_message",(data)=>{
  //   console.log("recievemsg", data);
  // })

  socket.on("disconnect", () => {
    console.log("User Disconnect", socket.id);
  });
});
server.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
