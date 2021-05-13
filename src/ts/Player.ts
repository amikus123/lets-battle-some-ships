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
    previous: number;
    next: number;
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
      previous: -1,
      next: -1,
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
    console.log(attackedPosition, "przed");
    this.enemy?.recieveAttack(posistion);
    const message: string = this.getMessageToDisply(attackedPosition);
    this.gameFlow!.displayBattleMessage(message);
    this.enemy?.updateBoard();
    console.log(attackedPosition, "atakownae");
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
      let randomPositon = Math.floor(Math.random() * options?.length);
      this.beginAttack(options[randomPositon]);
      this.tryToAddPossibleMoves(options[randomPositon]);
      console.log(this.nextMoves, "possible moves");
    } else if (this.nextMoves.moves.length === 1) {
      console.log("one way", this.nextMoves);
      if (!this.getPosition(this.nextMoves.moves[0])?.isHit) {
        this.beginAttack(this.nextMoves.moves[0]);
      } else {
        this.nextMoves.goUp =
          Math.abs(this.nextMoves.baseHit - this.nextMoves.moves[0]) >= 10;
        this.handleOneDirection();
      }
    } else {
      console.log(
        "two waus",
        this.nextMoves.moves,
        this.nextMoves.moves.length
      );
      this.chooseNextTarget();
    }

    this.gameFlow!.toggleTurn();
  }
  private handleOneDirection() {
    if (this.nextMoves.goUp) {
      this.handleUp();
    } else {
      this.handleSide();
    }
  }
  // private handleSide() {
  //   console.log("SIDE");
  //   console.log(this.nextMoves,this.nextMoves.moves[0])
  //   const baseIndex = this.nextMoves.moves[0];
  //   let indexToCheck = this.nextMoves.moves[0]; //
  //   indexToCheck += this.nextMoves.add ? 1 : -1;
  //   if (
  //     baseIndex - (baseIndex % 10) !== indexToCheck - (indexToCheck % 10)
  //   ) {
  //     this.nextMoves.add = !this.nextMoves.add;
  //   }

  //   if (
  //     !(  baseIndex - (baseIndex % 10) !== indexToCheck - (indexToCheck % 10) ) &&
  //     this.shouldGoBack(indexToCheck)
  //   ) {
  //     this.nextMoves.add = !this.nextMoves.add;
  //   }
  //   console.log(
  //     baseIndex - (baseIndex % 10) !== indexToCheck - (indexToCheck % 10)
  //   );
  //   while (this.getPosition(indexToCheck)?.isHit) {
  //     indexToCheck += this.nextMoves.add ? 1 : -1;
  //   }
  //   const position = this.getPosition(indexToCheck)!;
  //   console.log(this.nextMoves, indexToCheck, this.getAction(position));
  //   this.beginAttack(indexToCheck);
  //   if (this.getAction(position) === this.messages.hit) {
  //     this.nextMoves.moves[0] = indexToCheck;
  //   } else if (this.getAction(position) === this.messages.miss) {
  //     this.nextMoves.add = !this.nextMoves.add;
  //   } else {
  //     this.nextMoves.moves = [];
  //   }
  // }
  private handleSide() {
    console.log("SIDE");
    console.log(this.nextMoves, this.nextMoves.moves[0]);
    const baseIndex = this.nextMoves.moves[0];
    let indexToCheck = this.nextMoves.moves[0];
    let goRight = true;
    // go right by deafult
    // if posistion is hit and a ship - continue
    // is position is hit and not a ship go back
    // if positon is not hti go next
    // if chanegd the row - go previous direction
    while (true) {
      indexToCheck += goRight ? 1 : -1;
      if (baseIndex - (baseIndex % 10) !== indexToCheck - (indexToCheck % 10)) {
        goRight = !goRight;
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
        goRight = !goRight;
      } else if (!this.getPosition(indexToCheck)?.isHit) {
        break;
        //go nex
      }
    }
    const position = this.getPosition(indexToCheck)!;
    console.log(this.nextMoves, indexToCheck, this.getAction(position));
    this.beginAttack(indexToCheck);
    if (this.getAction(position) === this.messages.hit) {
      this.nextMoves.moves[0] = indexToCheck;
    } else if (this.getAction(position) === this.messages.miss) {
      this.nextMoves.add = !this.nextMoves.add;
    } else {
      this.nextMoves.moves = [];
    }
  }
  private shouldGoBack(position: number) {
    const pos = this.getPosition(position);
    if (pos?.isHit && pos.ship === undefined) {
      return true;
    }
  }
  private handleUp() {
    console.log("up");
    const baseIndex = this.nextMoves.moves[0];
    let indexToCheck = this.nextMoves.add ? baseIndex + 10 : baseIndex - 10;
    console.log(this.nextMoves, this.nextMoves.moves[0]);
    if (indexToCheck < 10) {
      this.nextMoves.add = true;
    }
    if (indexToCheck > 89) {
      this.nextMoves.add = false;
    }
    if (
      !(indexToCheck < 10 || indexToCheck > 89) &&
      this.shouldGoBack(indexToCheck)
    ) {
      this.nextMoves.add = !this.nextMoves.add;
    }
    if (indexToCheck < 0 || indexToCheck > 99) {
      indexToCheck += this.nextMoves.add ? 10 : -10;
    }
    while (this.getPosition(indexToCheck)?.isHit) {
      console.log("plus", indexToCheck);
      indexToCheck += this.nextMoves.add ? 10 : -10;
    }
    const position = this.getPosition(indexToCheck)!;
    console.log(indexToCheck, position);
    this.beginAttack(indexToCheck);
    if (this.getAction(position) === this.messages.hit) {
      this.nextMoves.moves[0] = indexToCheck;
      console.log(this.nextMoves.baseHit, "nowe");
    } else if (this.getAction(position) === this.messages.miss) {
      this.nextMoves.add = !this.nextMoves.add;
    } else {
      this.nextMoves.moves = [];
    }
    console.log(this.nextMoves);
  }
  private chooseNextTarget() {
    const randomIndex = Math.floor(Math.random() * this.nextMoves.moves.length);
    const positionIndex = this.nextMoves.moves[randomIndex];
    const position = this.getPosition(positionIndex)!;
    console.log(randomIndex, positionIndex, position, this.nextMoves, "XDDD");
    this.beginAttack(positionIndex);
    if (this.getAction(position) === this.messages.hit) {
      console.log("HIT @ WAT");
      //determining direction
      console.log("wynik", (this.nextMoves.baseHit - positionIndex) % 10 === 0);
      if ((this.nextMoves.baseHit - positionIndex) % 10 === 0) {
        this.nextMoves.goUp = true;
      } else {
        this.nextMoves.goUp = false;
      }
      this.nextMoves.add = true;
      this.nextMoves.moves = [positionIndex];
    } else if (this.getAction(position) === this.messages.miss) {
      // miss
      console.log("RENOVING", this.nextMoves.moves, positionIndex, position);
      // we have to check other possibilities
      const newShit = this.nextMoves.moves.filter(
        (item) => item != positionIndex
      );
      this.nextMoves.moves = this.nextMoves.moves.filter(
        (item) => item != positionIndex
      );
      console.log("REMOVED", this.nextMoves.moves, newShit);
    } else {
      // sunk
      // we have to remove this tomfoolery
      this.nextMoves.moves = [];
      console.log("SUNK INB CHOOSE BNEXT", this.nextMoves.moves);
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
    console.log("what happend,", this.getAction(postion), postion);
    if (this.getAction(postion) === this.messages.hit) {
      let indexesToCheck = this.getAdjecentToPosition(positionIndex);
      this.nextMoves.baseHit = positionIndex;
      console.log(indexesToCheck, "to check");
      indexesToCheck = indexesToCheck.filter((item, index) => {
        if (!this.getPosition(item)?.isHit) {
          return item;
        }
      });
      console.log(indexesToCheck, "after");

      indexesToCheck.forEach((item) => {
        if (!this.getPosition(item)?.isHit) {
          this.nextMoves.moves.push(item);
        }
      });
      console.log(indexesToCheck, "end");
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
  private checkIfCanBeHti(positionIndex: number) {
    return this.enemy?.gameboard.boardState.positions[positionIndex].isHit;
  }
  public getPositionPossibleToAttack() {
    return this.enemy?.gameboard.getPositionPossibleToAttack();
  }
  public getPosition(positon: number) {
    return this.enemy?.gameboard.getPosition(positon);
  }
}
export default Player;
