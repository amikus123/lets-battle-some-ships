import Ship, { point } from "./Ship";
interface boardPosition {
  isHit: boolean;
  ship: undefined | Ship;
  position: number;
}

class activeFields {
  afloat: number[];
  sunk: number[];
  constructor() {
    this.afloat = [];
    this.sunk = [];
  }
  public addAfloat(position: number) {
    this.afloat.push(position);
  }
  public addSunk(position: number) {
    this.sunk.push(position);
    const indexOfRemoved = this.afloat.indexOf(position);
    this.afloat.splice(indexOfRemoved, 1);
  }
}

class Gameboard {
  boardPositions: boardPosition[];
  ships: Ship[];
  shipState: activeFields;

  constructor() {
    this.boardPositions = this.setPoints();
    this.ships = [];
    this.shipState = new activeFields();
  }

  public resetGameboard() {
    this.boardPositions = this.setPoints();
    this.ships = [];
    this.shipState = new activeFields();
  }
  private setPoints() {
    const boardSquares: boardPosition[] = [];
    for (let i = 0; i < 100; i++) {
      boardSquares.push({ isHit: false, position: i, ship: undefined });
    }
    return boardSquares;
  }

  private placeShip(createdShip: Ship): void {
    this.ships.push(createdShip);
    const startPosistion = createdShip.startPosition;
    const endPosition = createdShip.endPosition;
    if (endPosition - startPosistion < 10) {
      for (let i = startPosistion; i <= endPosition; i++) {
        this.boardPositions[i].ship = createdShip;
        this.shipState.addAfloat(i);
      }
    } else {
      // vertical
      for (let i = startPosistion; i <= endPosition; i += 10) {
        this.shipState.addAfloat(i);

        this.boardPositions[i].ship = createdShip;
      }
    }
  }

  public tryToPlaceShip(startPosistion: number, endPosistion: number) {
    const createdShip = new Ship(startPosistion, endPosistion);
    // horizontal
    if (this.checkIfShipCanBePlaced(createdShip)) {
      this.placeShip(createdShip);
      return true;
    } else {
      return false;
    }
  }

  private checkIfShipCanBePlaced(createdShip: Ship): boolean {
    let canBePlaced = true;
    const positionsToCheck = this.getPositionsToCheck(createdShip);
    for (const position of positionsToCheck) {
      if (this.checkPosition(position)) {
        canBePlaced = false;
      }
    }
    return canBePlaced;
  }
  private getPositionsToCheck(createdShip: Ship) {
    let positionsToCheck: number[] = [];
    for (const point of createdShip.hull) {
      positionsToCheck = positionsToCheck.concat(
        this.positionsToCheck(point.position)
      );
    }
    return [...new Set(positionsToCheck)];
  }
  private checkPosition(positon: number): boolean {
    if (this.getPosition(positon).ship !== undefined) {
      return true;
    }
    return false;
  }
  private positionsToCheck(position: number): number[] {
    const positions: number[] = [];
    if (position % 10 !== 9) {
      positions.push(position + 1);
      if (position > 10) {
        positions.push(position - 9);
      }
      if (position < 90) {
        positions.push(position + 11);
      }
    }
    if (position % 10 !== 0) {
      positions.push(position - 1);
      if (position > 10) {
        positions.push(position - 11);
      }
      if (position < 90) {
        positions.push(position + 9);
      }
    }
    if (position > 10) {
      positions.push(position - 10);
    }
    if (position < 89) {
      positions.push(position + 10);
    }
    return positions;
  }

  public isPositionHit(posistion: number): boolean {
    if (this.boardPositions[posistion].isHit) {
      return true;
    } else {
      return false;
    }
  }

  public getPosition(posistion: number): boardPosition {
    // console.log(this.boardPositions[posistion],"insdie",posistion)
    return this.boardPositions[posistion];
  }

  public recieveAttack(posistion: number) {
    if (this.boardPositions[posistion].ship === null) {
      this.boardPositions[posistion].ship?.receiveHit(posistion);
      return false;
    } else {
      this.boardPositions[posistion].isHit = true;
      this.boardPositions[posistion].ship?.receiveHit(posistion);
      return true;
    }
  }

  public areShipsSunk() {
    for (const ship of this.ships) {
      // console.log(ship)
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
  public randomShipSetup() {
    this.resetGameboard();
    for (let i = 0; i < 4; i++) {
      console.log(i,this.ships)
      if (this.randomBinary()) {
        this.randomVerticalShip();
      } else {
        this.randomHorizontalShip();
        // this.randomVerticalShip();
      }
    }
  }
  private randomVerticalShip() {
    let randomColumn =0;
    let randomStart =0;
    let randomEnd = 0;
    while(true){
    randomColumn = Math.floor(Math.random()*10)
    // length will be 4, so max start is 5X
    randomStart = (Math.floor(Math.random()*7))*10 + randomColumn
    randomEnd =randomStart+30;
    // console.log(randomColumn,randomStart,randomEnd)
    if(this.tryToPlaceShip(randomStart,randomEnd)){
      break;
    }
    }
  }
  private randomHorizontalShip() {
    let randomRow =0;
    let randomStart =0;
    let randomEnd = 0;
    while(true){
    randomRow = Math.floor(Math.random()*10)*10
    // length will be 4, so max start is 5X
    randomStart = (Math.floor(Math.random()*7)) + randomRow
    randomEnd =randomStart+3;
    // console.log(randomRow,randomStart,randomEnd)
    if(this.tryToPlaceShip(randomStart,randomEnd)){
      break;
    }
    }
  }
  private randomBinary() {
    let random = Math.round(Math.random());
    return random === 0 ? false : true;
  }
}
export default Gameboard;
