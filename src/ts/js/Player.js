"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gameboard_1 = __importDefault(require("./Gameboard"));
class Player {
    constructor(isCoomputer) {
        this.isComputer = isCoomputer;
        this.gameboard = new Gameboard_1.default();
        this.enemy = null;
    }
    resetGameboard() {
        this.gameboard.resetGameboard();
    }
    tryToPlaceShip(startPosistion, endPosistion, shouldPlace = true) {
        return this.gameboard.tryToPlaceShip(startPosistion, endPosistion, shouldPlace);
    }
    setEnemy(enemy) {
        this.enemy = enemy;
    }
    hasLost() {
        return this.gameboard.areShipsSunk();
    }
    recieveAttack(posistion) {
        console.log(this.getPositionPossibleToAttack());
        this.gameboard.recieveAttack(posistion);
        this.updateBoard();
    }
    randomizeShips() {
        this.gameboard.randomShipSetup();
    }
    beginAttack(posistion) {
        var _a, _b;
        const attackedPosition = this.getPosition(posistion);
        if (attackedPosition.isHit) {
        }
        else {
            (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.recieveAttack(posistion);
        }
        console.log(this.getPositionPossibleToAttack());
        (_b = this.enemy) === null || _b === void 0 ? void 0 : _b.updateBoard();
    }
    computerMove() {
        const options = this.getPositionPossibleToAttack();
        const randomPositon = Math.floor(Math.random() * ((options === null || options === void 0 ? void 0 : options.length) + 1));
        console.log(randomPositon);
        this.beginAttack(randomPositon);
    }
    updateBoard() {
        let id = "";
        if (this.isComputer) {
            id = "computer--board";
        }
        else {
            id = "human--board";
        }
        const gameboardDOM = document.getElementById(id);
        const gameSquares = Array.from(gameboardDOM.children);
        for (let i = 0; i < 100; i++) {
            gameSquares[i].className = `game-square ${this.gameboard.boardState.getSquareState(i)}`;
        }
    }
    addOnClick() {
        const enemyBoardDOM = document.getElementById("computer--board");
        Array.from(enemyBoardDOM === null || enemyBoardDOM === void 0 ? void 0 : enemyBoardDOM.children).forEach((square, index) => {
            square.addEventListener("click", () => this.beginAttack(index));
        });
        this.getPositionPossibleToAttack();
    }
    getPositionPossibleToAttack() {
        var _a, _b;
        console.log((_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.getPositionPossibleToAttack()), "pssiube";
        return (_b = this.enemy) === null || _b === void 0 ? void 0 : _b.gameboard.getPositionPossibleToAttack();
    }
    getPosition(positon) {
        var _a, _b;
        console.log((_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.getPosition(positon), "adsasd");
        return (_b = this.enemy) === null || _b === void 0 ? void 0 : _b.gameboard.getPosition(positon);
    }
}
exports.default = Player;
