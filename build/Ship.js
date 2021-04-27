"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ship = /** @class */ (function () {
    function Ship(startPosistion, endPosistion) {
        this.length = this.setLength(startPosistion, endPosistion);
        this.hull = this.setHull(this.length, startPosistion, endPosistion);
    }
    Ship.prototype.setHull = function (length, startPosistion, endPosistion) {
        //  eP - sP is smaller than 10? then it is horizontal
        var hull = [];
        if (endPosistion - startPosistion < 10) {
            for (var i = 0; i < length; i++) {
                hull.push({ isHit: false, posistion: startPosistion + i });
            }
        }
        else {
            for (var i = 0; i < length; i++) {
                hull.push({ isHit: false, posistion: startPosistion + i * 10 });
            }
        }
        return hull;
    };
    Ship.prototype.setLength = function (startPosistion, endPosistion) {
        if (endPosistion - startPosistion < 10) {
            //horizotnal
            return endPosistion - startPosistion + 1;
        }
        else {
            return (endPosistion - startPosistion) / 10 + 1;
        }
    };
    Ship.prototype.receiveHit = function (hitPosition) {
        this.getPoint(hitPosition).isHit = true;
    };
    Ship.prototype.getPoint = function (posistion) {
        for (var _i = 0, _a = this.hull; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.posistion == posistion) {
                return point;
            }
        }
    };
    Ship.prototype.isSunk = function () {
        for (var _i = 0, _a = this.hull; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.isHit) {
                return false;
            }
        }
        return true;
    };
    return Ship;
}());
exports.default = Ship;
