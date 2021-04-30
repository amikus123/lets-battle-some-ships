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
    // this.shipsSizes = [3,2,1];
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
      this.createRadnomShip(length);
    });
  }

  private createRadnomShip(lenght: number) {
    while (true) {
      if (  this.randomBinary()) {
        if (this.randomVerticalShip(lenght)) {
          break;
        }
      } else {
        if (this.randomHorizontalShip(lenght)) {
          console.log("BOK")
          break;
        }
      }
      // break;
    }
  }

  private randomVerticalShip(length: number) {
    const randomColumn = Math.floor(Math.random() * 10);
    // 0 9
    const validStarts = this.getValidVerticalStarts(randomColumn, length);
    if (validStarts.length !== 0) {
      const randomStart =
        validStarts[Math.floor(Math.random() * validStarts.length)];
      const newShip = new Ship(randomStart, randomStart + (length - 1) * 10);
      console.log("srodek", newShip);
      if ( true || this.boardState.checkCanBePlaced(newShip) ) {
        console.log(randomColumn, validStarts, newShip, randomStart, "err");
        this.finishPlacingShip(newShip);
        return true;
      }
    }
    return false;
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
  private getValidVerticalStarts(column: number, length: number) {
    const possibleStarts: number[] = [];
    // i = ilosc powtorzen gornej perli  11-l
    console.log("kolumna",column)
    for (let i = 0; i < 11 - length; i++) {
      let canInsert = true;
      for (let j = 0; j < length; j++) {
        // j == fieds to check
        // l = ilosc do sprawdzenia za kazdym razem
        if (!this.boardState.positions[(i + j) * 10 + column].canPlace) {
          canInsert = false;
          break;
        }
        console.log(this.boardState.positions[(i + j) * 10 + column])
      }
      if (canInsert) {
        possibleStarts.push(i * 10 + column);
      }
    }
    // possibleStarts.push(2)
    console.log(possibleStarts, column, length);
    return possibleStarts;
  }
  private getValidHorizontalStarts(row: number, length: number) {
    const possibleStarts = [];
    console.log("kolumna",row)
    for (let i = 0; i < 11 - length; i++) {
      let canInsert = true;
      for (let j = 0; j < length; j++) {
        // j == fieds to check
        // l = ilosc do sprawdzenia za kazdym razem
        if (!this.boardState.positions[i + j+ row].canPlace) {
          canInsert = false;
          break;
        }
        console.log(this.boardState.positions[i + j + row])
      }
      if (canInsert) {
        possibleStarts.push(i +row);
      }
    }
    // possibleStarts.push(2)
    console.log(possibleStarts, row, length);
    return possibleStarts;
  }


  private randomBinary() {
    let random = Math.round(Math.random());
    return random === 0 ? false : true;
  }
}
export default Gameboard;
