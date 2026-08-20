export { Ship, Gameboard, Player };

class Ship {
  constructor(length, hits, hasSunk) {
    this.length = length;
    this.hits = hits;
    this.hasSunk = hasSunk;
  }
  hit() {
    this.hits += 1;
    return this;
  }
  isSunk() {
    this.hasSunk = this.hits == this.length;
    return this;
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
    if (axis == "x") {
      if (col + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[row][col + i] === 1) return false;
      }
      const ship = new Ship(length, 0, false);
      this.ships.push(ship);
      for (let i = 0; i < length; i++) {
        this.board[row][col + i] = 1;
        this.cellToShip[`${row},${col + i}`] = ship;
      }
      return true;
    } else {
      if (row + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[row + i][col] === 1) return false;
      }
      const ship = new Ship(length, 0, false);
      this.ships.push(ship);
      for (let i = 0; i < length; i++) {
        this.board[row + i][col] = 1;
        this.cellToShip[`${row + i},${col}`] = ship;
      }
      return true;
    }
  }

  allSunk() {
    return this.ships.every((ship) => ship.hasSunk);
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

  autoPlaceFleet() {
    const fleet = [5, 4, 3, 3, 2];
    for (const length of fleet) {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const axis = Math.random() < 0.5 ? "x" : "y";
        placed = this.placeShip(length, row, col, axis);
      }
    }
  }

  getUnfiredCells() {
    const cells = [];
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (this.board[r][c] === 0 || this.board[r][c] === 1) {
          cells.push([r, c]);
        }
      }
    }
    return cells;
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
  placeFleet() {
    this.board.autoPlaceFleet();
  }
  randomAttack(enemyBoard) {
    const cells = enemyBoard.getUnfiredCells();
    const [row, col] = cells[Math.floor(Math.random() * cells.length)];
    enemyBoard.recieveAttack(row, col);
    return [row, col];
  }
  lost() {
    return this.board.allSunk();
  }
}
