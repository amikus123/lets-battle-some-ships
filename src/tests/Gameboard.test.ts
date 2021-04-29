import Gameboard from "../Gameboard";
import { boardPosition } from "../BoardState";
import Ship from "../Ship";
const testedGameboard = new Gameboard();
const bPFactory = (
position: number,
canPlace: boolean =true,
ship: undefined | Ship =undefined,
isHit: boolean = false,
): boardPosition => {
return { isHit, position, canPlace, ship };
};

afterEach(() => {
testedGameboard.resetGameboard();
});
test("checking ships placement", () => {
expect(testedGameboard.getPosition(1)).toEqual(bPFactory(1));
testedGameboard.tryToPlaceShip(1, 21);
const firstShip = testedGameboard.ships[0];

expect(testedGameboard.getPosition(1)).toEqual(bPFactory(1,false,firstShip));
expect(testedGameboard.getPosition(21)).toEqual(bPFactory(21,false,firstShip));
expect(testedGameboard.getPosition(31)).toEqual(bPFactory(31,false));
expect(testedGameboard.getPosition(41)).toEqual(bPFactory(41));

});
test("checking recieving hits", () => {
testedGameboard.tryToPlaceShip(1, 21);
const firstShip = testedGameboard.ships[0];
expect(testedGameboard.getPosition(1)).toEqual(bPFactory(1,false,firstShip));
// expect(testedGameboard.isPositionHit(1)).toBe(false);
testedGameboard.recieveAttack(1);
expect(testedGameboard.getPosition(1)).toEqual(bPFactory(1,false,firstShip,true));
// expect(testedGameboard.isPositionHit(1)).toBe(true);
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
testedGameboard.resetGameboard();
testedGameboard.randomShipSetup();
expect(testedGameboard.ships.length).toBe(5);
});




