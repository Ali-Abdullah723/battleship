export { Ship, Gameboard, Player };

class Ship {
  constructor(length, hits, hasSunk) {
    this.length = length;
    this.hits = hits;
    this.hasSunk = hasSunk;
  }
  hit() {
    this.hits += 1;
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
  // 0 : no ship,no hit
  //1: ship,no hit
  //2: no ship,hit
  //3 ship,hit
  constructor() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] * 10;
    this.missedAttacks = 0;
  }
  placeShip(length, row, col, axis) {
    if (axis == x) {
      for (let i = 0; i < length; i++) {
        this.board[row][col + i] = 1;
      }
    } else {
      for (let i = 0; i < length; i++) {
        this.board[row + i][col] = 1;
      }
    }
  }

  recieveAttack(row, col) {
    if (this.board[row][col] == 0) {
      this.board[row][col] = 2;
      this.missedAttacks += 1;
    } else if (this.board[row][col] == 1) {
      this.board[row][col] = 3;
    }
  }
}

class Player {
  constructor(isreal) {
    this.board = new Gameboard();
    if (isreal) {
      this.type = real;
    } else {
      this.type = computer;
    }
  }
}
