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
    tryToPlaceShip(startPosistion, endPosistion, shouldPlace = true) {
        const createdShip = new Ship_1.default(startPosistion, endPosistion);
        if (this.boardState.checkCanBePlaced(createdShip) && endPosistion <= 99) {
            if (shouldPlace) {
                this.finishPlacingShip(createdShip);
            }
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
    removeShip(start, end) {
        let indexToRemove = -1;
        this.ships.forEach((ship, inedx) => {
            if (ship.startPosition == start) {
                indexToRemove = inedx;
            }
        });
        if (indexToRemove !== -1) {
            this.ships.splice(indexToRemove, 1);
        }
        this.boardState.removeShip(this.ships);
    }
    recieveAttack(posistion) {
        this.boardState.recieveAttack(posistion);
        this.ships.forEach(ship => {
            ship.hull.forEach(point => {
                if (point.position == posistion) {
                    point.isHit = true;
                }
            });
            if (ship.isSunk()) {
                ship.adjecentPositions.forEach(index => {
                    this.boardState.recieveAttack(index);
                });
            }
        });
    }
    getPositionPossibleToAttack() {
        return this.boardState.getPositionPossibleToAttack();
    }
    randomShipSetup() {
        this.resetGameboard();
        this.shipsSizes.forEach((length) => {
            this.createRadnomShip(length);
        });
        return this.ships;
    }
    createRadnomShip(lenght) {
        while (true) {
            if (Math.round(Math.random()) === 1) {
                if (this.randomVerticalShip(lenght)) {
                    break;
                }
            }
            else {
                if (this.randomHorizontalShip(lenght)) {
                    break;
                }
            }
        }
    }
    randomVerticalShip(length) {
        const randomColumn = Math.floor(Math.random() * 10);
        const validStarts = this.getValidVerticalStarts(randomColumn, length);
        if (validStarts.length !== 0) {
            const randomStart = validStarts[Math.floor(Math.random() * validStarts.length)];
            const newShip = new Ship_1.default(randomStart, randomStart + (length - 1) * 10);
            if (true || this.boardState.checkCanBePlaced(newShip)) {
                this.finishPlacingShip(newShip);
                return true;
            }
        }
        return false;
    }
    getValidVerticalStarts(column, length) {
        const possibleStarts = [];
        for (let i = 0; i < 11 - length; i++) {
            let canInsert = true;
            for (let j = 0; j < length; j++) {
                // j == fieds to check
                // l = ilosc do sprawdzenia za kazdym razem
                if (!this.boardState.positions[(i + j) * 10 + column].canPlace) {
                    canInsert = false;
                    break;
                }
            }
            if (canInsert) {
                possibleStarts.push(i * 10 + column);
            }
        }
        return possibleStarts;
    }
    randomHorizontalShip(length) {
        const randomRow = Math.floor(Math.random() * 10) * 10;
        const validStarts = this.getValidHorizontalStarts(randomRow, length);
        if (validStarts.length !== 0) {
            // there are possible postions
            const randomStart = validStarts[Math.floor(Math.random() * validStarts.length)];
            const newShip = new Ship_1.default(randomStart, randomStart + length - 1);
            this.finishPlacingShip(newShip);
            return true;
        }
        return false;
    }
    getValidHorizontalStarts(row, length) {
        const possibleStarts = [];
        for (let i = 0; i < 11 - length; i++) {
            let canInsert = true;
            for (let j = 0; j < length; j++) {
                if (!this.boardState.positions[i + j + row].canPlace) {
                    canInsert = false;
                    break;
                }
            }
            if (canInsert) {
                possibleStarts.push(i + row);
            }
        }
        return possibleStarts;
    }
    finishPlacingShip(createdShip) {
        this.ships.push(createdShip);
        this.boardState.addShip(createdShip);
    }
}
exports.default = Gameboard;
