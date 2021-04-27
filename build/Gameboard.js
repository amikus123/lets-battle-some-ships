"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ship_1 = __importDefault(require("./Ship"));
var shipState = /** @class */ (function () {
    function shipState() {
        this.afloat = [];
        this.sunk = [];
    }
    shipState.prototype.addAfloat = function (position) {
        this.afloat.push(position);
    };
    shipState.prototype.addSunk = function (position) {
        this.sunk.push(position);
        var indexOfRemoved = this.afloat.indexOf(position);
        this.afloat.splice(indexOfRemoved, 1);
    };
    return shipState;
}());
var Gameboard = /** @class */ (function () {
    function Gameboard() {
        this.boardPositions = this.setPoints();
        this.ships = [];
        this.shipState = new shipState();
    }
    Gameboard.prototype.setPoints = function () {
        var boardSquares = [];
        for (var i = 0; i < 100; i++) {
            boardSquares.push({ isHit: false, position: i, ship: null });
        }
        return boardSquares;
    };
    Gameboard.prototype.placeShip = function (startPosistion, endPosistion) {
        var createdShip = new Ship_1.default(startPosistion, endPosistion);
        this.ships.push(createdShip);
        // horizontal
        if (endPosistion - startPosistion < 10) {
            for (var i = startPosistion; i <= endPosistion; i++) {
                this.boardPositions[i].ship = createdShip;
                this.shipState.addAfloat(i);
            }
        }
        else {
            // vertical
            for (var i = startPosistion; i <= endPosistion; i += 10) {
                this.shipState.addAfloat(i);
                this.boardPositions[i].ship = createdShip;
            }
        }
    };
    Gameboard.prototype.isPositionHit = function (posistion) {
        if (this.boardPositions[posistion].isHit) {
            return true;
        }
        else {
            return false;
        }
    };
    Gameboard.prototype.getPoint = function (posistion) {
        return this, this.boardPositions[posistion];
    };
    Gameboard.prototype.recieveAttack = function (posistion) {
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
    };
    Gameboard.prototype.areShipsSunk = function () {
        for (var _i = 0, _a = this.ships; _i < _a.length; _i++) {
            var ship = _a[_i];
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    };
    return Gameboard;
}());
exports.default = Gameboard;
