"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ship = /** @class */ (function () {
    function Ship(length, startPosistion, endPosistion) {
        // we can determine the
        this.hull = this.createHull(length, startPosistion, endPosistion);
        this.length = length;
    }
    Ship.prototype.createHull = function (length, startPosistion, endPosistion) {
        //  eP - sP is smaller than 10? then it is horizontal
        var hull = [];
        if (endPosistion - startPosistion < 10) {
            //horizotnal
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
    return Ship;
}());
exports.default = Ship;
//
