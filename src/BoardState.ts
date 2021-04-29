import Ship from "./Ship";
interface boardPosition {
  isHit: boolean;
  canPlace: boolean;
  ship: undefined | Ship;
  position: number;
}

class BoardState {
    positions: boardPosition[];
    afloat: boardPosition[];
    sunk: boardPosition[];
    hit: boardPosition[];
    miss: boardPosition[];
    unplacable:boardPosition[];
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
    public setShipPositions(position: number | number[], ship: Ship,unplacable:number) {
      if (typeof position === "number") {
        this.positions[position].ship = ship;
      } else {
        for (const num of position) {
          this.positions[num].ship = ship;
        }
      }
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
      this.hit.push(this.positions[position]);
      if (this.positions[position].ship === undefined) {
        this.miss.push(this.positions[position]);
      } else {
        this.hit.push(this.positions[position]);
      }
    }
    
    public isHit(position: number) {
      return this.positions[position].isHit ? true : false;
    }
    public checkCanBePlaced(ship:Ship){
        for(const point of ship.hull){
            if(!this.positions[point.position].canPlace){
                return false
            }
        }
        return true
    }
    getSunk() {}
    getAfloat() {}
  }
  export default BoardState;