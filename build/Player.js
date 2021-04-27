"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Gameboard_1 = __importDefault(require("./Gameboard"));
var Player = /** @class */ (function () {
    function Player(isCoomputer) {
        this.isCoomputer = isCoomputer;
        this.gameboard = new Gameboard_1.default();
        this.enemy = null;
    }
    Player.prototype.setShip = function (startPosistion, endPosistion) {
        this.gameboard.placeShip(startPosistion, endPosistion);
    };
    Player.prototype.setEnemy = function (enemy) {
        this.enemy = enemy;
    };
    Player.prototype.hasLost = function () {
        return this.gameboard.areShipsSunk();
    };
    Player.prototype.recieveAttack = function (posistion) {
        this.gameboard.recieveAttack(posistion);
    };
    Player.prototype.beginAttack = function (posistion) {
        var _a;
        var hasHit = (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.recieveAttack(posistion);
        // ai should do something wit that info 
    };
    Player.prototype.choosePositionToAttack = function (posistion) {
        var _a;
        if ((_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.isPositionHit(posistion)) {
            this.beginAttack(posistion);
        }
        else {
            //
        }
    };
    Player.prototype.takeAction = function () {
        if (this.isCoomputer) {
            //
        }
        else {
            //
        }
    };
    Player.prototype.getSunk = function () {
        return this.gameboard.shipState.sunk;
    };
    Player.prototype.getAfloat = function () {
        return this.gameboard.shipState.afloat;
    };
    Player.prototype.humanAction = function () { };
    Player.prototype.computerAction = function () { };
    return Player;
}());
exports.default = Player;
