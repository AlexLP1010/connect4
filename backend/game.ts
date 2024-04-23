import { UUID, randomUUID } from "crypto";
import { GameError } from "./errors/gameErrors";
import { GameBoard } from "./gameBoard";
import { GameResume } from "./interfaces/gameResume";

export class Game {
  private board;

  private _player1;

  public get player1(): string {
    return this._player1;
  }

  private _player2!: string;

  public get player2(): string {
    return this._player2;
  }

  private turn: 1 | 2 = 1;

  private _winer: 0 | 1 | 2 = 0;

  public uuid: UUID;

  constructor(player1: string) {
    this._player1 = player1;
    this.board = new GameBoard();
    this.uuid = randomUUID();
  }

  public reset() {
    this._winer = 0;
    this.board.reset();
  }

  public addPlayer(player: string) {
    if (this.player2) throw new GameError("Only 2 players per game.");
    this._player2 = player;
  }

  makeMove(column: number) {
    if (!this._player2) throw new GameError("Need 2 players to make a move.");
    this.board.makeMove(this.turn, column);
    this.turn = this.turn === 1 ? 2 : 1;
    const winer = this.board.checkWinner();
    if (winer === 1 || winer === 2) this._winer = winer;
    return winer;
  }

  public getResume(): GameResume {
    return {
      winer: this._winer,
      turn: this.turn,
      board: this.board.board,
      owner: this.player1,
    };
  }
}
