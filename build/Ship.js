"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ship {
    constructor(startPosition, endPosition) {
        this.length = this.setLength(startPosition, endPosition);
        this.hull = this.setHull(this.length, startPosition, endPosition);
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.adjecentPositions = this.setAdjecentPositions(this.hull);
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
    setAdjecentPositions(hull) {
        let positionsToCheck = [];
        for (const point of hull) {
            positionsToCheck = positionsToCheck.concat(this.getAdjecentToPosition(point.position));
        }
        return [...new Set(positionsToCheck)];
    }
    getAdjecentToPosition(position) {
        const positions = [];
        if (position % 10 !== 9) {
            positions.push(position + 1);
            if (position > 9) {
                positions.push(position - 9);
            }
            if (position < 90) {
                positions.push(position + 11);
            }
        }
        if (position % 10 !== 0) {
            positions.push(position - 1);
            if (position > 9) {
                positions.push(position - 11);
            }
            if (position < 90) {
                positions.push(position + 9);
            }
        }
        if (position > 10) {
            positions.push(position - 10);
        }
        if (position < 90) {
            positions.push(position + 10);
        }
        return positions;
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
