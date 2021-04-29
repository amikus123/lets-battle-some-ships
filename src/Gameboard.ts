import Ship, { point } from "./Ship";
interface boardPosition {
  isHit: boolean;
  ship: undefined | Ship;
  position: number;
}

class activeFields {
  afloat: number[];
  sunk: number[];
  placeable: number[];
  unplaceable: number[];
  
  constructor() {
    this.afloat = [];
    this.sunk = [];
    this.placeable = this.setPlaceable();
    this.unplaceable = [];
  }
  public addAfloat(position: number) {
    this.afloat.push(position);
  }
  public addSunk(position: number) {
    this.sunk.push(position);
    const indexOfRemoved = this.afloat.indexOf(position);
    this.afloat.splice(indexOfRemoved, 1);
  }
  public addUnplaceable(positon: number) {
    this.unplaceable.push(positon);
    this.placeable.splice(this.placeable.indexOf(positon), 1);
  }
  private setPlaceable() {
    const placeable: number[] = [];
    for (let i = 0; i < 100; i++) {
      placeable.push(i);
    }
    return placeable;
  }
}

class Gameboard {
  boardPositions: boardPosition[];
  ships: Ship[];
  positionsState: activeFields;
  shipsSizes: number[];
  constructor() {
    this.boardPositions = this.setPoints();
    this.ships = [];
    this.positionsState = new activeFields();
    this.shipsSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  }

  public resetGameboard() {
    this.boardPositions = this.setPoints();
    this.ships = [];
    this.positionsState = new activeFields();
  }
  private setPoints() {
    const boardSquares: boardPosition[] = [];
    for (let i = 0; i < 100; i++) {
      boardSquares.push({ isHit: false, position: i, ship: undefined });
    }
    return boardSquares;
  }

  private finishPlacingShip(createdShip: Ship): void {
    this.ships.push(createdShip);
    const startPosistion = createdShip.startPosition;
    const endPosition = createdShip.endPosition;
    if (endPosition - startPosistion < 10) {
      for (let i = startPosistion; i <= endPosition; i++) {
        this.boardPositions[i].ship = createdShip;
        this.positionsState.addAfloat(i);
      }
    } else {
      // vertical
      for (let i = startPosistion; i <= endPosition; i += 10) {
        this.positionsState.addAfloat(i);

        this.boardPositions[i].ship = createdShip;
      }
    }
  }

  public tryToPlaceShip(startPosistion: number, endPosistion: number) {
    const createdShip = new Ship(startPosistion, endPosistion);
    // horizontal
    if (this.checkIfShipCanBePlaced(createdShip)) {
      this.finishPlacingShip(createdShip);
      return true;
    } else {
      return false;
    }
  }

  private checkIfShipCanBePlaced(createdShip: Ship): boolean {
    let canBePlaced = true;
    const positionsToCheck = this.getAdjacentToShip(createdShip);
    for (const position of positionsToCheck) {
      if (this.shipOrEmpty(position)) {
        canBePlaced = false;
      }
    }
    return canBePlaced;
  }
  private getAdjacentToShip(createdShip: Ship) {
    let positionsToCheck: number[] = [];
    for (const point of createdShip.hull) {
      positionsToCheck = positionsToCheck.concat(
        this.getAdjacentToPosition(point.position)
      );
    }
    return [...new Set(positionsToCheck)];
  }
  private shipOrEmpty(positon: number): boolean {
    if (this.getPosition(positon)!.ship !== undefined) {
      return true;
    }
    return false;
  }
  private getAdjacentToPosition(position: number): number[] {
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
    // console.log(positions, position);
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
    // console.log(this.boardPositions[posistion], "insdie", posistion);
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
    this.shipsSizes.forEach((length) => {
      // console.log(length, this.ships);
      if (this.randomBinary()) {
        this.randomVerticalShip(length);
      } else {
        this.randomHorizontalShip(length);
        // this.randomVerticalShip();
      }
    });
  }

  private randomVerticalShip(length: number) {
    let x = 0;
    let randomColumn = 0;
    let randomStart = 0;
    let randomEnd = 0;
    while (true) {
      x++;
      randomColumn = Math.floor(Math.random() * 10);
      // length will be 4, so max start is 5X
      randomStart =
        Math.floor(Math.random() * (length - 1)) * 10 + randomColumn;
      randomEnd = randomStart + (length - 1) * 10;
      // console.log(randomColumn,randomStart,randomEnd)

      if (this.tryToPlaceShip(randomStart, randomEnd) || x === 50) {
        break;
      }
    }
  }

  private randomHorizontalShip(length: number) {
    let x = 0;
    let randomRow = 0;
    let randomStart = 0;
    let randomEnd = 0;
    while (true) {
      x++;
      randomRow = Math.floor(Math.random() * 10) * 10;
      // length will be 4, so max start is 5X
      randomStart = Math.floor(Math.random() * (length - 1)) + randomRow;
      randomEnd = randomStart + length - 1;
      // console.log(randomRow,randomStart,randomEnd)
      if (this.tryToPlaceShip(randomStart, randomEnd) || x === 50) {
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
