interface point {
  isHit: boolean;
  posistion: number;
}
class Ship {
  length: number;
  hull: point[];
  constructor(startPosistion: number, endPosistion: number) {
    this.length = this.setLength(startPosistion, endPosistion);
    this.hull = this.setHull(this.length, startPosistion, endPosistion);
  }
  private setHull(
    length: number,
    startPosistion: number,
    endPosistion: number
  ) {
    //  eP - sP is smaller than 10? then it is horizontal
    const hull: point[] = [];
    if (endPosistion - startPosistion < 10) {
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
  private setLength(startPosistion: number, endPosistion: number) {
    if (endPosistion - startPosistion < 10) {
      //horizotnal
      return endPosistion - startPosistion + 1;
    } else {
      return (endPosistion - startPosistion) / 10 + 1;
    }
  }

  public receiveHit(hitPosition: number) {
    this.getPoint(hitPosition)!.isHit = true;
  }

  public getPoint(posistion: number) {
    for (const point of this.hull) {
      if (point.posistion == posistion) {
        return point;
      }
    }
  }
  public isSunk() {
    for (const point of this.hull) {
      if (!point.isHit) {
        return false;
      }
    }
    return true;
  }
}
export default Ship;
//
