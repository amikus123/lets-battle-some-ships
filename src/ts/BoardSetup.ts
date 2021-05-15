import Player from "./Player";
import AudioControl from "./AudioControl";
class BoardSetup {
  shipsDOM: Element[] | null;
  player: Player;
  gameboard: HTMLElement;
  setupPhase: boolean;
  soundControl: AudioControl;
  constructor(player: Player, gameboard: HTMLElement, audio: AudioControl) {
    this.player = player;
    this.gameboard = gameboard;
    this.setupPhase = !player.isComputer;
    this.soundControl = audio;
    if (this.setupPhase) {
      this.shipsDOM = this.setShips();
      this.addDClick();
      this.shipDOMPickUp();
      this.dokcyardSetup();
    } else {
      this.shipsDOM = null;
    }
  }
  private setShips() {
    return Array.from(document.getElementsByClassName("ship"));
  }
  public addSquares() {
    const dropShip = this.ShipDOMDrop();
    const beginDrag = this.getBeginDrag();
    const suffix = this.player.isComputer ? "com_" : "hum_";
    for (let i = 0; i < 100; i++) {
      const newDiv = document.createElement("div");
      newDiv.className = "game-square";
      newDiv.id = suffix + i;
      newDiv.setAttribute("index", i.toString());
      newDiv.addEventListener("dragover", beginDrag);
      newDiv.addEventListener("drop", dropShip);
      if(!this.player.isComputer){
        newDiv.addEventListener("click", () => {
          if (
            newDiv.classList.contains("ship-afloat") &&
            document.getElementById("game-div")?.classList.contains("dev")
            ) {
            } else {
              console.log("click")
              this.soundControl.playErrorSound();
            }
          });
        }
      this.gameboard.appendChild(newDiv);
    }
  }

  private getShipDOMStartAndEnd(square: Element, ship: Element) {
    const length: number = Number(ship.getAttribute("length"));
    const squareIndex: number = Number(square.getAttribute("index"));
    if (ship.classList.contains("ship-vertical")) {
      return [squareIndex, squareIndex + 10 * (length - 1)];
    } else {
      return [squareIndex, squareIndex + length - 1];
    }
  }

  private getBeginDrag() {
    const beginDrag = (e: Event) => {
      e.preventDefault();
    };
    return beginDrag;
  }
  public updateBoard() {
    const gameSquares = Array.from(this.gameboard.children);
    for (let i = 0; i < 100; i++) {
      gameSquares[
        i
      ].className = `game-square ${this.player.gameboard.boardState.getSquareState(
        i
      )}`;
    }
  }
  private shipDOMPickUp() {
    if (this.shipsDOM !== null) {
      const dragStart = (e: any) => {
        e.dataTransfer.setData("text/plain", "S" + e.target.id);
        if (e.target.getAttribute("start") !== null) {
          const start = e.target.getAttribute("start");
          const end = e.target.getAttribute("end");
          this.player.gameboard.removeShip(start, end);
        }
      };

      this.shipsDOM.forEach((item) => {
        item.addEventListener("dragstart", dragStart);
      });
    }
  }
  private ShipDOMDrop() {
    const dropShip = (e: any) => {
      e.preventDefault();
      let id: string = e.dataTransfer!.getData("text/plain");
      if (this.checkIfVaildDrop(id)) {
        const restOfData = this.getDropData(id);
        const shipDom: HTMLElement = document.getElementById(restOfData)!;
        const previousParent = shipDom.parentElement;
        const dropTarget: Element = this.getDropSquare(shipDom, e.target);
        if (dropTarget.classList.contains("game-square")) {
          const cords = this.getShipDOMStartAndEnd(dropTarget, shipDom);
          if (this.player.tryToPlaceShip(cords[0], cords[1])) {
            shipDom.setAttribute("start", cords[0].toString());
            shipDom.setAttribute("end", cords[1].toString());
            dropTarget.append(shipDom);
          } else {
            const start = Number(shipDom.getAttribute("start"));
            const end = Number(shipDom.getAttribute("end"));
            const length = Number(shipDom.getAttribute("length"));
            if (start === end && end === 0 && length !== 1) {
            } else {
              this.player.tryToPlaceShip(start, end);
              previousParent?.append(shipDom);
              console.log(this);
            }
          }
        }
        this.updateBoard();
      }
    };
    return dropShip;
  }
  private getDropSquare(shipDom: HTMLElement, dropTarget: HTMLElement) {
    if (dropTarget.classList.contains("ship-part")) {
      const boundingRect = dropTarget.getBoundingClientRect();
      const elementsOnPosition = document.elementsFromPoint(
        boundingRect.x,
        boundingRect.y
      );
      for (const item of elementsOnPosition) {
        if (item.classList.contains("game-square")) {
          return item;
        }
      }
    }
    return dropTarget;
  }
  private addDClick() {
    const doubleClick = (e: any) => {
      const shipDom = e.target.parentElement;
      if (shipDom.parentElement.id === "dockyard") {
        shipDom.classList.toggle("ship-vertical");
      } else {
        const start = Number(shipDom.getAttribute("start"));
        const currentEnd = Number(shipDom.getAttribute("end"));
        const length = Number(shipDom.getAttribute("length"));
        let newEnd = 0;
        if (currentEnd - start < 10) {
          newEnd = start + (length - 1) * 10;
        } else {
          newEnd = start + length - 1;
        }
        this.player.gameboard.removeShip(start, currentEnd);
        if (this.player.tryToPlaceShip(start, newEnd)) {
          shipDom.classList.toggle("ship-vertical");
          shipDom.setAttribute("start", start.toString());
          shipDom.setAttribute("end", newEnd.toString());
        } else {
          this.player.tryToPlaceShip(start, currentEnd);
        }
        this.updateBoard();
      }
    };
    if (this.shipsDOM !== null) {
      this.shipsDOM.forEach((item) =>
        item.addEventListener("dblclick", doubleClick)
      );
    }
  }

  private dokcyardSetup() {
    const dockyard = document.getElementById("dockyard")!;
    const dropShipToDockyard = (e: any) => {
      e.preventDefault();
      const id = e.dataTransfer!.getData("text/plain");
      if (this.checkIfVaildDrop(id)) {
        const restOfData = this.getDropData(id);
        const shipDom: HTMLElement = document.getElementById(restOfData)!;
        dockyard.append(shipDom);
        this.updateBoard();
      }
    };
    dockyard?.addEventListener("drop", dropShipToDockyard);
    dockyard?.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  }

  public randomSetup() {
    const randomShips = this.player.gameboard.randomShipSetup();
    const gameSquares = Array.from(this.gameboard.childNodes);
    randomShips.forEach((ship, index) => {
      if (this.shipsDOM) {
        const shipDom = this.shipsDOM[index];
        const { startPosition, endPosition } = ship;
        const squareToAppendTo = gameSquares[startPosition];
        shipDom.setAttribute("start", startPosition.toString());
        shipDom.setAttribute("end", endPosition.toString());
        if (endPosition - startPosition >= 10) {
          shipDom.classList.add("ship-vertical");
        } else {
          shipDom.classList.remove("ship-vertical");
        }

        squareToAppendTo.appendChild(shipDom);
        this.updateBoard();
      }
    });
  }
  private checkIfVaildDrop(id: string) {
    const firstLetter = id.slice(0, 1);
    const restOfData = id.substring(1);
    if (
      firstLetter === "S" &&
      Number(restOfData) !== NaN &&
      restOfData !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }
  private getDropData(id: string) {
    return id.substring(1);
  }
  public reset() {
    const dockyard = document.getElementById("dockyard")!;
    if (this.shipsDOM) {
      this.shipsDOM.forEach((ship) => {
        dockyard.appendChild(ship);
        this.player.resetGameboard();
        this.updateBoard();
      });
    }
  }
  public canStart() {
    const dockyard = document.getElementById("dockyard")!;
    if (dockyard.childElementCount === 0) {
      return true;
    } else {
      return false;
    }
  }
  public start() {
    const dockyard = document.getElementById("dockyard")!;
    const humanBoard = document.getElementById("human--board");
    const botBoard = document.getElementById("copmuterBoardWrap")!;
    const humanWrap = document.getElementById("gameboard-human-wrap")!;
    const tips = document.getElementById("tips")!;
    const tip1 = document.getElementById("tip1")!;
    const tip2 = document.getElementById("tip2")!;
    const helperText = document.getElementById("helperText")!;
    const options = document.getElementById("options")!;
    const gameDiv = document.getElementById("game-div")!;
    // if(this.canStart()){

    humanBoard?.classList.toggle("setup-board");
    humanBoard?.classList.toggle("game-board");
    botBoard.classList.toggle("hide");

    gameDiv?.classList.toggle("game");
    gameDiv?.classList.toggle("dev");
    tip1.classList.toggle("hide");
    tip2.classList.toggle("hide");
    helperText.classList.toggle("hide");
    dockyard.classList.toggle("hide");
    options.classList.toggle("hide");
    this.shipsDOM?.forEach((item) => {
      item.classList.toggle("hide");
      dockyard.appendChild(item);
    });
    if (gameDiv.classList.contains("game")) {
      gameDiv?.appendChild(humanWrap);
      gameDiv?.appendChild(tips);
      gameDiv?.appendChild(botBoard);
    } else {
      gameDiv.appendChild(dockyard);
      gameDiv.parentElement?.appendChild(tips);
      gameDiv.parentElement?.append(options);
    }
    // change class or some shit
    // }else{
    //   console.log("cant start")
    // }
  }
}
export default BoardSetup;
