"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ship {
    constructor(startPosition, endPosition) {
        this.length = this.setLength(startPosition, endPosition);
        this.hull = this.setHull(this.length, startPosition, endPosition);
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }
    setHull(length, startPosition, endPosition) {
        //  eP - sP is smaller than 10? then it is horizontal
        const hull = [];
        if (endPosition - startPosition < 10) {
            for (let i = 0; i < length; i++) {
                hull.push({ isHit: false, position: startPosition + i });
            }
        }
        else {
            for (let i = 0; i < length; i++) {
                hull.push({ isHit: false, position: startPosition + i * 10 });
            }
        }
        return hull;
    }
    setLength(startPosition, endPosition) {
        if (endPosition - startPosition < 10) {
            //horizotnal
            return endPosition - startPosition + 1;
        }
        else {
            return (endPosition - startPosition) / 10 + 1;
        }
    }
    receiveHit(hitPosition) {
        this.getPoint(hitPosition).isHit = true;
    }
    getPoint(posistion) {
        for (const point of this.hull) {
            if (point.position == posistion) {
                return point;
            }
        }
        return this.hull[0];
    }
    isSunk() {
        for (const point of this.hull) {
            if (!point.isHit) {
                return false;
            }
        }
        return true;
    }
}
exports.default = Ship;
