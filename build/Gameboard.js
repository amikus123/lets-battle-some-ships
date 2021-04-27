"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ship_1 = __importDefault(require("./Ship"));
var Gameboard = /** @class */ (function () {
    function Gameboard() {
        this.boardSquares = this.createPoints();
    }
    Gameboard.prototype.createPoints = function () {
        var boardSquares = [];
        for (var i = 0; i < 100; i++) {
            boardSquares.push({ isHit: false, posistion: i, ship: null });
        }
        return boardSquares;
    };
    Gameboard.prototype.placeShip = function (startPosistion, endPosistion) {
        var createdShip = new Ship_1.default(startPosistion, endPosistion);
        // horizontal
        if (endPosistion - startPosistion < 10) {
            for (var i = startPosistion; i <= endPosistion; i++) {
                this.boardSquares[i].ship = createdShip;
            }
        }
        else {
            // vertical
            for (var i = startPosistion; i <= endPosistion; i += 10) {
                this.boardSquares[i].ship = createdShip;
            }
        }
    };
    Gameboard.prototype.recieveAttack = function (posistion) {
        var _a;
        if (this.boardSquares[posistion].ship !== null) {
            this.boardSquares[posistion].isHit = true;
            (_a = this.boardSquares[posistion].ship) === null || _a === void 0 ? void 0 : _a.receiveHit(posistion);
        }
    };
    return Gameboard;
}());
exports.default = Gameboard;
