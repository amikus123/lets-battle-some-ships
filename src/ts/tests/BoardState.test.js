"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BoardState_1 = __importDefault(require("../BoardState"));
const Ship_1 = __importDefault(require("../Ship"));
let boardState = new BoardState_1.default;
beforeEach(() => {
    boardState = new BoardState_1.default;
});
test("testing adding ships", () => {
    const horizontalShip = new Ship_1.default(22, 23);
    boardState.addShip(horizontalShip);
});
