import Ship from "./Ship";
export interface boardPosition {
  isHit: boolean;
  canPlace: boolean;
  ship: undefined | Ship;
}

class BoardState {
  positions: boardPosition[];

  constructor() {
    this.positions = this.initalSetup();
  }
  private initalSetup() {
    const ret: boardPosition[] = [];
    for (let i = 0; i < 100; i++) {
      ret.push({ isHit: false, ship: undefined, canPlace: true });
    }
    return ret;
  }
  public getSquareState(index: number): string {
    // console.log(this.positions)
    const result = this.positions[index];
    if (result.ship !== undefined) {
      return "afloat";
    } else if (!result.canPlace) {
      return "unplaceable";
    } else {
      return "empty";
    }
  }
  public addShip(ship: Ship) {
    for (const point of ship.hull) {
      this.positions[point.position].ship = ship;
      this.positions[point.position].canPlace = false;
    }
    for (const index of ship.adjecentPositions) {
      this.positions[index].canPlace = false;
    }
  }
  public updateAfterRemoval(ships:Ship[]){
    this.positions = this.initalSetup();
    ships.forEach(ship=>this.addShip(ship))
    
  }
  public setHit(position: number | number[]) {
    if (typeof position === "number") {
      this.addToHitList(position);
    } else {
      for (const num of position) {
        this.addToHitList(num);
      }
    }
  }
  private addToHitList(position: number) {
    this.positions[position].isHit = true;
  }
  public isHit(position: number) {
    return this.positions[position].isHit ? true : false;
  }
  public checkCanBePlaced(ship: Ship) {
    console.log("checkCanBePlaced", ship);
    if (ship.endPosition > 99) {
      return false;
    }
    if (
      ship.startPosition % 10 !== ship.endPosition % 10 &&
      ship.startPosition - (ship.startPosition % 10) !==
        ship.endPosition - (ship.endPosition % 10)
    ) {
      return false;
    }
    for (const x of ship.hull) {
      if (!this.positions[x.position].canPlace) {
        // console.log(x.position, this.unplacable.indexOf(x.position), "fail");
        return false;
      }
    }
    return true;
  }

  getSunk() {}
  getAfloat() {}
  getHit() {}
  getUnplacable() {}
}
export default BoardState;
