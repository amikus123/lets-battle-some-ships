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
        this.shipsSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        // this.shipsSizes = [3,2,1];
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
            this.createRadnomShip(length);
        });
    }
    createRadnomShip(lenght) {
        while (true) {
            if (this.randomBinary()) {
                if (this.randomVerticalShip(lenght)) {
                    break;
                }
            }
            else {
                // if (this.randomHorizontalShip(lenght)) {
                //   break;
                // }
                if (this.randomVerticalShip(lenght)) {
                    break;
                }
            }
            // break;
        }
    }
    getValidHorizontalStarts(row, length) {
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
            break;
        }
        // console.log(possibleStarts, row, length);
        return possibleStarts;
    }
    randomHorizontalShip(length) {
        let randomRow = 0;
        let validStarts = [];
        randomRow = Math.floor(Math.random() * 10) * 10;
        validStarts = this.getValidHorizontalStarts(randomRow, length);
        if (validStarts.length !== 0) {
            // there are possible postions
            const randomStart = validStarts[Math.floor(Math.random() * validStarts.length)];
            const newShip = new Ship_1.default(randomStart, randomStart + length - 1);
            this.finishPlacingShip(newShip);
            return true;
        }
        return false;
    }
    getValidVerticalStarts(column, length) {
        const possibleStarts = [];
        // i = ilosc powtorzen gornej perli  11-l
        console.log("kolumna", column);
        for (let i = 0; i < 11 - length; i++) {
            let canInsert = true;
            for (let j = 0; j < length; j++) {
                // j == fieds to check
                // l = ilosc do sprawdzenia za kazdym razem
                if (!this.boardState.positions[(i + j) * 10 + column].canPlace) {
                    canInsert = false;
                    break;
                }
                console.log(this.boardState.positions[(i + j) * 10 + column]);
            }
            if (canInsert) {
                possibleStarts.push(i * 10 + column);
            }
        }
        // possibleStarts.push(2)
        console.log(possibleStarts, column, length);
        return possibleStarts;
    }
    randomVerticalShip(length) {
        const randomColumn = Math.floor(Math.random() * 10);
        // 0 9
        const validStarts = this.getValidVerticalStarts(randomColumn, length);
        if (validStarts.length !== 0) {
            const randomStart = validStarts[Math.floor(Math.random() * validStarts.length)];
            const newShip = new Ship_1.default(randomStart, randomStart + (length - 1) * 10);
            console.log("srodek", newShip);
            if (this.boardState.checkCanBePlaced(newShip)) {
                console.log(randomColumn, validStarts, newShip, randomStart, "err");
                this.finishPlacingShip(newShip);
                return true;
            }
        }
        return false;
    }
    randomBinary() {
        let random = Math.round(Math.random());
        return random === 0 ? false : true;
    }
}
exports.default = Gameboard;
