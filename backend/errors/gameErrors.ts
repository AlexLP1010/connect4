export class GameError extends Error {
  public fatal: boolean = false;
  constructor(message: string) {
    super(message);
  }
}
