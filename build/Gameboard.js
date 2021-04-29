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
            // console.log(ship)
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
    finishPlacingShip(createdShip) {
        this.ships.push(createdShip);
        const startPosistion = createdShip.startPosition;
        const endPosition = createdShip.endPosition;
        if (endPosition - startPosistion < 10) {
            for (let i = startPosistion; i <= endPosition; i++) {
                this.boardState.setShipPositions(i, createdShip);
            }
        }
        else {
            // vertical
            for (let i = startPosistion; i <= endPosition; i += 10) {
                this.boardState.setShipPositions(i, createdShip);
            }
        }
    }
    tryToPlaceShip(startPosistion, endPosistion) {
        const createdShip = new Ship_1.default(startPosistion, endPosistion);
        // horizontal
        const result = this.checkIfShipCanBePlaced(createdShip);
        if (result.canBePlaced) {
            this.finishPlacingShip(createdShip);
            return true;
        }
        else {
            return false;
        }
    }
    checkIfShipCanBePlaced(createdShip) {
        let canBePlaced = true;
        const positionsToCheck = this.getAdjacentToShip(createdShip);
        for (const position of positionsToCheck) {
            if (this.shipOrEmpty(position)) {
                canBePlaced = false;
                break;
            }
        }
        return { canBePlaced: true, positionsToCheck };
    }
    getAdjacentToShip(createdShip) {
        let positionsToCheck = [];
        for (const point of createdShip.hull) {
            positionsToCheck = positionsToCheck.concat(this.getAdjacentToPosition(point.position));
        }
        return [...new Set(positionsToCheck)];
    }
    shipOrEmpty(positon) {
        if (this.getPosition(positon).ship !== undefined) {
            return true;
        }
        return false;
    }
    getAdjacentToPosition(position) {
        const positions = [];
        if (position % 10 !== 9) {
            positions.push(position + 1);
            if (position > 9) {
                positions.push(position - 9);
            }
            if (position < 90) {
                positions.push(position + 11);
            }
        }
        if (position % 10 !== 0) {
            positions.push(position - 1);
            if (position > 9) {
                positions.push(position - 11);
            }
            if (position < 90) {
                positions.push(position + 9);
            }
        }
        if (position > 10) {
            positions.push(position - 10);
        }
        if (position < 90) {
            positions.push(position + 10);
        }
        // console.log(positions, position);
        return positions;
    }
    isPositionHit(positon) {
        return this.boardState.isHit(positon);
    }
    getPosition(posistion) {
        // console.log(this.boardPositions[posistion], "insdie", posistion);
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
            // console.log(length, this.ships);
            if (this.randomBinary()) {
                this.randomVerticalShip(length);
            }
            else {
                this.randomHorizontalShip(length);
                // this.randomVerticalShip();
            }
        });
    }
    randomVerticalShip(length) {
        let x = 0;
        let randomColumn = 0;
        let randomStart = 0;
        let randomEnd = 0;
        while (true) {
            x++;
            randomColumn = Math.floor(Math.random() * 10);
            // length will be 4, so max start is 5X
            randomStart =
                Math.floor(Math.random() * (length - 1)) * 10 + randomColumn;
            randomEnd = randomStart + (length - 1) * 10;
            // console.log(randomColumn,randomStart,randomEnd)
            if (this.tryToPlaceShip(randomStart, randomEnd) || x === 5000) {
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
            randomRow = Math.floor(Math.random() * 10) * 10;
            // length will be 4, so max start is 5X
            randomStart = Math.floor(Math.random() * (length - 1)) + randomRow;
            randomEnd = randomStart + length - 1;
            // console.log(randomRow,randomStart,randomEnd)
            if (this.tryToPlaceShip(randomStart, randomEnd) || x === 5000) {
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
