"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoardSetup {
    constructor(player, gameboard) {
        this.player = player;
        this.gameboard = gameboard;
        this.setupPhase = !player.isComputer;
        if (this.setupPhase) {
            this.shipsDOM = this.setShips();
            this.addDClick();
            this.shipDOMPickUp();
        }
        else {
            this.shipsDOM = null;
        }
    }
    setShips() {
        return Array.from(document.getElementsByClassName("ship"));
    }
    addSquares() {
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
            this.gameboard.appendChild(newDiv);
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
    getBeginDrag() {
        const beginDrag = (e) => {
            e.preventDefault();
            console.log(2);
        };
        return beginDrag;
    }
    updateBoard() {
        const gameSquares = Array.from(this.gameboard.children);
        for (let i = 0; i < 100; i++) {
            gameSquares[i].className = `game-square ${this.player.gameboard.boardState.getSquareState(i)}`;
        }
    }
    shipDOMPickUp() {
        if (this.shipsDOM !== null) {
            const dragStart = (e) => {
                e.dataTransfer.setData("text/plain", e.target.id);
                console.log(e.target.parentElement, "picked up");
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
    ShipDOMDrop() {
        const dropShip = (e) => {
            e.preventDefault();
            let dropTarget = e.target;
            if (dropTarget.classList.contains("ship-part")) {
                dropTarget = e.target.parentElement.parentElement;
                console.log(dropTarget);
            }
            if (dropTarget.classList.contains("ship")) {
                console.log("s");
                dropTarget = e.target.parentElement;
            }
            const id = e.dataTransfer.getData("text/plain");
            const shipDom = document.getElementById(id);
            console.log(dropTarget, shipDom);
            if (dropTarget.classList.contains("game-square")) {
                const cords = this.getShipDOMStartAndEnd(dropTarget, shipDom);
                if (this.player.tryToPlaceShip(cords[0], cords[1])) {
                    shipDom.setAttribute("start", cords[0].toString());
                    shipDom.setAttribute("end", cords[1].toString());
                    dropTarget.append(shipDom);
                }
            }
            this.updateBoard();
        };
        return dropShip;
    }
}
exports.default = BoardSetup;
