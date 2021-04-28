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
    }
    addAfloat(position) {
        this.afloat.push(position);
    }
    addSunk(position) {
        this.sunk.push(position);
        const indexOfRemoved = this.afloat.indexOf(position);
        this.afloat.splice(indexOfRemoved, 1);
    }
}
class Gameboard {
    constructor() {
        this.boardPositions = this.setPoints();
        this.ships = [];
        this.shipState = new activeFields();
    }
    setPoints() {
        const boardSquares = [];
        for (let i = 0; i < 100; i++) {
            boardSquares.push({ isHit: false, position: i, ship: undefined });
        }
        return boardSquares;
    }
    placeShip(createdShip) {
        this.ships.push(createdShip);
        const startPosistion = createdShip.startPosition;
        const endPosition = createdShip.endPosition;
        if (endPosition - startPosistion < 10) {
            for (let i = startPosistion; i <= endPosition; i++) {
                this.boardPositions[i].ship = createdShip;
                this.shipState.addAfloat(i);
            }
        }
        else {
            // vertical
            for (let i = startPosistion; i <= endPosition; i += 10) {
                this.shipState.addAfloat(i);
                this.boardPositions[i].ship = createdShip;
            }
        }
    }
    tryToPlaceShip(startPosistion, endPosistion) {
        const createdShip = new Ship_1.default(startPosistion, endPosistion);
        // horizontal
        if (this.checkIfShipCanBePlaced(createdShip)) {
            this.placeShip(createdShip);
            return true;
        }
        else {
            return false;
        }
    }
    checkIfShipCanBePlaced(createdShip) {
        let canBePlaced = true;
        const positionsToCheck = this.getPositionsToCheck(createdShip);
        for (const position of positionsToCheck) {
            if (this.checkPosition(position)) {
                canBePlaced = false;
            }
        }
        return canBePlaced;
    }
    getPositionsToCheck(createdShip) {
        let positionsToCheck = [];
        for (const point of createdShip.hull) {
            positionsToCheck = positionsToCheck.concat(this.positionsToCheck(point.position));
        }
        return [...new Set(positionsToCheck)];
    }
    checkPosition(positon) {
        if (this.getPosition(positon).ship !== undefined) {
            return true;
        }
        return false;
    }
    positionsToCheck(position) {
        const positions = [];
        if (position % 10 !== 9) {
            positions.push(position + 1);
            positions.push(position - 9);
            positions.push(position + 11);
        }
        if (position % 10 !== 0) {
            positions.push(position - 1);
            positions.push(position - 11);
            positions.push(position + 9);
        }
        if (position > 10) {
            positions.push(position - 10);
        }
        if (position < 89) {
            positions.push(position + 10);
        }
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
        console.log(this.boardPositions[posistion]);
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
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}
exports.default = Gameboard;
