interface point {
  isHit: boolean;
  posistion: number;
}
class Ship {
  length: number;
  hull: point[];
  constructor(length: number, startPosistion: number, endPosistion: number) {
    // we can determine the
    this.hull = this.createHull(length, startPosistion, endPosistion);
    this.length = length;
  }
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

  receiveHit(hitPosition:number){
    this.getPoint(hitPosition)!.isHit = true;
  }

  getPoint(posistion:number){
    for (const point of this.hull ){
      if(point.posistion == posistion){
        return point
      }
    }
  }
  
}
export default Ship;
//
