import Ship from "./Ship";
export interface boardPosition {
  isHit: boolean;
  canPlace: boolean;
  ship: undefined | Ship;
  position: number;
}

class BoardState {
  positions: boardPosition[];
  afloat: number[];
  sunk: number[];
  hit: number[];
  miss: number[];
  unplacable: number[];
  constructor() {
    this.positions = this.initalSetup();
    this.afloat = [];
    this.sunk = [];
    this.hit = [];
    this.miss = [];
    this.unplacable = [];
  }
  private initalSetup() {
    const ret: boardPosition[] = [];
    for (let i = 0; i < 100; i++) {
      ret.push({ isHit: false, position: i, ship: undefined, canPlace: true });
    }
    return ret;
  }
  public getSquareState(index: number): string {
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
      this.afloat.push(point.position);
    }
    let combinedUnplaceable = this.unplacable
      .concat(ship.adjecentPositions)
      .concat(this.afloat)
      .concat(this.sunk);
    this.unplacable = [...new Set(combinedUnplaceable)];
    for (const x of this.unplacable) {
      this.positions[x].canPlace = false;
    }
  }
  private numbersFromPositions(arr: boardPosition[]) {
    const ret: number[] = [];
    for (const num of arr) {
      ret.push(num.position);
    }
    return ret;
  }
  private postionsFromNumbers(arr: number[]) {
    const ret: boardPosition[] = [];
    for (const num of arr) {
      ret.push(this.positions[num]);
    }
    return ret;
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
    this.hit.push(position);
    if (this.positions[position].ship === undefined) {
      this.miss.push(position);
    } else {
      this.hit.push(position);
    }
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
      (ship.startPosition % 10 !== ship.endPosition % 10) && (
        ship.startPosition - (ship.startPosition % 10) !==
      ship.endPosition - (ship.endPosition % 10)
      )
    ) {
      return false;
    }
    console.log(ship.startPosition, ship.endPosition);
    // means vertical
    console.log(ship.startPosition % 10, ship.endPosition % 10);
    console.log(
      ship.startPosition - (ship.startPosition % 10),
      ship.endPosition - (ship.endPosition % 10)
    );

    for (const x of ship.hull) {
      if (this.unplacable.indexOf(x.position) !== -1) {
        console.log(x.position, this.unplacable.indexOf(x.position), "fail");
        return false;
      }
    }
    return true;
  }

  getSunk() {}
  getAfloat() {}
}
export default BoardState;
