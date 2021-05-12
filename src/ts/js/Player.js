"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gameboard_1 = __importDefault(require("./Gameboard"));
const messages = {
    sunk: "sunk a ship! ",
    hit: "hit a ship! ",
    miss: "missed! ",
};
class Player {
    constructor(isCoomputer) {
        this.isComputer = isCoomputer;
        this.gameboard = new Gameboard_1.default();
        this.enemy = null;
        this.gameFlow = null;
        this.audioControl = null;
        this.nextMoves = [];
        this.messages = messages;
    }
    setGameFlow(gameFlow) {
        this.gameFlow = gameFlow;
    }
    setEnemy(enemy) {
        this.enemy = enemy;
    }
    setAudioControl(audio) {
        this.audioControl = audio;
    }
    resetGameboard() {
        this.gameboard.resetGameboard();
    }
    tryToPlaceShip(startPosistion, endPosistion, shouldPlace = true) {
        return this.gameboard.tryToPlaceShip(startPosistion, endPosistion, shouldPlace);
    }
    randomizeShips() {
        this.gameboard.randomShipSetup();
    }
    hasLost() {
        return this.gameboard.areShipsSunk();
    }
    recieveAttack(posistion) {
        this.gameboard.recieveAttack(posistion);
        this.updateBoard();
    }
    addOnClick() {
        var _a;
        const enemyBoardDOM = document.getElementById("computer--board");
        Array.from(enemyBoardDOM === null || enemyBoardDOM === void 0 ? void 0 : enemyBoardDOM.children).forEach((square, index) => {
            square.addEventListener("click", () => this.userClick(square, index));
        });
        (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.updateBoard();
        this.updateBoard();
    }
    beginAttack(posistion) {
        var _a, _b;
        const attackedPosition = this.getPosition(posistion);
        console.log(attackedPosition, "attacked");
        (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.recieveAttack(posistion);
        const message = this.getMessageToDisply(attackedPosition);
        this.gameFlow.displayBattleMessage(message);
        (_b = this.enemy) === null || _b === void 0 ? void 0 : _b.updateBoard();
    }
    getMessageToDisply(posistion) {
        const name = this.isComputer ? "Enemy has " : "You have ";
        const action = this.getAction(posistion);
        return name + action;
    }
    getAction(posistion) {
        if (posistion.ship === undefined) {
            return this.messages.miss;
        }
        else if (posistion.ship.isSunk()) {
            return this.messages.sunk;
        }
        else {
            return this.messages.hit;
        }
    }
    computerMove() {
        console.log(this.nextMoves, "przed ruchem");
        if (this.nextMoves.length === 0) {
            const options = this.getPositionPossibleToAttack();
            const randomPositon = Math.floor(Math.random() * ((options === null || options === void 0 ? void 0 : options.length) + 1));
            this.tryToAddPossibleMoves(randomPositon);
            this.beginAttack(randomPositon);
            console.log(this.nextMoves, "possible moves");
        }
        else if (this.nextMoves.length === 1) {
            console.log("fisrt path");
        }
        else {
            console.log("third path");
        }
        this.gameFlow.toggleTurn();
    }
    chooseNextTarget() {
        var _a;
        // ignore first index
        // losuje jeden z nicg, potem, jelsi ok to kontuuje
        // liczba z zakresu 1 do length -1
        const randomIndex = Math.floor(Math.random() * this.nextMoves.length - 1) + 1;
        const positionIndex = this.nextMoves[randomIndex];
        this.beginAttack(positionIndex);
        if (((_a = this.getPosition(positionIndex)) === null || _a === void 0 ? void 0 : _a.ship) !== undefined) {
            // hit
        }
        else {
            // miss
        }
    }
    getAdjecentToPosition(position) {
        const positions = [position];
        if (position == 10) {
            positions.push(0);
        }
        if (position % 10 !== 9) {
            positions.push(position + 1);
        }
        if (position % 10 !== 0) {
            positions.push(position - 1);
        }
        if (position > 10) {
            positions.push(position - 10);
        }
        if (position < 90) {
            positions.push(position + 10);
        }
        return positions;
    }
    // posti
    tryToAddPossibleMoves(positionIndex) {
        const postion = this.getPosition(positionIndex);
        // if we miss or sunk a ship there is no need to add next moves
        if (this.getAction(postion) === this.messages.hit) {
            const indexesToCheck = this.getAdjecentToPosition(positionIndex);
            console.log(indexesToCheck, "to check");
            indexesToCheck.forEach((item) => {
                var _a;
                if (!((_a = this.getPosition(item)) === null || _a === void 0 ? void 0 : _a.isHit)) {
                    this.nextMoves.push(item);
                }
            });
        }
    }
    userClick(square, index) {
        var _a, _b;
        if (!square.classList.contains("ship-hit") &&
            !square.classList.contains("empty-hit") &&
            ((_a = this.gameFlow) === null || _a === void 0 ? void 0 : _a.humanTurn)) {
            this.beginAttack(index);
            this.gameFlow.toggleTurn();
            setTimeout(() => {
                this.enemy.computerMove();
            }, 2000);
        }
        else {
            (_b = this.audioControl) === null || _b === void 0 ? void 0 : _b.playErrorSound();
        }
    }
    updateBoard() {
        console.log("XDDDD");
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
    getPositionPossibleToAttack() {
        var _a;
        return (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.getPositionPossibleToAttack();
    }
    getPosition(positon) {
        var _a, _b;
        console.log((_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.getPosition(positon), "adsasd");
        return (_b = this.enemy) === null || _b === void 0 ? void 0 : _b.gameboard.getPosition(positon);
    }
}
exports.default = Player;
