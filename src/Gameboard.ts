import Ship from "./Ship";
import BoardState, { boardPosition } from "./BoardState";

class Gameboard {
  ships: Ship[];
  boardState: BoardState;
  shipsSizes: number[];
  constructor() {
    this.ships = [];
    this.boardState = new BoardState();
    this.shipsSizes = [1, 2, 3, 4];
    // this.shipsSizes = [ 2, 1, 1, 1, 1];
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

  private finishPlacingShip(createdShip: Ship): void {
    this.ships.push(createdShip);
    this.boardState.addShip(createdShip);
  }

  public tryToPlaceShip(startPosistion: number, endPosistion: number) {
    const createdShip = new Ship(startPosistion, endPosistion);
    // horizontal
    if (this.boardState.checkCanBePlaced(createdShip)) {
      // console.log(createdShip)
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
      if (this.randomBinary()) {
        this.randomVerticalShip(length);
      } else {
        this.randomHorizontalShip(length);
      }
    });
  }
  private chekIfValidRandomRow(row: number, length: number) {
    let max = 0;
    const possibleStarts = [];
    for (let i = row; i < row + 10 - length; i++) {
      let canInsert = true;
      for (let j = i; j < row + 10; j++) {
        if (!this.boardState.positions[j].canPlace) {
          canInsert = false;
          break;
        }
      }
      if (canInsert) {
        possibleStarts.push(i);
      }
    }
    console.log(possibleStarts,row,length)
  }
  private randomVerticalShip(length: number) {
    let x = 0;
    let randomColumn = 0;
    let randomStart = 0;
    let randomEnd = 0;
    while (true) {
      x++;
      // randomColumn = Math.floor(Math.random() * 10); //0-9
      // randomStart =
      //   Math.floor(Math.random() * (length - 1)) * 10 + randomColumn;
      // randomEnd = randomStart + (length - 1) * 10;
      randomColumn = Math.floor(Math.random() * 10); //0-9
      randomStart =
        Math.floor(Math.random() * (10 - length)) * 10 + randomColumn;
      randomEnd = randomStart + (length - 1) * 10;

      console.log(randomColumn, randomStart, randomEnd);
      if (this.tryToPlaceShip(randomStart, randomEnd) || x == 500) {
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
      // randomRow = Math.floor(Math.random() * 10) * 10;
      // randomStart = Math.floor(Math.random() * (length - 1)) + randomRow;
      // randomEnd = randomStart + length - 1;
      randomRow = Math.floor(Math.random() * 10) * 10;
      this.chekIfValidRandomRow(randomRow,length);
      randomStart = Math.floor(Math.random() * (10 - length)) + randomRow;
      randomEnd = randomStart + length - 1;
      console.log(randomRow, randomStart, randomEnd);

      if (this.tryToPlaceShip(randomStart, randomEnd) || x == 500) {
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
