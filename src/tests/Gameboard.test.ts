import Gameboard from "../Gameboard";
const testedGameboard = new Gameboard();
afterEach(() => {
  testedGameboard.resetGameboard();
});
test("checking ships placement", () => {
  expect(testedGameboard.getPosition(1)).toEqual({
    isHit: false,
    ship: undefined,
    position: 1,
  });
  testedGameboard.tryToPlaceShip(1, 21);
  const firstShip = testedGameboard.ships[0];
  expect(testedGameboard.getPosition(1)).toEqual({
    isHit: false,
    ship: firstShip,
    position: 1,
  });
  expect(testedGameboard.getPosition(11)).toEqual({
    isHit: false,
    ship: firstShip,
    position: 11,
  });
  expect(testedGameboard.getPosition(21)).toEqual({
    isHit: false,
    ship: firstShip,
    position: 21,
  });
  expect(testedGameboard.getPosition(31)).toEqual({
    isHit: false,
    ship: undefined,
    position: 31,
  });
});
test("checking recieving hits", () => {
  testedGameboard.tryToPlaceShip(1, 21);
  const firstShip = testedGameboard.ships[0];
  expect(testedGameboard.getPosition(1)).toEqual({
    isHit: false,
    ship: firstShip,
    position: 1,
  });
  expect(testedGameboard.isPositionHit(1)).toBe(false);
  testedGameboard.recieveAttack(1);
  expect(testedGameboard.getPosition(1)).toEqual({
    isHit: true,
    ship: firstShip,
    position: 1,
  });
  expect(testedGameboard.isPositionHit(1)).toBe(true);
});
test("checking sunkDetection", () => {
  testedGameboard.tryToPlaceShip(1, 21);
  testedGameboard.recieveAttack(1);
  expect(testedGameboard.areShipsSunk()).toBe(false);
  testedGameboard.recieveAttack(11);
  testedGameboard.recieveAttack(21);
  expect(testedGameboard.areShipsSunk()).toBe(true);
  testedGameboard.tryToPlaceShip(5, 25);
  expect(testedGameboard.areShipsSunk()).toBe(false);
  testedGameboard.recieveAttack(5);
  testedGameboard.recieveAttack(15);
  testedGameboard.recieveAttack(25);
  expect(testedGameboard.areShipsSunk()).toBe(true);
});
test("check reset", () => {
  expect(testedGameboard.ships.length).toBe(0);
  testedGameboard.tryToPlaceShip(1, 21);
  expect(testedGameboard.ships.length).toBe(1);
});
test("check random", () => {
  testedGameboard.randomShipSetup();
  console.log(testedGameboard.ships);

  testedGameboard.resetGameboard();
  testedGameboard.randomShipSetup();
  console.log(testedGameboard.ships);

  testedGameboard.resetGameboard();
  testedGameboard.randomShipSetup();
  console.log(testedGameboard.ships);

});
