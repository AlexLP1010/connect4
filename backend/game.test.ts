import { describe, test } from "@jest/globals";
import { Game } from "./game";

describe("Adding players", () => {
  test("Make move with one player", () => {
    const game = new Game("p1");
    function makeMove() {
      game.makeMove(1);
    }

    expect(makeMove).toThrow();
  });

  test("Add a player", () => {
    const game = new Game("p1");
    game.addPlayer("p2");
    expect(game.player2).toBe("p2");
  });

  test("Add 3 players", () => {
    const game = new Game("p1");
    function add3Players() {
      game.addPlayer("p2");
      game.addPlayer("p3");
    }
    expect(add3Players).toThrow();
  });
});
