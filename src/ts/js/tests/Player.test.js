"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("../Player"));
const human = new Player_1.default(false);
const computer = new Player_1.default(true);
human.setEnemy(computer);
computer.setEnemy(human);
afterEach(() => {
    human.resetGameboard();
    computer.resetGameboard();
});
test("cheking manual placement of ships", () => {
    expect(human.gameboard.ships.length).toBe(0);
    human.tryToPlaceShip(1, 21);
    expect(human.gameboard.ships.length).toBe(1);
});
test("checking loss detection", () => {
    human.tryToPlaceShip(1, 21);
    computer.beginAttack(1);
    expect(human.hasLost()).toBe(false);
    computer.beginAttack(11);
    computer.beginAttack(21);
    expect(human.hasLost()).toBe(true);
});
test("checking radnom ship setup", () => {
    human.randomizeShips();
    console.log(human.gameboard.ships);
    // expect(human.gameboard.ships.length).toBe()
});
