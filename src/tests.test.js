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

  test("recieveAttack marks an empty cell as a miss and increments missedAttacks", () => {
    const board = new Gameboard();
    board.recieveAttack(0, 0);
    expect(board.board[0][0]).toBe(2);
    expect(board.missedAttacks).toBe(1);
  });

  test("recieveAttack marks a ship cell as a hit", () => {
    const board = new Gameboard();
    board.placeShip(3, 0, 0, "x");
    board.recieveAttack(0, 1);
    expect(board.board[0][1]).toBe(3);
    expect(board.missedAttacks).toBe(0);
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
});