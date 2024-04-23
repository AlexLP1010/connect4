import { GameError } from "./errors/gameErrors";

export enum CellState {
  "Empty",
  "Red",
  "Yellow",
}

export class GameBoard {
  private _board: CellState[][];

  public get board(): CellState[][] {
    return this._board;
  }

  constructor() {
    const board: CellState[][] = [];
    for (let i = 0; i < 7; i++) {
      board[i] = [];
      for (let j = 0; j < 6; j++) {
        board[i][j] = CellState.Empty;
      }
    }
    this._board = board;
  }

  private serachEmpty(column: number): number {
    let res = -1;
    if (this._board[column] === undefined) {
      throw new GameError(`The selected column isn't exists.`);
    }
    for (let idx = this._board[column].length - 1; idx >= 0; idx--) {
      const cell = this._board[column][idx];
      if (cell === CellState.Empty) {
        res = idx;
        break;
      }
    }
    return res;
  }

  private checkDiagonal(column: number, row: number) {
    if (row > 2 || row < 0) return 0;
    if (column > 6 || column < 3) return 0;
    if (this._board[column][row] === CellState.Empty) return 0;
    let lastCell = this._board[column][row];
    const lastPosition = column - 4;
    for (
      const pos = { x: column - 1, y: row + 1 };
      pos.x > lastPosition;
      pos.x--, pos.y++
    ) {
      const currentCell = this._board[pos.x][pos.y];
      if (currentCell !== lastCell) return 0;
    }
    return this._board[column][row];
  }

  private checkInverterDiagonal(column: number, row: number) {
    if (row > 2 || row < 0) return 0;
    if (column > 3 || column < 0) return 0;
    if (this._board[column][row] === CellState.Empty) return 0;
    let lastCell = this._board[column][row];
    const lastPosition = column + 4;
    for (
      const pos = { x: column + 1, y: row + 1 };
      pos.x < lastPosition;
      pos.x++, pos.y++
    ) {
      const currentCell = this._board[pos.x][pos.y];
      if (currentCell !== lastCell) return 0;
    }
    return this._board[column][row];
  }

  makeMove(player: 1 | 2, column: number): boolean {
    const emptyCell = this.serachEmpty(column);
    this._board[column][emptyCell] = player;
    return true;
  }

  /**
   * Check if the board has 4 alingning game pices
   * @returns 1 if player 1 wins, 2 if player 2 wins and 0 if there is no winer
   */
  checkWinner(): number {
    // Vertical
    const status = { selected: CellState.Empty, count: 0 };
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board[i].length; j++) {
        const cell = this._board[i][j];
        if (cell === CellState.Empty) {
          status.selected = CellState.Empty;
          status.count = 0;
        } else {
          if (status.selected === cell) status.count++;
          else {
            status.selected = cell;
            status.count = 1;
          }
        }
        if (status.count >= 4) {
          return status.selected;
        }
      }
    }

    // Horizontal
    status.selected = CellState.Empty;
    status.count = 0;
    for (let i = 0; i < this._board[0].length; i++) {
      for (let j = 0; j < this._board.length; j++) {
        const cell = this._board[j][i];
        if (cell === CellState.Empty) {
          status.selected = CellState.Empty;
          status.count = 0;
        } else {
          if (status.selected === cell) status.count++;
          else {
            status.selected = cell;
            status.count = 1;
          }
        }
        if (status.count >= 4) {
          return status.selected;
        }
      }
    }

    // Diagonals
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board[j].length; j++) {
        const d1 = this.checkDiagonal(i, j);
        const d2 = this.checkInverterDiagonal(i, j);
        if (d1 !== 0) {
          return d1;
        }
        if (d2 !== 0) {
          return d2;
        }
      }
    }
    return 0;
  }

  public reset() {
    const board: CellState[][] = [];
    for (let i = 0; i < 7; i++) {
      board[i] = [];
      for (let j = 0; j < 6; j++) {
        board[i][j] = CellState.Empty;
      }
    }
    this._board = board;
  }
}
