import Ship from "./Ship";
import BoardState, { boardPosition } from "./BoardState";

class Gameboard {
  ships: Ship[];
  boardState: BoardState;
  shipsSizes: number[];
  constructor() {
    this.ships = [];
    this.boardState = new BoardState();
    this.shipsSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  }

  public resetGameboard() {
    this.ships = [];
    this.boardState = new BoardState();
  }
  public areShipsSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  public tryToPlaceShip(
    startPosistion: number,
    endPosistion: number,
    shouldPlace: boolean = true
  ) {
    const createdShip = new Ship(startPosistion, endPosistion);
    if (this.boardState.checkCanBePlaced(createdShip) && endPosistion <=99) {
      if (shouldPlace) {
        this.finishPlacingShip(createdShip);
      }
      return true;
    } else {
      return false;
    }
  }
  public isPositionHit(positon: number) {
    return this.boardState.isHit(positon);
  }
  public getPosition(posistion: number): boardPosition {
    return this.boardState.positions[posistion];
  }
  public removeShip(start:number,end:number){
    let indexToRemove = -1;
    console.log(this.ships.length,"przed")
    this.ships.forEach((ship,inedx)=>{
      if(ship.startPosition == start){
        indexToRemove = inedx 
      }
    })
    if(indexToRemove !== -1){
      this.ships.splice(indexToRemove,1)
    }
    this.boardState.removeShip(this.ships)
    console.log(this.ships.length,"po")
  }
  public recieveAttack(posistion: number) {
    this.boardState.recieveAttack(posistion)
    this.ships.forEach(ship=>{
      ship.hull.forEach(point=>{
        if(point.position == posistion){
          point.isHit = true
        }
      })
      if(ship.isSunk()){
        console.log("sunk")
        ship.adjecentPositions.forEach(index=>{
          this.boardState.recieveAttack(index)
          
        })
      }
    })
    
  }

  public getPositionPossibleToAttack(){
   return this.boardState.getPositionPossibleToAttack()
  }
  public randomShipSetup() {
    this.resetGameboard();
    this.shipsSizes.forEach((length) => {
      this.createRadnomShip(length);
    });
    return this.ships
  }

  private createRadnomShip(lenght: number) {
    while (true) {
      if (Math.round(Math.random()) === 1) {
        if (this.randomVerticalShip(lenght)) {
          break;
        }
      } else {
        if (this.randomHorizontalShip(lenght)) {
          break;
        }
      }
    }
  }

  private randomVerticalShip(length: number) {
    const randomColumn = Math.floor(Math.random() * 10);
    const validStarts = this.getValidVerticalStarts(randomColumn, length);
    if (validStarts.length !== 0) {
      const randomStart =
        validStarts[Math.floor(Math.random() * validStarts.length)];
      const newShip = new Ship(randomStart, randomStart + (length - 1) * 10);
      if (true || this.boardState.checkCanBePlaced(newShip)) {
        this.finishPlacingShip(newShip);
        return true;
      }
    }
    return false;
  }
  private getValidVerticalStarts(column: number, length: number) {
    const possibleStarts: number[] = [];
    for (let i = 0; i < 11 - length; i++) {
      let canInsert = true;
      for (let j = 0; j < length; j++) {
        // j == fieds to check
        // l = ilosc do sprawdzenia za kazdym razem
        if (!this.boardState.positions[(i + j) * 10 + column].canPlace) {
          canInsert = false;
          break;
        }
      }
      if (canInsert) {
        possibleStarts.push(i * 10 + column);
      }
    }
    return possibleStarts;
  }

  private randomHorizontalShip(length: number) {
    const randomRow = Math.floor(Math.random() * 10) * 10;
    const validStarts = this.getValidHorizontalStarts(randomRow, length);
    if (validStarts.length !== 0) {
      // there are possible postions
      const randomStart =
        validStarts[Math.floor(Math.random() * validStarts.length)];
      const newShip = new Ship(randomStart, randomStart + length - 1);
      this.finishPlacingShip(newShip);

      return true;
    }
    return false;
  }
  private getValidHorizontalStarts(row: number, length: number) {
    const possibleStarts = [];
    for (let i = 0; i < 11 - length; i++) {
      let canInsert = true;
      for (let j = 0; j < length; j++) {
        if (!this.boardState.positions[i + j + row].canPlace) {
          canInsert = false;
          break;
        }
      }
      if (canInsert) {
        possibleStarts.push(i + row);
      }
    }
    return possibleStarts;
  }
  private finishPlacingShip(createdShip: Ship): void {
    this.ships.push(createdShip);
    this.boardState.addShip(createdShip);
  }
}
export default Gameboard;
