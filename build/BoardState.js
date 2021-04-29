"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoardState {
    constructor() {
        this.positions = this.initalSetup();
        this.afloat = [];
        this.sunk = [];
        this.hit = [];
        this.miss = [];
        this.unplacable = [];
    }
    initalSetup() {
        const ret = [];
        for (let i = 0; i < 100; i++) {
            ret.push({ isHit: false, position: i, ship: undefined, canPlace: true });
        }
        return ret;
    }
    setShipPositions(position, ship, unplacable) {
        if (typeof position === "number") {
            this.positions[position].ship = ship;
        }
        else {
            for (const num of position) {
                this.positions[num].ship = ship;
            }
        }
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
        this.hit.push(this.positions[position]);
        if (this.positions[position].ship === undefined) {
            this.miss.push(this.positions[position]);
        }
        else {
            this.hit.push(this.positions[position]);
        }
    }
    isHit(position) {
        return this.positions[position].isHit ? true : false;
    }
    checkCanBePlaced(ship) {
        for (const point of ship.hull) {
            if (!this.positions[point.position].canPlace) {
                return false;
            }
        }
        return true;
    }
    getSunk() { }
    getAfloat() { }
}
exports.default = BoardState;
