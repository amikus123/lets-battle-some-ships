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
    addShip(ship) {
        for (const point of ship.hull) {
            this.positions[point.position].ship = ship;
            this.positions[point.position].canPlace = false;
            this.afloat.push(point.position);
        }
        let combinedUnplaceable = this.unplacable.concat(ship.adjecentPositions).concat(this.afloat).concat(this.sunk);
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
        //     let x = true;
        // for(const position of ship.adjecentPositions){
        // if(!this.positions[position].canPlace){
        //     x = false;
        //     console.log(this.positions[position])
        // }
        // return x
        for (const x of ship.adjecentPositions) {
            if (this.unplacable.indexOf(x) !== -1) {
                return false;
            }
        }
        return true;
    }
    getSunk() { }
    getAfloat() { }
}
exports.default = BoardState;
