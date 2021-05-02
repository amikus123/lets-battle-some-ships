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
    getSquareState(index) {
        const result = this.positions[index];
        if (result.ship !== undefined) {
            return "afloat";
        }
        else if (!result.canPlace) {
            return "unplaceable";
        }
        else {
            return "empty";
        }
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
        ships.forEach(ship => {
            this.addShip(ship);
        });
    }
    setHit(position) {
        if (typeof position === "number") {
            this.addToHitList(position);
        }
        else {
            for (const num of position) {
                this.addToHitList(num);
            }
        }
    }
    addToHitList(position) {
        this.positions[position].isHit = true;
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
