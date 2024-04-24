import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { prepareSocket } from "./controllers/mainSocket";
import { loadConfig } from "./appConfig";

const appConfig = loadConfig();
const app = express();
const server = createServer(app);
const io = new Server(server, appConfig.SOCKET_IO_SERVER_OPTIONS);

app.use("/", express.static("static"));

io.on("connection", (socket) => {
  prepareSocket(socket, io);
});

server.listen(appConfig.PORT, () => {
  console.log("[App] server running");
});
