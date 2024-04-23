import { Socket } from "socket.io-client";
import { GameState } from "./interfaces/gameState";

export class Game {
  private _game: GameState;

  private _socket: Socket;

  constructor(game: GameState, socket: Socket) {
    this._game = game;
    this._socket = socket;
  }

  private makeMove(column: number) {
    this._socket.emit("gameTick", column);
  }

  public player(): 1 | 2 {
    if (this._socket.id === undefined) throw new Error("No connected");
    return this._game.owner === this._socket.id ? 1 : 2;
  }

  public update(game: GameState) {
    this._game = game;
  }

  public reset() {
    this._socket.emit("resetGame");
  }

  public getGameHTMLElements(errorCallback: CallableFunction) {
    const gameHTMLElement: HTMLDivElement[] = [];
    for (let i = 0; i < this._game.board.length; i++) {
      const column = this._game.board[i];
      const columnHTMLElement = document.createElement("div");
      columnHTMLElement.classList.add("column");
      columnHTMLElement.addEventListener("click", () => {
        if (this.player() !== this._game.turn) {
          errorCallback("No is your turn.");
          return;
        }
        this.makeMove(i);
      });
      for (let j = 0; j < column.length; j++) {
        const cell = column[j];
        const cellHTMLElement = document.createElement("div");
        cellHTMLElement.classList.add("cell");
        if (cell === 1) {
          cellHTMLElement.classList.add("pj1_cell");
        } else if (cell === 2) {
          cellHTMLElement.classList.add("pj2_cell");
        }
        columnHTMLElement.appendChild(cellHTMLElement);
      }
      gameHTMLElement.push(columnHTMLElement);
    }
    return gameHTMLElement;
  }
}
