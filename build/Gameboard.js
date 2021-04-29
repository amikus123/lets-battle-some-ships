"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ship_1 = __importDefault(require("./Ship"));
const BoardState_1 = __importDefault(require("./BoardState"));
class Gameboard {
    constructor() {
        this.ships = [];
        this.boardState = new BoardState_1.default();
        this.shipsSizes = [1, 2, 3, 4];
        // this.shipsSizes = [ 2, 1, 1, 1, 1];
    }
    resetGameboard() {
        this.ships = [];
        this.boardState = new BoardState_1.default();
    }
    areShipsSunk() {
        for (const ship of this.ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
    finishPlacingShip(createdShip) {
        this.ships.push(createdShip);
        this.boardState.addShip(createdShip);
    }
    tryToPlaceShip(startPosistion, endPosistion) {
        const createdShip = new Ship_1.default(startPosistion, endPosistion);
        // horizontal
        if (this.boardState.checkCanBePlaced(createdShip)) {
            // console.log(createdShip)
            this.finishPlacingShip(createdShip);
            return true;
        }
        else {
            return false;
        }
    }
    isPositionHit(positon) {
        return this.boardState.isHit(positon);
    }
    getPosition(posistion) {
        return this.boardState.positions[posistion];
    }
    recieveAttack(posistion) {
        var _a, _b;
        if (this.getPosition(posistion).ship === null) {
            (_a = this.getPosition(posistion).ship) === null || _a === void 0 ? void 0 : _a.receiveHit(posistion);
            return false;
        }
        else {
            this.getPosition(posistion).isHit = true;
            (_b = this.getPosition(posistion).ship) === null || _b === void 0 ? void 0 : _b.receiveHit(posistion);
            return true;
        }
    }
    randomShipSetup() {
        this.resetGameboard();
        this.shipsSizes.forEach((length) => {
            if (this.randomBinary()) {
                this.randomVerticalShip(length);
            }
            else {
                this.randomHorizontalShip(length);
            }
        });
    }
    chekIfValidRandomRow(row, length) {
        let max = 0;
        const possibleStarts = [];
        for (let i = row; i < row + 10 - length; i++) {
            let canInsert = true;
            for (let j = i; j < row + 10; j++) {
                if (!this.boardState.positions[j].canPlace) {
                    canInsert = false;
                    break;
                }
            }
            if (canInsert) {
                possibleStarts.push(i);
            }
        }
        console.log(possibleStarts, row, length);
    }
    randomVerticalShip(length) {
        let x = 0;
        let randomColumn = 0;
        let randomStart = 0;
        let randomEnd = 0;
        while (true) {
            x++;
            // randomColumn = Math.floor(Math.random() * 10); //0-9
            // randomStart =
            //   Math.floor(Math.random() * (length - 1)) * 10 + randomColumn;
            // randomEnd = randomStart + (length - 1) * 10;
            randomColumn = Math.floor(Math.random() * 10); //0-9
            randomStart =
                Math.floor(Math.random() * (10 - length)) * 10 + randomColumn;
            randomEnd = randomStart + (length - 1) * 10;
            console.log(randomColumn, randomStart, randomEnd);
            if (this.tryToPlaceShip(randomStart, randomEnd) || x == 500) {
                break;
            }
        }
    }
    randomHorizontalShip(length) {
        let x = 0;
        let randomRow = 0;
        let randomStart = 0;
        let randomEnd = 0;
        while (true) {
            x++;
            // randomRow = Math.floor(Math.random() * 10) * 10;
            // randomStart = Math.floor(Math.random() * (length - 1)) + randomRow;
            // randomEnd = randomStart + length - 1;
            randomRow = Math.floor(Math.random() * 10) * 10;
            this.chekIfValidRandomRow(randomRow, length);
            randomStart = Math.floor(Math.random() * (10 - length)) + randomRow;
            randomEnd = randomStart + length - 1;
            console.log(randomRow, randomStart, randomEnd);
            if (this.tryToPlaceShip(randomStart, randomEnd) || x == 500) {
                break;
            }
        }
    }
    randomBinary() {
        let random = Math.round(Math.random());
        return random === 0 ? false : true;
    }
}
exports.default = Gameboard;
