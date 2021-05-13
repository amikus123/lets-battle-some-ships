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
  private initalSetup() :boardPosition[] {
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
  public getPositionPossibleToAttack() :number[] {
    const res :number[] =[]

     this.positions.forEach((item,index) => {
       if(!item.isHit){
         res.push(index)
       }
    });
    return res;
  }
  public recieveAttack(position: number):void {
    this.positions[position].isHit = true;
  }

  public addShip(ship: Ship) :void{
    for (const point of ship.hull) {
      this.positions[point.position].ship = ship;
      this.positions[point.position].canPlace = false;
    }
    for (const index of ship.adjecentPositions) {
      this.positions[index].canPlace = false;
    }
  }
  public removeShip(ships: Ship[]):void {
    this.positions = this.initalSetup();
    ships.forEach((ship) => {
      this.addShip(ship);
    });
  }

  public isHit(position: number):boolean {
    // return this.positions[position].isHit ? true : false;
      return this.positions[position].isHit;

  }
  public checkCanBePlaced(ship: Ship) :boolean {
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
