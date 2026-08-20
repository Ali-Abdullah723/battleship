import { Ship, Gameboard, Player } from "./classes.js";

class domStuff {
  constructor(player, computer) {
    this.player = player;
    this.computer = computer;
    this.gameOver = false;
  }

  renderBoard(owner, containerId, showShips) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(10, 1fr)";
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = r;
        cell.dataset.col = c;
        const value = owner.board.board[r][c];
        if (value === 3) {
          cell.classList.add("hit");
        } else if (value === 2) {
          cell.classList.add("miss");
        } else if (value === 1 && showShips) {
          cell.classList.add("ship");
        }
        container.appendChild(cell);
      }
    }
  }

  loadBoard() {
    this.renderBoard(this.player, "player-board", true);
    this.renderBoard(this.computer, "enemy-board", false);
  }

  placeShip(length, row, col, axis) {
    this.player.board.placeShip(length, row, col, axis);
    this.loadBoard();
  }

  handleCellClick(row, col) {
    if (this.gameOver) return;
    const value = this.computer.board.board[row][col];
    if (value === 2 || value === 3) return;
    this.computer.board.recieveAttack(row, col);
    this.renderBoard(this.computer, "enemy-board", false);
    if (this.computer.lost()) {
      this.setStatus("You win!");
      this.gameOver = true;
      return;
    }
    this.computerTurn();
  }

  computerTurn() {
    this.computer.randomAttack(this.player.board);
    this.renderBoard(this.player, "player-board", true);
    if (this.player.lost()) {
      this.setStatus("Computer wins!");
      this.gameOver = true;
    }
  }

  setStatus(message) {
    const status = document.getElementById("status");
    if (status) status.textContent = message;
  }
}

export { domStuff };