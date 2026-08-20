import "./styles.css";
import { Ship, Gameboard, Player } from "./classes.js";
import { domStuff } from "./domStuff.js";

const player = new Player(true);
const computer = new Player(false);
player.placeFleet();
computer.placeFleet();

const game = new domStuff(player, computer);
game.loadBoard();

const enemyBoardEl = document.getElementById("enemy-board");
enemyBoardEl.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");
  if (!cell) return;
  game.handleCellClick(Number(cell.dataset.row), Number(cell.dataset.col));
});