"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoardState {
    constructor() {
        this.positions = this.initalSetup();
    }
    initalSetup() {
        const ret = [];
        for (let i = 0; i < 100; i++) {
            ret.push({ isHit: false, ship: undefined, canPlace: true });
        }
        return ret;
    }
    getSquareState(position) {
        const square = this.positions[position];
        let result = "";
        if (square.ship !== undefined) {
            if (square.isHit) {
                result += "ship-hit ";
            }
            else {
                result += "ship-afloat ";
            }
        }
        else {
            if (square.isHit) {
                result += "empty-hit ";
            }
            else {
                result += "empty ";
            }
        }
        if (!square.canPlace) {
            result += " unplaceable";
        }
        return result;
    }
    getPositionPossibleToAttack() {
        const possibleToAttack = this.positions.filter((item) => {
            // console.log(item);
            return item.isHit === false;
        });
        console.log(possibleToAttack, "pisss", this.positions, "aaa");
        return possibleToAttack;
    }
    recieveAttack(position) {
        this.positions[position].isHit = true;
        console.log("hit");
    }
    addShip(ship) {
        for (const point of ship.hull) {
            this.positions[point.position].ship = ship;
            this.positions[point.position].canPlace = false;
        }
        for (const index of ship.adjecentPositions) {
            this.positions[index].canPlace = false;
        }
    }
    removeShip(ships) {
        this.positions = this.initalSetup();
        ships.forEach((ship) => {
            this.addShip(ship);
        });
    }
    isHit(position) {
        return this.positions[position].isHit ? true : false;
    }
    checkCanBePlaced(ship) {
        if (ship.endPosition > 99) {
            return false;
        }
        if (ship.startPosition % 10 !== ship.endPosition % 10 &&
            ship.startPosition - (ship.startPosition % 10) !==
                ship.endPosition - (ship.endPosition % 10)) {
            return false;
        }
        for (const x of ship.hull) {
            if (!this.positions[x.position].canPlace) {
                return false;
            }
        }
        return true;
    }
}
exports.default = BoardState;
