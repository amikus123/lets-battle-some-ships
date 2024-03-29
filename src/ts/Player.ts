import AudioControl from "./AudioControl";
import { boardPosition } from "./BoardState";
import Gameboard from "./Gameboard";
import GameFlow from "./GameFlow";

const messages = {
  sunk: "sunk a ship! ",
  hit: "hit a ship! ",
  miss: "missed! ",
};
class Player {
  isComputer: boolean;
  gameboard: Gameboard;
  enemy: Player | null;
  gameFlow: GameFlow | null;
  audioControl: AudioControl | null;
  nextMoves: {
    moves: number[];
    goUp: boolean;
    add: boolean;
    baseHit: number;
  };
  messages: { sunk: string; hit: string; miss: string };
  constructor(isCoomputer: boolean) {
    this.isComputer = isCoomputer;
    this.gameboard = new Gameboard();
    this.enemy = null;
    this.gameFlow = null;
    this.audioControl = null;
    this.nextMoves = {
      moves: [],
      goUp: true,
      add: true,
      baseHit: -1,
    };
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
  // board manipulation
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

  public addOnClick() {
    const enemyBoardDOM = document.getElementById("computer--board")!;
    Array.from(enemyBoardDOM?.children).forEach((square, index) => {
      square.addEventListener("click", () => this.userClick(square, index));
    });
    this.enemy?.updateBoard();
    this.updateBoard();
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
      }, 1);
    } else {
      this.audioControl?.playErrorSound();
    }
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

  public hasLost(): boolean {
    return this.gameboard.areShipsSunk();
  }
  public getPositionPossibleToAttack() {
    return this.enemy?.gameboard.getPositionPossibleToAttack();
  }
  public getPosition(positon: number) {
    return this.enemy?.gameboard.getPosition(positon);
  }
  private recieveAttack(posistion: number): void {
    const attackedPosition: boardPosition = this.getPosition(posistion)!;
    this.gameboard.recieveAttack(posistion);

    this.updateBoard();
    if (this.hasLost()) {
      this.gameFlow?.endOfBattle(!this.isComputer);
    }
  }

  private playSound(attackedPosition: boardPosition) {
    const action = this.getAction(attackedPosition);
    switch (action) {
      case this.messages.miss:
        this.audioControl?.playMissSound();
        break;
      case this.messages.hit:
        this.audioControl?.playHitSound();
        break;
      default:
        this.audioControl?.playSunkSound();
        break;
    }
  }
  public beginAttack(posistion: number) {
    const attackedPosition: boardPosition = this.getPosition(posistion)!;
    this.enemy?.recieveAttack(posistion);
    const message: string = this.getMessageToDisply(attackedPosition);
    this.enemy?.playSound(attackedPosition);
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
      return this.messages.miss;
    } else if (posistion.ship.isSunk()) {
      return this.messages.sunk;
    } else {
      return this.messages.hit;
    }
  }

  private computerMove() {
    if (this.nextMoves.moves.length === 0) {
      const options = this.getPositionPossibleToAttack()!;
      let randomPositonIndex = Math.floor(Math.random() * options?.length);
      this.beginAttack(options[randomPositonIndex]);
      this.tryToAddPossibleMoves(options[randomPositonIndex]);
    } else if (this.nextMoves.moves.length === 1) {
      // we know the row or column, so we check ony one axis
      if (!this.getPosition(this.nextMoves.moves[0])?.isHit) {
        // checking if base position was hit
        this.beginAttack(this.nextMoves.moves[0]);
      } else {
        this.nextMoves.goUp =
          Math.abs(this.nextMoves.baseHit - this.nextMoves.moves[0]) >= 10;
        // this.handleOneDirection();
        this.handleOneDirection2();
      }
    } else {
      // we are checking positions in up to 4 direction
      this.chooseNextTarget();
    }

    this.gameFlow!.toggleTurn();
  }

  private checkIfOutsideRowOfAxis(dynamicIndex: number) {
    const baseIndex = this.nextMoves.moves[0];

    if (this.nextMoves.goUp) {
      return dynamicIndex < 0 || dynamicIndex > 99;
    } else {
      return (
        baseIndex - (baseIndex % 10) !== dynamicIndex - (dynamicIndex % 10)
      );
    }
  }
  private handleOneDirection2() {
    const baseIndex = this.nextMoves.moves[0];
    let indexToCheck = this.nextMoves.moves[0];
    let goUp = true;
    const additionNumber = this.nextMoves.goUp ? 10 : 1;
    if (this.getPosition(baseIndex)?.ship?.isSunk()) {
      this.nextMoves.moves = [];
    } else {
      while (true) {
        indexToCheck += goUp ? additionNumber : -additionNumber;
        if (this.checkIfOutsideRowOfAxis(indexToCheck)) {
          goUp = !goUp;
        } else if (
          this.getPosition(indexToCheck)?.isHit &&
          this.getPosition(indexToCheck)?.ship !== undefined
        ) {
          //go nex
        } else if (
          this.getPosition(indexToCheck)?.isHit &&
          this.getPosition(indexToCheck)?.ship === undefined
        ) {
          //go back
          goUp = !goUp;
        } else if (!this.getPosition(indexToCheck)?.isHit) {
          break;
          //go nex
        }
      }
      const position = this.getPosition(indexToCheck)!;
      this.beginAttack(indexToCheck);
      if (this.getAction(position) === this.messages.hit) {
        this.nextMoves.moves[0] = indexToCheck;
      } else if (this.getAction(position) === this.messages.sunk) {
        this.nextMoves.moves = [];
      } else {
      }
    }
  }
  private chooseNextTarget() {
    const randomIndex = Math.floor(Math.random() * this.nextMoves.moves.length);
    const positionIndex = this.nextMoves.moves[randomIndex];
    const position = this.getPosition(positionIndex)!;
    this.beginAttack(positionIndex);
    if (this.getAction(position) === this.messages.hit) {
      //determining direction
      if ((this.nextMoves.baseHit - positionIndex) % 10 === 0) {
        this.nextMoves.goUp = true;
      } else {
        this.nextMoves.goUp = false;
      }
      this.nextMoves.add = true;
      this.nextMoves.moves = [positionIndex];
    } else if (this.getAction(position) === this.messages.miss) {
      // miss, we are removing this position
      this.nextMoves.moves = this.nextMoves.moves.filter(
        (item) => item != positionIndex
      );
    } else {
      // ship was sunk, we have to reset
      this.nextMoves.moves = [];
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
  private tryToAddPossibleMoves(positionIndex: number) {
    const postion = this.getPosition(positionIndex)!;
    if (this.getAction(postion) === this.messages.hit) {
      let indexesToCheck = this.getAdjecentToPosition(positionIndex);
      this.nextMoves.baseHit = positionIndex;
      indexesToCheck = indexesToCheck.filter((item) => {
        if (!this.getPosition(item)?.isHit) {
          return item;
        }
      });
      indexesToCheck.forEach((item) => {
        if (!this.getPosition(item)?.isHit) {
          this.nextMoves.moves.push(item);
        }
      });
    }
  }
}
export default Player;
