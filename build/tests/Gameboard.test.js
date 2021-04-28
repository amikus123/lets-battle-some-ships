"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gameboard_1 = __importDefault(require("../Gameboard"));
const testedGameboard = new Gameboard_1.default();
test("checking ships placement", () => {
    expect(testedGameboard.getPosition(1)).toEqual({ isHit: false, ship: undefined, position: 1 });
    testedGameboard.tryToPlaceShip(1, 21);
    const firstShip = testedGameboard.ships[0];
    console.log(testedGameboard.getPosition(1));
    expect(testedGameboard.getPosition(1)).toEqual({ isHit: false, ship: firstShip, position: 1 });
    expect(testedGameboard.getPosition(11)).toEqual({ isHit: false, ship: firstShip, position: 11 });
    expect(testedGameboard.getPosition(21)).toEqual({ isHit: false, ship: firstShip, position: 21 });
    expect(testedGameboard.getPosition(31)).toEqual({ isHit: false, ship: undefined, position: 31 });
});
test("checking recieving hits", () => {
    const firstShip = testedGameboard.ships[0];
    expect(testedGameboard.getPosition(1)).toEqual({ isHit: false, ship: firstShip, position: 1 });
    expect(testedGameboard.isPositionHit(1)).toBe(false);
    testedGameboard.recieveAttack(1);
    expect(testedGameboard.getPosition(1)).toEqual({ isHit: true, ship: firstShip, position: 1 });
    expect(testedGameboard.isPositionHit(1)).toBe(true);
});
test("checking sunkDetection", () => {
    testedGameboard.recieveAttack(11);
    expect(testedGameboard.areShipsSunk()).toBe(false);
    testedGameboard.recieveAttack(21);
    expect(testedGameboard.areShipsSunk()).toBe(true);
    testedGameboard.tryToPlaceShip(2, 22);
    expect(testedGameboard.areShipsSunk()).toBe(false);
    testedGameboard.recieveAttack(2);
    testedGameboard.recieveAttack(12);
    testedGameboard.recieveAttack(22);
    expect(testedGameboard.areShipsSunk()).toBe(true);
});
