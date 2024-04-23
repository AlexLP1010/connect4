import { io } from "socket.io-client";
import { Game } from "./game";
import { GameState } from "./interfaces/gameState";

const gameListElements = document.getElementById("gameList");
const createGameBtn = document.getElementById("createGameBtn");
const hubElement = document.getElementById("hub");
const gameElement = document.getElementById("mainGame");
const p1Text = document.getElementById("p1Text");
const p2Text = document.getElementById("p2Text");
const gameBoard = document.getElementById("gameBoard");
const winnerText = document.getElementById("winnerText");
const winnerPopup = document.getElementById("winnerPopup");
const resetBtn = document.getElementById("resetBtn");
const playerLeyend1 = document.getElementById("playerLeyend1");
const playerLeyend2 = document.getElementById("playerLeyend2");
const gameMessage = document.getElementById("gameMessage");

const backendUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.BASE_URL;
const socket = io(backendUrl);

let gameList: string[] = [];
let game: Game | null = null;

socket.on("gameList", (games) => {
  gameList = games;
  renderGameList();
});

function showError(message: string) {
  if (gameMessage !== null) {
    gameMessage.classList.remove("hide");
    gameMessage.innerHTML = `<p>${message}</p>`;
    setTimeout(() => {
      gameMessage.classList.add("hide");
    }, 1000);
  }
}

socket.on("gameTick", (gameState: GameState) => {
  if (socket.id === undefined) return;
  if (
    p1Text === null ||
    p2Text === null ||
    gameBoard === null ||
    winnerText === null ||
    winnerPopup === null ||
    playerLeyend1 === null ||
    playerLeyend2 === null
  )
    return;

  if (game === null) {
    game = new Game(gameState, socket);
  } else {
    game.update(gameState);
  }

  if (gameState.winer !== 0) {
    winnerPopup.classList.remove("hide");
    winnerText.innerText = `Player ${gameState.winer} wins!`;
  } else {
    winnerPopup.classList.add("hide");
  }

  if (game.player() === 1) {
    p1Text.innerText = "Player 1 (you)";
    p2Text.innerText = "Player 2";
  } else {
    p1Text.innerText = "Player 1";
    p2Text.innerText = "Player 2 (you)";
  }

  if (gameState.turn === 1) {
    playerLeyend1.classList.add("actual_turn");
    playerLeyend2.classList.remove("actual_turn");
  } else {
    playerLeyend1.classList.remove("actual_turn");
    playerLeyend2.classList.add("actual_turn");
  }

  const gameHTMLElements = game.getGameHTMLElements(showError);
  gameBoard.innerHTML = "";
  for (const gameHTMLElement of gameHTMLElements) {
    gameBoard.appendChild(gameHTMLElement);
  }
});

function renderGameList() {
  const gameListDivs = gameList.map((gameUUID, idx) => {
    const div = document.createElement("div");
    const joinButton = document.createElement("button");
    joinButton.addEventListener("click", () => {
      hubElement?.classList.add("hide");
      gameElement?.classList.remove("hide");
      socket.emit("join", gameUUID, socket.id);
    });
    joinButton.innerText = "Join";
    div.innerText = `Game ${idx + 1}`;
    div.appendChild(joinButton);
    return div;
  });
  if (gameListElements) {
    gameListElements.innerHTML = "";
    for (let idx = 0; idx < gameListDivs.length; idx++) {
      const div = gameListDivs[idx];
      gameListElements.appendChild(div);
    }
  }
}

function createGame() {
  hubElement?.classList.add("hide");
  gameElement?.classList.remove("hide");
  socket.emit("createGame");
}

createGameBtn?.addEventListener("click", () => {
  createGame();
});

resetBtn?.addEventListener("click", () => {
  game?.reset();
  winnerPopup?.classList.add("hide");
});
