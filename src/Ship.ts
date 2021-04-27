interface point {
  isHit: boolean;
  posistion: number;
}
class Ship {
  length: number;
  hull: point[];
  constructor(startPosistion: number, endPosistion: number) {
    // we can determine the
    this.length = this.createLength(startPosistion, endPosistion);
    this.hull = this.createHull(this.length, startPosistion, endPosistion);
  }
  // CONSTRUCTOR FUNCTIONS
  createHull(length: number, startPosistion: number, endPosistion: number) {
    //  eP - sP is smaller than 10? then it is horizontal
    const hull: point[] = [];
    if (endPosistion - startPosistion < 10) {
      //horizotnal
      for (let i = 0; i < length; i++) {
        hull.push({ isHit: false, posistion: startPosistion + i });
      }
    } else {
      for (let i = 0; i < length; i++) {
        hull.push({ isHit: false, posistion: startPosistion + i * 10 });
      }
    }
    return hull;
  }
  createLength(startPosistion: number, endPosistion: number) {
    if ((endPosistion - startPosistion) < 10) {
      //horizotnal
      return endPosistion - startPosistion;
    } else {
      return (endPosistion - startPosistion) / 10;
    }
  }

  receiveHit(hitPosition: number) {
    this.getPoint(hitPosition)!.isHit = true
  }
  // METHODS
  getPoint(posistion: number) {
    for (const point of this.hull) {
      if (point.posistion == posistion) {
        return point;
      }
    }
  }
  isSunk() {
    for (const point of this.hull) {
      if (!point.isHit) {
        return true;
      }
      return false;
    }
  }
}
export default Ship;
//
