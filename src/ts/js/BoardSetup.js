"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ship_1 = __importDefault(require("./Ship"));
class BoardSetup {
    constructor(player, gameboard) {
        this.player = player;
        this.gameboard = gameboard;
        this.setupPhase = !player.isComputer;
        if (this.setupPhase) {
            this.shipsDOM = this.setShips();
            this.addDClick();
            this.allowDrag();
        }
        else {
            this.shipsDOM = null;
        }
    }
    setShips() {
        return Array.from(document.getElementsByClassName("ship"));
    }
    addSquares() {
        const dropShip = this.getDropShip();
        const beginDrag = this.getBeginDrag();
        const suffix = this.player.isComputer ? "com_" : "hum_";
        for (let i = 0; i < 100; i++) {
            const newDiv = document.createElement("div");
            newDiv.className = "game-square";
            newDiv.id = suffix + i;
            newDiv.setAttribute("index", i.toString());
            newDiv.addEventListener("dragover", beginDrag);
            newDiv.addEventListener("drop", dropShip);
            this.gameboard.appendChild(newDiv);
        }
    }
    updateBoard() {
        const gameSquares = Array.from(this.gameboard.children);
        for (let i = 0; i < 100; i++) {
            gameSquares[i].className = `game-square ${this.player.gameboard.boardState.getSquareState(i)}`;
        }
    }
    getBeginDrag() {
        const beginDrag = (e) => {
            e.preventDefault();
        };
        return beginDrag;
    }
    getDropShip() {
        const dropShip = (e) => {
            e.preventDefault();
            const dropSquare = e.target;
            const id = e.dataTransfer.getData("text/plain");
            const draggable = document.getElementById(id);
            const shipPositions = this.getShipDOMStartAndEnd(dropSquare, draggable);
            const createdShip = new Ship_1.default(shipPositions[0], shipPositions[1]);
            const shipDom = document.getElementById(id);
            console.log(shipPositions, "postions");
            if (this.player.tryToPlaceShip(shipPositions[0], shipPositions[1])) {
                dropSquare.appendChild(draggable);
                this.updateBoard();
                shipDom === null || shipDom === void 0 ? void 0 : shipDom.setAttribute("index", (this.player.gameboard.ships.length - 1).toString());
            }
            else {
            }
        };
        return dropShip;
    }
    getShipDOMStartAndEnd(square, ship) {
        const length = Number(ship.getAttribute("length"));
        const squareIndex = Number(square.getAttribute("index"));
        if (ship.classList.contains("ship-vertical")) {
            return [squareIndex, squareIndex + 10 * (length - 1)];
        }
        else {
            return [squareIndex, squareIndex + length - 1];
        }
    }
    addDClick() {
        if (this.shipsDOM !== null) {
            this.shipsDOM.forEach((ship) => {
                ship.addEventListener("dblclick", (e) => {
                    ship.classList.toggle("ship-vertical");
                });
            });
        }
    }
    allowDrag() {
        if (this.shipsDOM !== null) {
            const dragStart = (e) => {
                e.dataTransfer.setData("text/plain", e.target.id);
                console.log(e.dataTransfer, "picked");
                if (e.target.parentElement.id !== "dockyard" &&
                    e.target.getAttribute("index") !== null) {
                    this.player.gameboard.removeShip(Number(e.target.getAttribute("index")));
                    console.log(e.target, this.player);
                }
            };
            this.shipsDOM.forEach((item) => {
                item.addEventListener("dragstart", dragStart);
            });
        }
    }
}
exports.default = BoardSetup;
