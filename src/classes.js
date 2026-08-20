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
    if (this.hits == this.length) {
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
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.ships = [];
    this.cellToShip = {};
    this.missedAttacks = 0;
  }
  placeShip(length, row, col, axis) {
    if (axis == "x" && col + length < 11) {
      const ship = new Ship(length, 0, false);
      this.ships.push(ship);
      for (let i = 0; i < length; i++) {
        this.board[row][col + i] = 1;
        this.cellToShip[`${r},${c}`] = ship;
      }
    } else if (row + length < 11) {
      const ship = new Ship(length, 0, false);
      this.ships.push(ship);
      for (let i = 0; i < length; i++) {
        this.board[row + i][col] = 1;
        this.cellToShip[`${r},${c}`] = ship;
      }
    }
  }

  recieveAttack(row, col) {
    if (this.board[row][col] == 0) {
      this.board[row][col] = 2;
      this.missedAttacks += 1;
    } else if (this.board[row][col] == 1) {
      this.board[row][col] = 3;
      this.cellToShip[`${row},${col}`].hit().isSunk();
    }
  }
}

class Player {
  constructor(isreal) {
    this.board = new Gameboard();
    if (isreal) {
      this.type = "real";
    } else {
      this.type = "computer";
    }
  }
}
