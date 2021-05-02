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
            this.afloat.push(point.position);
        }
        let combinedUnplaceable = this.unplacable
            .concat(ship.adjecentPositions)
            .concat(this.afloat)
            .concat(this.sunk);
        this.unplacable = [...new Set(combinedUnplaceable)];
        for (const x of this.unplacable) {
            this.positions[x].canPlace = false;
        }
    }
    numbersFromPositions(arr) {
        const ret = [];
        for (const num of arr) {
            ret.push(num.position);
        }
        return ret;
    }
    postionsFromNumbers(arr) {
        const ret = [];
        for (const num of arr) {
            ret.push(this.positions[num]);
        }
        return ret;
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
        this.hit.push(position);
        if (this.positions[position].ship === undefined) {
            this.miss.push(position);
        }
        else {
            this.hit.push(position);
        }
    }
    isHit(position) {
        return this.positions[position].isHit ? true : false;
    }
    checkCanBePlaced(ship) {
        console.log("tsts");
        for (const x of ship.hull) {
            if (this.unplacable.indexOf(x.position) !== -1) {
                console.log(x.position, this.unplacable.indexOf(x.position), "fail");
                return false;
            }
        }
        return true;
    }
    getSunk() { }
    getAfloat() { }
}
exports.default = BoardState;
