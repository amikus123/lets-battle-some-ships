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
            this.dokcyardSetup();
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
                e.dataTransfer.setData("text/plain", "S" + e.target.id);
                console.log(e.target.parentElement, "picked up");
                if (e.target.getAttribute("start") !== null) {
                    console.log("removing a ship");
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
            console.log(e);
            let id = e.dataTransfer.getData("text/plain");
            if (this.checkIfVaildDrop(id)) {
                const restOfData = this.getDropData(id);
                const shipDom = document.getElementById(restOfData);
                const previousParent = shipDom.parentElement;
                const dropTarget = this.getDropSquare(shipDom, e.target);
                // console.log(dropTarget, shipDom,previousParent);
                if (dropTarget.classList.contains("game-square")) {
                    const cords = this.getShipDOMStartAndEnd(dropTarget, shipDom);
                    if (this.player.tryToPlaceShip(cords[0], cords[1])) {
                        console.log("placed in new loaction");
                        shipDom.setAttribute("start", cords[0].toString());
                        shipDom.setAttribute("end", cords[1].toString());
                        dropTarget.append(shipDom);
                    }
                    else {
                        console.log("fail");
                        const start = Number(shipDom.getAttribute("start"));
                        const end = Number(shipDom.getAttribute("end"));
                        const length = Number(shipDom.getAttribute("length"));
                        if (start === end && end === 0 && length !== 1) {
                        }
                        else {
                            this.player.tryToPlaceShip(start, end);
                            previousParent === null || previousParent === void 0 ? void 0 : previousParent.append(shipDom);
                            console.log(this);
                        }
                    }
                }
                this.updateBoard();
                console.log(this.player);
            }
        };
        return dropShip;
    }
    getDropSquare(shipDom, dropTarget) {
        console.log(shipDom, dropTarget);
        if (dropTarget.classList.contains("ship-part")) {
            const boundingRect = dropTarget.getBoundingClientRect();
            const elementsOnPosition = document.elementsFromPoint(boundingRect.x, boundingRect.y);
            console.log(elementsOnPosition, "whats on positon");
            for (const item of elementsOnPosition) {
                if (item.classList.contains("game-square")) {
                    console.log(item);
                    return item;
                }
            }
            // return elementsOnPosition[1]
        }
        return dropTarget;
    }
    addDClick() {
        const doubleClick = (e) => {
            const shipDom = e.target.parentElement;
            if (shipDom.parentElement.id === "dockyard") {
                shipDom.classList.toggle("ship-vertical");
                console.log("DOCK");
            }
            else {
                const start = Number(shipDom.getAttribute("start"));
                const currentEnd = Number(shipDom.getAttribute("end"));
                const length = Number(shipDom.getAttribute("length"));
                let newEnd = 0;
                if (currentEnd - start < 10) {
                    newEnd = start + (length - 1) * 10;
                }
                else {
                    newEnd = start + length - 1;
                }
                console.log(start, currentEnd, newEnd);
                this.player.gameboard.removeShip(start, currentEnd);
                if (this.player.tryToPlaceShip(start, newEnd)) {
                    shipDom.classList.toggle("ship-vertical");
                    console.log("succcc");
                    shipDom.setAttribute("start", start.toString());
                    shipDom.setAttribute("end", newEnd.toString());
                }
                else {
                    this.player.tryToPlaceShip(start, currentEnd);
                    console.log("FAIL");
                }
                console.log(this.player);
                this.updateBoard();
            }
        };
        if (this.shipsDOM !== null) {
            this.shipsDOM.forEach((item) => item.addEventListener("dblclick", doubleClick));
        }
    }
    dokcyardSetup() {
        const dockyard = document.getElementById("dockyard");
        const dropShipToDockyard = (e) => {
            e.preventDefault();
            console.log("dropping to dock");
            const id = e.dataTransfer.getData("text/plain");
            if (this.checkIfVaildDrop(id)) {
                const restOfData = this.getDropData(id);
                const shipDom = document.getElementById(restOfData);
                dockyard.append(shipDom);
                this.updateBoard();
            }
        };
        dockyard === null || dockyard === void 0 ? void 0 : dockyard.addEventListener("drop", dropShipToDockyard);
        dockyard === null || dockyard === void 0 ? void 0 : dockyard.addEventListener("dragover", (e) => {
            e.preventDefault();
        });
    }
    randomSetup() {
        const randomShips = this.player.gameboard.randomShipSetup();
        const gameSquares = Array.from(this.gameboard.childNodes);
        console.log(randomShips);
        randomShips.forEach((ship, index) => {
            if (this.shipsDOM) {
                const shipDom = this.shipsDOM[index];
                const { startPosition, endPosition } = ship;
                const squareToAppendTo = gameSquares[startPosition];
                shipDom.setAttribute("start", startPosition.toString());
                shipDom.setAttribute("end", endPosition.toString());
                if (endPosition - startPosition >= 10) {
                    shipDom.classList.add("ship-vertical");
                }
                else {
                    shipDom.classList.remove("ship-vertical");
                }
                squareToAppendTo.appendChild(shipDom);
                this.updateBoard();
            }
        });
    }
    checkIfVaildDrop(id) {
        const firstLetter = id.slice(0, 1);
        const restOfData = id.substring(1);
        if (firstLetter === "S" &&
            Number(restOfData) !== NaN &&
            restOfData !== "") {
            return true;
        }
        else {
            return false;
        }
    }
    getDropData(id) {
        return id.substring(1);
    }
    reset() {
        const dockyard = document.getElementById("dockyard");
        if (this.shipsDOM) {
            this.shipsDOM.forEach((ship) => {
                dockyard.appendChild(ship);
                this.player.resetGameboard();
                this.updateBoard();
            });
        }
    }
}
exports.default = BoardSetup;
