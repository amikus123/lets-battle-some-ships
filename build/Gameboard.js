"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ship_1 = __importDefault(require("./Ship"));
class activeFields {
    constructor() {
        this.afloat = [];
        this.sunk = [];
        this.placeable = this.setPlaceable();
        this.unplaceable = [];
    }
    addAfloat(position) {
        this.afloat.push(position);
    }
    addSunk(position) {
        this.sunk.push(position);
        const indexOfRemoved = this.afloat.indexOf(position);
        this.afloat.splice(indexOfRemoved, 1);
    }
    addUnplaceable(positon) {
        this.unplaceable.push(positon);
        this.placeable.splice(this.placeable.indexOf(positon), 1);
    }
    setPlaceable() {
        const placeable = [];
        for (let i = 0; i < 100; i++) {
            placeable.push(i);
        }
        return placeable;
    }
}
class Gameboard {
    constructor() {
        this.boardPositions = this.setPoints();
        this.ships = [];
        this.positionsState = new activeFields();
        this.shipsSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    }
    resetGameboard() {
        this.boardPositions = this.setPoints();
        this.ships = [];
        this.positionsState = new activeFields();
    }
    setPoints() {
        const boardSquares = [];
        for (let i = 0; i < 100; i++) {
            boardSquares.push({ isHit: false, position: i, ship: undefined });
        }
        return boardSquares;
    }
    finishPlacingShip(createdShip) {
        this.ships.push(createdShip);
        const startPosistion = createdShip.startPosition;
        const endPosition = createdShip.endPosition;
        if (endPosition - startPosistion < 10) {
            for (let i = startPosistion; i <= endPosition; i++) {
                this.boardPositions[i].ship = createdShip;
                this.positionsState.addAfloat(i);
            }
        }
        else {
            // vertical
            for (let i = startPosistion; i <= endPosition; i += 10) {
                this.positionsState.addAfloat(i);
                this.boardPositions[i].ship = createdShip;
            }
        }
    }
    tryToPlaceShip(startPosistion, endPosistion) {
        const createdShip = new Ship_1.default(startPosistion, endPosistion);
        // horizontal
        if (this.checkIfShipCanBePlaced(createdShip)) {
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
            }
        }
        return canBePlaced;
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
    isPositionHit(posistion) {
        if (this.boardPositions[posistion].isHit) {
            return true;
        }
        else {
            return false;
        }
    }
    getPosition(posistion) {
        // console.log(this.boardPositions[posistion], "insdie", posistion);
        return this.boardPositions[posistion];
    }
    recieveAttack(posistion) {
        var _a, _b;
        if (this.boardPositions[posistion].ship === null) {
            (_a = this.boardPositions[posistion].ship) === null || _a === void 0 ? void 0 : _a.receiveHit(posistion);
            return false;
        }
        else {
            this.boardPositions[posistion].isHit = true;
            (_b = this.boardPositions[posistion].ship) === null || _b === void 0 ? void 0 : _b.receiveHit(posistion);
            return true;
        }
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
            if (this.tryToPlaceShip(randomStart, randomEnd) || x === 50) {
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
            if (this.tryToPlaceShip(randomStart, randomEnd) || x === 50) {
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
