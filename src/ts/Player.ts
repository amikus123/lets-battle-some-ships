import { boardPosition } from "./BoardState";
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
  public setGameFlow(gameFlow: GameFlow):void {
    this.gameFlow = gameFlow;
  }
  public setEnemy(enemy: Player):void {
    this.enemy = enemy;
  }
  public resetGameboard():void {
    this.gameboard.resetGameboard();
  }
  public tryToPlaceShip(
    startPosistion: number,
    endPosistion: number,
    shouldPlace: boolean = true
  ) :boolean {
    return this.gameboard.tryToPlaceShip(
      startPosistion,
      endPosistion,
      shouldPlace
    );
  }
  public randomizeShips() :void {
    this.gameboard.randomShipSetup();
  }

  public hasLost() :boolean{
    return this.gameboard.areShipsSunk();
  }
  private recieveAttack(posistion: number):void {
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
    const attackedPosition :boardPosition = this.getPosition(posistion)!;
    console.log(attackedPosition, "attacked");
    this.enemy?.recieveAttack(posistion);
    const message :string= this.getMessageToDisply(attackedPosition)
    this.gameFlow!.displayBattleMessage(message);
    // console.log(this.getPositionPossibleToAttack());
    this.enemy?.updateBoard();
  }
  public getMessageToDisply(posistion:boardPosition){
    const name = this.isComputer?"Enemy has ":"You have ";
    let action = ""
    if(posistion.ship === undefined){
      action = "missed!"
    }
    else if(posistion.ship.isSunk()){
      action = "sunk a ship!"
    }else{
      action = "hit a ship!"
    }
    
    return name + action;

  }
  public userClick(square: Element, index: number) {
    if (
      !square.classList.contains("ship-hit") &&
      !square.classList.contains("empty-hit") &&
      this.gameFlow?.humanTurn
    ) {
      this.beginAttack(index);
      this.gameFlow.toggleTurn();
      setTimeout(() => {
        this.enemy!.computerMove();
      }, 1000);
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
    // console.log(this.enemy?.gameboard.getPositionPossibleToAttack()), "pssiube";
    return this.enemy?.gameboard.getPositionPossibleToAttack();
  }
  public getPosition(positon: number) {
    console.log(this.enemy?.gameboard.getPosition(positon), "adsasd");
    return this.enemy?.gameboard.getPosition(positon);
  }
}
export default Player;
