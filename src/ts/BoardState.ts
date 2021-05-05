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
  public getSquareState(position: number): string {
    const square = this.positions[position];
    let result = "";

    if (square.ship !== undefined) {
      if(square.isHit){
        result += "ship-hit "
      }else{
        result += "ship-afloat "
      }
    } else {
      if(square.isHit){
        result += "empty-hit "
      }else{
        result+="empty "
      }
    }
    if(!square.canPlace){
      result +=" unplaceable"
    }
    return result;
  }
  public getPositionPossibleToAttack() {
    const possibleToAttack = this.positions.filter((item) => {
      console.log(item);
      return item.isHit!;
    });
    console.log(possibleToAttack);
    return possibleToAttack;
  }
  public recieveAttack(position: number) {
    this.positions[position].isHit = true;
    console.log("hit");
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
  public removeShip(ships: Ship[]) {
    this.positions = this.initalSetup();
    ships.forEach((ship) => {
      this.addShip(ship);
    });
  }

  public isHit(position: number) {
    return this.positions[position].isHit ? true : false;
  }
  public checkCanBePlaced(ship: Ship) {
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
        return false;
      }
    }
    return true;
  }
}
export default BoardState;
