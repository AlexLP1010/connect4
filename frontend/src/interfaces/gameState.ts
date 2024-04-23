export interface GameState {
  board: number[][];
  winer: 0 | 1 | 2;
  turn: 1 | 2;
  owner: string;
}
