import Ship from "./Ship";
interface boardPosition {
  isHit: boolean;
  ship: null | Ship;
  position: number;
}
class Gameboard {
  boardPositions: boardPosition[];
  ships: Ship[];
  constructor() {
    this.boardPositions = this.setPoints();
    this.ships = [];
  }
  private setPoints() {
    const boardSquares: boardPosition[] = [];
    for (let i = 0; i < 100; i++) {
      boardSquares.push({ isHit: false, position: i, ship: null });
    }
    return boardSquares;
  }
  public placeShip(startPosistion: number, endPosistion: number) {
    const createdShip = new Ship(startPosistion, endPosistion);
    this.ships.push(createdShip)
    // horizontal
    if (endPosistion - startPosistion < 10) {
      for (let i = startPosistion; i <= endPosistion; i++) {
        this.boardPositions[i].ship = createdShip;
      }
    } else {
      // vertical
      for (let i = startPosistion; i <= endPosistion; i += 10) {
        this.boardPositions[i].ship = createdShip;
      }
    }
  }
  public isPosistionHit(posistion:number):boolean{
    if(this.boardPositions[posistion].isHit){
      return true;
    }else{
      return false;
    }
  }
  public getPoint(posistion:number){
    return this,this.boardPositions[posistion]
  }


  public recieveAttack(posistion: number) {
    if (this.boardPositions[posistion].ship === null){
      this.boardPositions[posistion].ship?.receiveHit(posistion)
      return false;
    }else{
      this.boardPositions[posistion].isHit = true;
      this.boardPositions[posistion].ship?.receiveHit(posistion)
      return true;
    }  
  }
  
  public areShipsSunk(){
    for (const ship of this.ships){
        if(!ship.isSunk()){
          return false
        }
    }
    return true;
  }
}
export default Gameboard;
