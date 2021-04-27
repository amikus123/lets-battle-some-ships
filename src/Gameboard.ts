import Ship from "./Ship";
interface boardSquare {
  isHit: boolean;
  ship: null | Ship;
  posistion: number;
}
class Gameboard {
  boardSquares: boardSquare[];
  constructor() {
    this.boardSquares = this.createPoints();
  }
  createPoints() {
    const boardSquares: boardSquare[] = [];
    for (let i = 0; i < 100; i++) {
      boardSquares.push({ isHit: false, posistion: i, ship: null });
    }
    return boardSquares;
  }
  placeShip(startPosistion: number, endPosistion: number) {
    const createdShip = new Ship(startPosistion, endPosistion);
    // horizontal
    if (endPosistion - startPosistion < 10) {
      for (let i = startPosistion; i <= endPosistion; i++) {
        this.boardSquares[i].ship = createdShip;
      }
    } else {
      // vertical
      for (let i = startPosistion; i <= endPosistion; i += 10) {
        this.boardSquares[i].ship = createdShip;
      }
    }
  }
  recieveAttack(posistion: number) {
    if (this.boardSquares[posistion].ship !== null){
      this.boardSquares[posistion].isHit = true;
      this.boardSquares[posistion].ship?.receiveHit(posistion)
    }
  }
}
export default Gameboard;
