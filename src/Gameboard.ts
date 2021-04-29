import Ship from "./Ship";
import BoardState from "./BoardState";
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
    this.boardState.addShip(createdShip);
  }

  public tryToPlaceShip(startPosistion: number, endPosistion: number) {
    const createdShip = new Ship(startPosistion, endPosistion);
    // horizontal
    if (this.boardState.checkCanBePlaced(createdShip)) {
      this.finishPlacingShip(createdShip);
      return true;
    } else {
      return false;
    }
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
