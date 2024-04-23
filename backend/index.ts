import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { prepareSocket } from "./controllers/mainSocket";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use("/", express.static("static"));

io.on("connection", (socket) => {
  prepareSocket(socket, io);
});

server.listen(3000, () => {
  console.log("[App] server running");
});
