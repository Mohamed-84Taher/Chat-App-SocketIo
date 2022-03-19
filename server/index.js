const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const app = express();

app.use(router);

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", socket => {
  console.log("user a connected");
  socket.on("join", ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return cb(error);
    socket.emit("message", {
      user: "admin",
      text: `${user.name} ,welcom to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} ,has jointed` });
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    cb();
  });
  socket.on("sendMessage", ({ message }, cb) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    cb();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: user.name,
        text: `${user.name} has left.`,
      });
    }
  });
});

server.listen(port, () => console.log(`server has started on port ${port}`));
