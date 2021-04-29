export interface point {
  isHit: boolean;
  position: number;
}
class Ship {
  length: number;
  hull: point[];
  adjecentPositions:number[]
  startPosition:number;
  endPosition:number
  constructor(startPosition: number, endPosition: number) {
    this.length = this.setLength(startPosition, endPosition);
    this.hull = this.setHull(this.length, startPosition, endPosition);
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.adjecentPositions = this.setAdjecentPositions(this.hull);
  }
  private setHull(
    length: number,
    startPosition: number,
    endPosition: number
  ) {
    //  eP - sP is smaller than 10? then it is horizontal
    const hull: point[] = [];
    if (endPosition - startPosition < 10) {
      for (let i = 0; i < length; i++) {
        hull.push({ isHit: false, position: startPosition + i });
      }
    } else {
      for (let i = 0; i < length; i++) {
        hull.push({ isHit: false, position: startPosition + i * 10 });
      }
    }
    return hull;
  }
  private setAdjecentPositions(hull:point[]){
    let positionsToCheck: number[] = [];
      for( const point of hull){
        positionsToCheck = positionsToCheck.concat(
          this.getAdjecentToPosition(point.position)
        );
      }
      return [...new Set(positionsToCheck)];
    }
  private getAdjecentToPosition(position:number){
    const positions: number[] = [];
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
  private setLength(startPosition: number, endPosition: number) {
    if (endPosition - startPosition < 10) {
      //horizotnal
      return endPosition - startPosition + 1;
    } else {
      return (endPosition - startPosition) / 10 + 1;
    }
  }

  public receiveHit(hitPosition: number) {
    this.getPoint(hitPosition)!.isHit = true;
  }

  public getPoint(posistion: number) {
    for (const point of this.hull) {
      if (point.position == posistion) {
        return point;
      }
    }
    return this.hull[0];
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
