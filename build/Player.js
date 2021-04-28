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
    setShip(startPosistion, endPosistion) {
        this.gameboard.tryToPlaceShip(startPosistion, endPosistion);
    }
    setEnemy(enemy) {
        this.enemy = enemy;
    }
    hasLost() {
        return this.gameboard.areShipsSunk();
    }
    recieveAttack(posistion) {
        this.gameboard.recieveAttack(posistion);
    }
    beginAttack(posistion) {
        var _a;
        const hasHit = (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.recieveAttack(posistion);
        // ai should do something wit that info   
    }
    choosePositionToAttack(posistion) {
        var _a;
        if ((_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.isPositionHit(posistion)) {
            this.beginAttack(posistion);
        }
        else {
            //
        }
    }
    takeAction() {
        if (this.isComputer) {
            //
        }
        else {
            //
        }
    }
    getSunk() {
        return this.gameboard.shipState.sunk;
    }
    getAfloat() {
        return this.gameboard.shipState.afloat;
    }
    humanAction() { }
    computerAction() { }
}
exports.default = Player;
