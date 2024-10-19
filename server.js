import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const players = {};
const tileSize = 32;
const mapWidth = 32;
const mapHeight = 32;

io.on("connection", (socket) => {
  console.log("New player connected:", socket.id);

  const tileX = Math.floor(Math.random() * mapWidth);
  const tileY = Math.floor(Math.random() * mapHeight);
  const randomX = tileX * tileSize + tileSize / 2;
  const randomY = tileY * tileSize + tileSize / 2;

  players[socket.id] = {
    x: randomX,
    y: randomY,
    movementRange: 3,
    attackRange: 1,
    playerId: socket.id,
    speed: 100,
    texture: "princess_walk",
    coolTime: 1000,
    energy: 100,
  };

  socket.emit("CURRENT_PLAYERS", players);

  socket.broadcast.emit("NEW_PLAYER", players[socket.id]);

  socket.on("MOVE_PLAYER", (position) => {
    players[socket.id].x = position.x;
    players[socket.id].y = position.y;
    socket.broadcast.emit("MOVE_PLAYER", players[socket.id]);
  });

  socket.on("COOLTIME_PLAYER", (coolTime) => {
    players[socket.id].coolTime = coolTime;
    socket.broadcast.emit("COOLTIME_PLAYER", players[socket.id]);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
    delete players[socket.id];

    io.emit("PLAYER_DISCONNECT", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`http://localhost:${PORT}`));
