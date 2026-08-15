export { Ship, Gameboard, Player };

class Ship {
  constructor(length, hits, hasSunk) {
    this.length = length;
    this.hits = hits;
    this.hasSunk = hasSunk;
  }
  hit() {
    this.hits += this.hits;
  }
  isSunk() {
    if (this.hits == length) {
      this.hasSunk = true;
    } else {
      this.hasSunk = false;
    }
  }
}
class Gameboard {
  constructor() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] * 10;
  }
  recieveAttack(row, col) {
    if (this.board[row][col] == 0) {
      this.board[row][col] = 1;
      return true;
    } else {
      return false;
    }
  }
}
