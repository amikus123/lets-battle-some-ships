"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoardSetup {
    constructor(player, gameboard) {
        this.ships = this.setShips();
        this.addDClick();
        console.log("created", this.ships);
        this.player = player;
        this.gameboard = gameboard;
    }
    setShips() {
        return Array.from(document.getElementsByClassName("ship"));
    }
    addSquares() {
        const allowDrag = (e) => {
            e.preventDefault();
        };
        const dropShip = this.getDropShip();
        const suffix = this.player.isComputer ? "com_" : "hum_";
        for (let i = 0; i < 100; i++) {
            const newDiv = document.createElement("div");
            newDiv.className = "game-square";
            newDiv.id = suffix + i;
            newDiv.setAttribute("index", i.toString());
            newDiv.addEventListener("dragover", allowDrag);
            newDiv.addEventListener("drop", dropShip);
            this.gameboard.appendChild(newDiv);
        }
    }
    updateBoard() {
        const boardPostions = this.player.gameboard.boardState;
        // console.log(boardPostions,this.gameboard.children)
        const gameSquares = Array.from(this.gameboard.children);
        for (let i = 0; i < 100; i++) {
            gameSquares[i].className = `game-square ${this.player.gameboard.boardState.getSquareState(i)}`;
        }
    }
    decideSquareState() {
    }
    getDropShip() {
        const dropShip = (e) => {
            e.preventDefault();
            const dropSquare = e.target;
            const id = e.dataTransfer.getData("text/plain");
            const draggable = document.getElementById(id);
            // console.log(111111, draggable?.attributes.length, id, "drop");
            const shipPositions = this.getShipDOMStartAndEnd(dropSquare, draggable);
            console.log(shipPositions, "postions");
            if (this.player.tryToPlaceShip(shipPositions[0], shipPositions[1])) {
                dropSquare.appendChild(draggable);
                this.updateBoard();
                console.log("succ");
            }
            else {
                console.log("fail");
            }
        };
        return dropShip;
    }
    getShipDOMStartAndEnd(square, ship) {
        const length = Number(ship.getAttribute("length"));
        const squareIndex = Number(square.getAttribute("index"));
        console.log(length, squareIndex, "dom");
        if (ship.classList.contains("ship-vertical")) {
            return [squareIndex, squareIndex + 10 * (length - 1)];
        }
        else {
            return [squareIndex, squareIndex + length - 1];
        }
    }
    addDClick() {
        this.ships.forEach((ship) => {
            ship.addEventListener("dblclick", (e) => {
                ship.classList.toggle("ship-vertical");
            });
        });
    }
}
exports.default = BoardSetup;
