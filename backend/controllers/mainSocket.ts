import { Server, Socket } from "socket.io";
import { GameHub } from "./gameHub";

const gameHub = new GameHub();

export function prepareSocket(socket: Socket, server: Server) {
  socket.emit("gameList", gameHub.games);

  socket.on("join", (game, player) => {
    const playingGame = gameHub.getGame(game);
    gameHub.joinGame(game, player);
    socket.join(game);
    server.emit("gameList", gameHub.games);
    server.to(game).emit("gameTick", playingGame.getResume());
    socket.on("gameTick", (column: number) => {
      playingGame.makeMove(column);
      server.to(game).emit("gameTick", playingGame.getResume());
    });
    socket.on("resetGame", () => {
      playingGame.reset();
      server.to(game).emit("gameTick", playingGame.getResume());
    });
  });

  socket.on("createGame", () => {
    const game = gameHub.createGame(socket.id);
    const playingGame = gameHub.getGame(game);
    socket.join(game);
    server.to(game).emit("gameTick", playingGame.getResume());
    server.emit("gameList", gameHub.games);
    socket.on("gameTick", (column: number) => {
      playingGame.makeMove(column);
      server.to(game).emit("gameTick", playingGame.getResume());
    });
    socket.on("resetGame", () => {
      playingGame.reset();
      server.to(game).emit("gameTick", playingGame.getResume());
    });
  });
}
