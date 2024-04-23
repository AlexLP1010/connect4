import { UUID } from "crypto";
import { Game } from "../game";

export class GameHub {
  private _games: Game[] = [];

  public get games(): UUID[] {
    const games: UUID[] = [];
    for (let idx = 0; idx < this._games.length; idx++) {
      const game = this._games[idx];
      if (!game.player2) games.push(game.uuid);
    }
    return games;
  }

  public getGame(uuid: UUID): Game {
    const gameIdx = this._games.findIndex((game) => (game.uuid = uuid));
    return this._games[gameIdx];
  }

  public joinGame(uuid: UUID, player: string) {
    const idx = this._games.findIndex((g) => g.uuid === uuid);
    const foundGame = this._games[idx];

    foundGame.addPlayer(player);

    return foundGame;
  }

  public createGame(player: string) {
    const newGame = new Game(player);
    this._games.push(newGame);
    return newGame.uuid;
  }
}
