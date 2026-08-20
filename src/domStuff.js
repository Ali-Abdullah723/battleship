import { Ship, Gameboard, Player } from "./classes";

class domStuff {
  constructor() {
    this.board = new Gameboard();
  }
  placeShip(length, row, col, axis) {
    this.board.placeShip(length, row, col, axis);
    const container = document.getElementById("board");
    container.innerHTML = "";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(10, 1fr)";
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (this.board.board[r][c] === 1) cell.classList.add("ship");
        container.appendChild(cell);
      }
    }
  }
}