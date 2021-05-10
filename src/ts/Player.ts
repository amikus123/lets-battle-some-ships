import Gameboard from "./Gameboard";
import GameFlow from "./GameFlow";
class Player {
  isComputer: boolean;
  gameboard: Gameboard;
  enemy: Player | null;
  gameFlow: GameFlow | null;
  constructor(isCoomputer: boolean) {
    this.isComputer = isCoomputer;
    this.gameboard = new Gameboard();
    this.enemy = null;
    this.gameFlow = null;
  }
  public setGameFlow(gameFlow: GameFlow) {
    this.gameFlow = gameFlow;
  }
  public setEnemy(enemy: Player) {
    this.enemy = enemy;
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
  public randomizeShips() {
    this.gameboard.randomShipSetup();
  }

  public hasLost() {
    return this.gameboard.areShipsSunk();
  }
  private recieveAttack(posistion: number) {
    console.log(this.getPositionPossibleToAttack());
    this.gameboard.recieveAttack(posistion);
    this.updateBoard();
  }
  public addOnClick() {
    const enemyBoardDOM = document.getElementById("computer--board")!;
    Array.from(enemyBoardDOM?.children).forEach((square, index) => {
      square.addEventListener("click", () => this.userClick(square, index));
    });
    this.enemy?.updateBoard();
  }
  public beginAttack(posistion: number) {
    const attackedPosition = this.getPosition(posistion)!;
    if (attackedPosition.isHit) {
    } else {
      this.enemy?.recieveAttack(posistion);
    }
    console.log(this.getPositionPossibleToAttack());
    this.enemy?.updateBoard();
  }
  public userClick(square: Element, index: number) {
    if (
      !square.classList.contains("ship-hit") &&
      !square.classList.contains("empty-hit") &&
      this.gameFlow?.humanTurn
    ) {
      this.beginAttack(index);
      this.gameFlow.toggleTurn();
      setTimeout(()=>{this.enemy!.computerMove()},1000)
    }
  }
  private computerMove() {
    const options = this.getPositionPossibleToAttack()!;
    const randomPositon = Math.floor(Math.random() * (options?.length + 1));
    console.log(randomPositon);
    this.beginAttack(randomPositon);
    this.gameFlow!.toggleTurn();
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

  public getPositionPossibleToAttack() {
    console.log(this.enemy?.gameboard.getPositionPossibleToAttack()), "pssiube";
    return this.enemy?.gameboard.getPositionPossibleToAttack();
  }
  public getPosition(positon: number) {
    console.log(this.enemy?.gameboard.getPosition(positon), "adsasd");
    return this.enemy?.gameboard.getPosition(positon);
  }
}
export default Player;
