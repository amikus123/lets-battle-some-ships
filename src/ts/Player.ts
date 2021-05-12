import AudioControl from "./AudioControl";
import { boardPosition } from "./BoardState";
import Gameboard from "./Gameboard";
import GameFlow from "./GameFlow";
const messages = {
  sunk : "sunk a ship! ",
  hit:"hit a ship! ",
  miss : "missed! ",
}
class Player {
  isComputer: boolean;
  gameboard: Gameboard;
  enemy: Player | null;
  gameFlow: GameFlow | null;
  audioControl: AudioControl | null;
  nextMoves: number[];
  messages: { sunk: string; hit: string; miss: string; };
  constructor(isCoomputer: boolean) {
    this.isComputer = isCoomputer;
    this.gameboard = new Gameboard();
    this.enemy = null;
    this.gameFlow = null;
    this.audioControl = null;
    this.nextMoves = [];
    this.messages = messages;
  }
  public setGameFlow(gameFlow: GameFlow): void {
    this.gameFlow = gameFlow;
  }
  public setEnemy(enemy: Player): void {
    this.enemy = enemy;
  }
  public setAudioControl(audio: AudioControl) {
    this.audioControl = audio;
  }
  public resetGameboard(): void {
    this.gameboard.resetGameboard();
  }
  public tryToPlaceShip(
    startPosistion: number,
    endPosistion: number,
    shouldPlace: boolean = true
  ): boolean {
    return this.gameboard.tryToPlaceShip(
      startPosistion,
      endPosistion,
      shouldPlace
    );
  }
  public randomizeShips(): void {
    this.gameboard.randomShipSetup();
  }

  public hasLost(): boolean {
    return this.gameboard.areShipsSunk();
  }
  private recieveAttack(posistion: number): void {
    this.gameboard.recieveAttack(posistion);
    this.updateBoard();
  }
  public addOnClick() {
    const enemyBoardDOM = document.getElementById("computer--board")!;
    Array.from(enemyBoardDOM?.children).forEach((square, index) => {
      square.addEventListener("click", () => this.userClick(square, index));
    });
    this.enemy?.updateBoard();
    this.updateBoard();
  }
  public beginAttack(posistion: number) {
    const attackedPosition: boardPosition = this.getPosition(posistion)!;
    console.log(attackedPosition, "attacked");
    this.enemy?.recieveAttack(posistion);
    const message: string = this.getMessageToDisply(attackedPosition);
    this.gameFlow!.displayBattleMessage(message);
    this.enemy?.updateBoard();
  }
  private getMessageToDisply(posistion: boardPosition) {
    const name = this.isComputer ? "Enemy has " : "You have ";
    const action = this.getAction(posistion);
    return name + action;
  }
  private getAction(posistion: boardPosition) {
    if (posistion.ship === undefined) {
      return  this.messages.miss;
    } else if (posistion.ship.isSunk()) {
      return this.messages.sunk;
    } else {
      return this.messages.hit;
    }
  }
  private computerMove() {
    console.log(this.nextMoves, "przed ruchem");
    if (this.nextMoves.length === 0) {
      const options = this.getPositionPossibleToAttack()!;
      const randomPositon = Math.floor(Math.random() * (options?.length + 1));
      this.tryToAddPossibleMoves(randomPositon);
      this.beginAttack(randomPositon);
      console.log(this.nextMoves, "possible moves");
    } else if (this.nextMoves.length === 1) {
      console.log("fisrt path");
    } else {
      console.log("third path");
    }

    this.gameFlow!.toggleTurn();
  }
  private chooseNextTarget() {
    // ignore first index
    // losuje jeden z nicg, potem, jelsi ok to kontuuje
    // liczba z zakresu 1 do length -1
    const randomIndex =
      Math.floor(Math.random() * this.nextMoves.length - 1) + 1;
    const positionIndex = this.nextMoves[randomIndex];
    this.beginAttack(positionIndex);
    if (this.getPosition(positionIndex)?.ship !== undefined) {
      // hit
    } else {
      // miss
    }
  }

  private getAdjecentToPosition(position: number): number[] {
    const positions: number[] = [position];
    if (position == 10) {
      positions.push(0);
    }
    if (position % 10 !== 9) {
      positions.push(position + 1);
    }
    if (position % 10 !== 0) {
      positions.push(position - 1);
    }
    if (position > 10) {
      positions.push(position - 10);
    }
    if (position < 90) {
      positions.push(position + 10);
    }
    return positions;
  }
  // posti
  private tryToAddPossibleMoves(positionIndex: number) {
    const postion = this.getPosition(positionIndex)!;
    // if we miss or sunk a ship there is no need to add next moves
    if (this.getAction(postion) ===  this.messages.hit) {
      const indexesToCheck = this.getAdjecentToPosition(positionIndex);
      console.log(indexesToCheck, "to check");
      indexesToCheck.forEach((item) => {
        if (!this.getPosition(item)?.isHit) {
          this.nextMoves.push(item);
        }
      });
    }
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
      }, 2000);
    } else {
      this.audioControl?.playErrorSound();
    }
  }

  public updateBoard() {
    console.log("XDDDD");
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
    return this.enemy?.gameboard.getPositionPossibleToAttack();
  }
  public getPosition(positon: number) {
    console.log(this.enemy?.gameboard.getPosition(positon), "adsasd");
    return this.enemy?.gameboard.getPosition(positon);
  }
}
export default Player;
