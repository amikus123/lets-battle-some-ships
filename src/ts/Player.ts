import Gameboard from "./Gameboard";
class Player {
  isComputer: boolean;
  gameboard: Gameboard;
  enemy: Player | null;
  constructor(isCoomputer: boolean) {
    this.isComputer = isCoomputer;
    this.gameboard = new Gameboard();
    this.enemy = null;
  }
  public resetGameboard() {
    this.gameboard.resetGameboard();
  }
  public tryToPlaceShip(
    startPosistion: number,
    endPosistion: number,
    shouldPlace: boolean = true
  ) {
    return this.gameboard.tryToPlaceShip(
      startPosistion,
      endPosistion,
      shouldPlace
    );
  }
  public setEnemy(enemy: Player) {
    this.enemy = enemy;
  }

  public hasLost() {
    return this.gameboard.areShipsSunk();
  }
  private recieveAttack(posistion: number) {
    this.gameboard.recieveAttack(posistion);
  }
  public randomizeShips() {
    this.gameboard.randomShipSetup();
  }
  public beginAttack(posistion: number) {
    const attackedPosition = this.getPosition(posistion)!;
    if (attackedPosition.isHit) {
    } else {
      this.enemy?.recieveAttack(posistion);
    }
    this.enemy?.updateBoard();
  }
  public updateBoard() {
    let id = "";
    if (this.isComputer) {
      id = "computer--board";
    } else {
      id = "human--board";
    }
    const gameboardDOM: HTMLElement = document.getElementById(id)!;
    const gameSquares = Array.from(gameboardDOM.children);
    for (let i = 0; i < 100; i++) {
      gameSquares[
        i
      ].className = `game-square ${this.gameboard.boardState.getSquareState(
        i
      )}`;
    }
  }
  public addOnClick() {
    const enemyBoardDOM = document.getElementById("computer--board")!;
    Array.from(enemyBoardDOM?.children).forEach((square, index) => {
      square.addEventListener("click", () => this.beginAttack(index));
    });
    this.getPositionPossibleToAttack();
  }

  public getPositionPossibleToAttack() {
    console.log(this.enemy);
    console.log(this.enemy?.gameboard.getPositionPossibleToAttack());
    this.getPosition(11);
  }
  public getPosition(positon: number) {
    console.log(this.enemy?.gameboard.getPosition(positon), "adsasd");
    return this.enemy?.gameboard.getPosition(positon);
  }

  private humanAction() {}
  private computerAction() {}
}
export default Player;
