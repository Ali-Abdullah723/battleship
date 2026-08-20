import { Ship, Gameboard, Player } from "./classes";

describe("Ship", () => {
  test("constructor sets length, hits, and hasSunk properties", () => {
    const ship = new Ship(3, 0, false);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.hasSunk).toBe(false);
  });

  test("hit() increments hits by 1", () => {
    const ship = new Ship(3, 1, false);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("isSunk() sets hasSunk to true when hits equals length", () => {
    const ship = new Ship(2, 2, false);
    ship.isSunk();
    expect(ship.hasSunk).toBe(true);
  });

  test("isSunk() sets hasSunk to false when hits is less than length", () => {
    const ship = new Ship(4, 2, true);
    ship.isSunk();
    expect(ship.hasSunk).toBe(false);
  });
});

describe("Gameboard", () => {
  test("constructor builds a 10x10 grid filled with 0", () => {
    const board = new Gameboard();
    expect(board.board).toHaveLength(10);
    board.board.forEach((row) => {
      expect(row).toHaveLength(10);
      row.forEach((cell) => expect(cell).toBe(0));
    });
  });

  test("constructor initializes missedAttacks to 0", () => {
    const board = new Gameboard();
    expect(board.missedAttacks).toBe(0);
  });

  test("placeShip places a ship horizontally when axis is x", () => {
    const board = new Gameboard();
    board.placeShip(3, 2, 4, "x");
    expect(board.board[2][4]).toBe(1);
    expect(board.board[2][5]).toBe(1);
    expect(board.board[2][6]).toBe(1);
  });

  test("placeShip places a ship vertically when axis is y", () => {
    const board = new Gameboard();
    board.placeShip(3, 2, 4, "y");
    expect(board.board[2][4]).toBe(1);
    expect(board.board[3][4]).toBe(1);
    expect(board.board[4][4]).toBe(1);
  });

  test("placeShip rejects a ship that goes off the board horizontally", () => {
    const board = new Gameboard();
    expect(board.placeShip(4, 0, 8, "x")).toBe(false);
  });

  test("placeShip rejects a ship that goes off the board vertically", () => {
    const board = new Gameboard();
    expect(board.placeShip(4, 8, 0, "y")).toBe(false);
  });

  test("placeShip rejects overlapping ships", () => {
    const board = new Gameboard();
    board.placeShip(3, 2, 4, "x");
    expect(board.placeShip(3, 2, 4, "y")).toBe(false);
  });

  test("placeShip maps cells to the placed ship", () => {
    const board = new Gameboard();
    board.placeShip(3, 2, 4, "x");
    expect(board.cellToShip["2,5"]).toBeInstanceOf(Ship);
  });

  test("recieveAttack marks an empty cell as a miss and increments missedAttacks", () => {
    const board = new Gameboard();
    board.recieveAttack(0, 0);
    expect(board.board[0][0]).toBe(2);
    expect(board.missedAttacks).toBe(1);
  });

  test("recieveAttack hits a ship and increments its hits", () => {
    const board = new Gameboard();
    board.placeShip(3, 0, 0, "x");
    board.recieveAttack(0, 1);
    expect(board.board[0][1]).toBe(3);
    expect(board.missedAttacks).toBe(0);
    expect(board.cellToShip["0,1"].hits).toBe(1);
  });

  test("sinking a ship sets allSunk to true when all ships are sunk", () => {
    const board = new Gameboard();
    board.placeShip(2, 0, 0, "x");
    expect(board.allSunk()).toBe(false);
    board.recieveAttack(0, 0);
    board.recieveAttack(0, 1);
    expect(board.allSunk()).toBe(true);
  });

  test("allSunk returns false while any ship remains afloat", () => {
    const board = new Gameboard();
    board.placeShip(2, 0, 0, "x");
    board.recieveAttack(0, 0);
    expect(board.allSunk()).toBe(false);
  });

  test("autoPlaceFleet places all five ships validly on the board", () => {
    const board = new Gameboard();
    board.autoPlaceFleet();
    expect(board.ships).toHaveLength(5);
    const cells = board.board.flat();
    const shipCount = cells.filter((v) => v === 1).length;
    expect(shipCount).toBe(5 + 4 + 3 + 3 + 2);
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (board.board[r][c] === 1) {
          expect(board.cellToShip[`${r},${c}`]).toBeInstanceOf(Ship);
        }
      }
    }
  });

  test("recieveAttack does not change already-attacked cells", () => {
    const board = new Gameboard();
    board.recieveAttack(0, 0);
    board.recieveAttack(0, 0);
    expect(board.board[0][0]).toBe(2);
    expect(board.missedAttacks).toBe(1);
  });
});

describe("Player", () => {
  test("Player(true) sets type to real and owns a Gameboard", () => {
    const player = new Player(true);
    expect(player.type).toBe("real");
    expect(player.board).toBeInstanceOf(Gameboard);
  });

  test("Player(false) sets type to computer and owns a Gameboard", () => {
    const player = new Player(false);
    expect(player.type).toBe("computer");
    expect(player.board).toBeInstanceOf(Gameboard);
  });

  test("placeFleet auto-places a full fleet", () => {
    const player = new Player(false);
    player.placeFleet();
    expect(player.board.ships).toHaveLength(5);
  });

  test("randomAttack fires on an unfired enemy cell", () => {
    const player = new Player(false);
    const enemy = new Player(false);
    enemy.board.autoPlaceFleet();
    const fired = new Set();
    for (let i = 0; i < 100; i++) {
      const [row, col] = player.randomAttack(enemy.board);
      fired.add(`${row},${col}`);
      expect([2, 3]).toContain(enemy.board.board[row][col]);
    }
    expect(fired.size).toBe(100);
  });

  test("lost returns true when all own ships are sunk", () => {
    const player = new Player(true);
    player.board.placeShip(1, 0, 0, "x");
    player.board.recieveAttack(0, 0);
    expect(player.lost()).toBe(true);
  });
});