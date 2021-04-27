import Ship from "./Ship";
interface boardPosition {
  isHit: boolean;
  ship: null | Ship;
  position: number;
}
class shipState {
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
  shipState: shipState;

  constructor() {
    this.boardPositions = this.setPoints();
    this.ships = [];
    this.shipState = new shipState();
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
    this.ships.push(createdShip);
    // horizontal
    if (endPosistion - startPosistion < 10) {
      for (let i = startPosistion; i <= endPosistion; i++) {
        this.boardPositions[i].ship = createdShip;
        this.shipState.addAfloat(i);
      }
    } else {
      // vertical
      for (let i = startPosistion; i <= endPosistion; i += 10) {
        this.shipState.addAfloat(i);

        this.boardPositions[i].ship = createdShip;
      }
    }
  }
  public isPositionHit(posistion: number): boolean {
    if (this.boardPositions[posistion].isHit) {
      return true;
    } else {
      return false;
    }
  }
  public getPoint(posistion: number) {
    return this, this.boardPositions[posistion];
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
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}
export default Gameboard;
