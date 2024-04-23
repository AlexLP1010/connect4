import { CellState } from "../gameBoard";

export interface GameResume {
  board: CellState[][];
  winer: 0 | 1 | 2;
  turn: 1 | 2;
  owner: string;
}
