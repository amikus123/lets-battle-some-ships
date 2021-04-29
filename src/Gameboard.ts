import Ship from "./Ship";
import BoardState from "./BoardState"
interface boardPosition {
  isHit: boolean;
  canPlace: boolean;
  ship: undefined | Ship;
  position: number;
}


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
      // console.log(ship)
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  private finishPlacingShip(createdShip: Ship): void {
    this.ships.push(createdShip);
    const startPosistion = createdShip.startPosition;
    const endPosition = createdShip.endPosition;
    if (endPosition - startPosistion < 10) {
      for (let i = startPosistion; i <= endPosition; i++) {
        this.boardState.setShipPositions(i, createdShip);
      }
    } else {
      // vertical
      for (let i = startPosistion; i <= endPosition; i += 10) {
        this.boardState.setShipPositions(i, createdShip);
      }
    }
  }

  public tryToPlaceShip(startPosistion: number, endPosistion: number) {
    const createdShip = new Ship(startPosistion, endPosistion);
    // horizontal
    const result = this.checkIfShipCanBePlaced(createdShip);
    if (result.canBePlaced) {
      this.finishPlacingShip(createdShip);
      return true;
    } else {
      return false;
    }
  }

  private checkIfShipCanBePlaced(createdShip: Ship) {
    let canBePlaced = true;
    const positionsToCheck = this.getAdjacentToShip(createdShip);
    for (const position of positionsToCheck) {
      if (this.shipOrEmpty(position)) {
        canBePlaced = false;
        break;
      }
    }
    return { canBePlaced: true, positionsToCheck };
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
  public isPositionHit(positon: number) {
    return this.boardState.isHit(positon);
  }
  public getPosition(posistion: number): boardPosition {
    // console.log(this.boardPositions[posistion], "insdie", posistion);
    return this.boardState.positions[posistion];
  }

  public recieveAttack(posistion: number) {
    if (this.getPosition(posistion).ship === null) {
      this.getPosition(posistion).ship?.receiveHit(posistion);
      return false;
    } else {
      this.getPosition(posistion).isHit = true;
      this.getPosition(posistion).ship?.receiveHit(posistion);
      return true;
    }
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

      if (this.tryToPlaceShip(randomStart, randomEnd) || x === 5000) {
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
      if (this.tryToPlaceShip(randomStart, randomEnd) || x === 5000) {
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
