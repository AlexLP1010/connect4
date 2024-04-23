import { test, expect, describe } from "@jest/globals";
import { GameBoard } from "./gameBoard";

describe("GameBoard", () => {
  const gameBoard = new GameBoard();
  test("Make valid move", () => {
    expect(gameBoard.makeMove(1, 2)).toBeTruthy();
  });

  function makeInvalidMove() {
    gameBoard.makeMove(1, 7);
  }
  test("Make invalid move", () => {
    expect(makeInvalidMove).toThrow();
  });
});

describe("Check winer", () => {
  let gameBoard = new GameBoard();

  function playGameVertical() {
    gameBoard = new GameBoard();
    gameBoard.makeMove(1, 1);
    gameBoard.makeMove(2, 0);
    gameBoard.makeMove(1, 1);
    gameBoard.makeMove(2, 0);
    gameBoard.makeMove(1, 1);
    gameBoard.makeMove(2, 0);
    gameBoard.makeMove(1, 1);
  }

  function playGameHorizontal() {
    gameBoard = new GameBoard();
    gameBoard.makeMove(1, 1);
    gameBoard.makeMove(2, 0);
    gameBoard.makeMove(1, 2);
    gameBoard.makeMove(2, 0);
    gameBoard.makeMove(1, 3);
    gameBoard.makeMove(2, 0);
    gameBoard.makeMove(1, 4);
  }

  function playGameHorizontalMixed() {
    gameBoard = new GameBoard();
    gameBoard.makeMove(2, 0);
    gameBoard.makeMove(1, 1);
    gameBoard.makeMove(2, 0);
    gameBoard.makeMove(1, 0);
    gameBoard.makeMove(2, 1);
    gameBoard.makeMove(1, 0);
  }

  function playGameHorizontalMixedRight() {
    gameBoard = new GameBoard();
    gameBoard.makeMove(2, 4);
    gameBoard.makeMove(1, 5);
    gameBoard.makeMove(2, 4);
    gameBoard.makeMove(1, 4);
    gameBoard.makeMove(2, 5);
    gameBoard.makeMove(1, 4);
  }

  function playGameDiagonal() {
    gameBoard = new GameBoard();
    gameBoard.makeMove(1, 1);
    gameBoard.makeMove(2, 2);
    gameBoard.makeMove(1, 2);
    gameBoard.makeMove(2, 3);
    gameBoard.makeMove(1, 3);
    gameBoard.makeMove(2, 4);
    gameBoard.makeMove(1, 3);
    gameBoard.makeMove(2, 4);
    gameBoard.makeMove(1, 1);
    gameBoard.makeMove(2, 4);
    gameBoard.makeMove(1, 4);
  }

  test("Win vertical", () => {
    playGameVertical();
    expect(gameBoard.checkWinner()).toBe(1);
  });

  test("Win horizontal", () => {
    playGameHorizontal();
    expect(gameBoard.checkWinner()).toBe(1);
  });

  test("Win diagonal", () => {
    playGameDiagonal();
    expect(gameBoard.checkWinner()).toBe(1);
  });

  test("Nobody wins", () => {
    playGameHorizontalMixed();
    expect(gameBoard.checkWinner()).toBe(0);
  });

  test("Nobody wins", () => {
    playGameHorizontalMixedRight();
    expect(gameBoard.checkWinner()).toBe(0);
  });
});
