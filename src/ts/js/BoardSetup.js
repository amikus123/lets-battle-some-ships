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
            let id = e.dataTransfer.getData("text/plain");
            if (this.checkIfVaildDrop(id)) {
                const restOfData = this.getDropData(id);
                const shipDom = document.getElementById(restOfData);
                const previousParent = shipDom.parentElement;
                const dropTarget = this.getDropSquare(shipDom, e.target);
                if (dropTarget.classList.contains("game-square")) {
                    const cords = this.getShipDOMStartAndEnd(dropTarget, shipDom);
                    if (this.player.tryToPlaceShip(cords[0], cords[1])) {
                        shipDom.setAttribute("start", cords[0].toString());
                        shipDom.setAttribute("end", cords[1].toString());
                        dropTarget.append(shipDom);
                    }
                    else {
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
            }
        };
        return dropShip;
    }
    getDropSquare(shipDom, dropTarget) {
        if (dropTarget.classList.contains("ship-part")) {
            const boundingRect = dropTarget.getBoundingClientRect();
            const elementsOnPosition = document.elementsFromPoint(boundingRect.x, boundingRect.y);
            for (const item of elementsOnPosition) {
                if (item.classList.contains("game-square")) {
                    return item;
                }
            }
        }
        return dropTarget;
    }
    addDClick() {
        const doubleClick = (e) => {
            const shipDom = e.target.parentElement;
            if (shipDom.parentElement.id === "dockyard") {
                shipDom.classList.toggle("ship-vertical");
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
                this.player.gameboard.removeShip(start, currentEnd);
                if (this.player.tryToPlaceShip(start, newEnd)) {
                    shipDom.classList.toggle("ship-vertical");
                    shipDom.setAttribute("start", start.toString());
                    shipDom.setAttribute("end", newEnd.toString());
                }
                else {
                    this.player.tryToPlaceShip(start, currentEnd);
                }
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
    canStart() {
        const dockyard = document.getElementById("dockyard");
        if (dockyard.childElementCount === 0) {
            return true;
        }
        else {
            return false;
        }
    }
    start() {
        var _a, _b, _c;
        const dockyard = document.getElementById("dockyard");
        const humanBoard = document.getElementById("human--board");
        const botBoard = document.getElementById("copmuterBoardWrap");
        const humanWrap = document.getElementById("gameboard-human-wrap");
        const tips = document.getElementById("tips");
        const tip1 = document.getElementById("tip1");
        const tip2 = document.getElementById("tip2");
        const helperText = document.getElementById("helperText");
        const options = document.getElementById("options");
        const gameDiv = document.getElementById("game-div");
        // if(this.canStart()){
        humanBoard === null || humanBoard === void 0 ? void 0 : humanBoard.classList.toggle("setup-board");
        humanBoard === null || humanBoard === void 0 ? void 0 : humanBoard.classList.toggle("game-board");
        botBoard.classList.toggle("hide");
        gameDiv === null || gameDiv === void 0 ? void 0 : gameDiv.classList.toggle("game");
        gameDiv === null || gameDiv === void 0 ? void 0 : gameDiv.classList.toggle("dev");
        tip1.classList.toggle("hide");
        tip2.classList.toggle("hide");
        helperText.classList.toggle("hide");
        dockyard.classList.toggle("hide");
        options.classList.toggle("hide");
        (_a = this.shipsDOM) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            item.classList.toggle("hide");
            dockyard.appendChild(item);
        });
        if (gameDiv.classList.contains("game")) {
            gameDiv === null || gameDiv === void 0 ? void 0 : gameDiv.appendChild(humanWrap);
            gameDiv === null || gameDiv === void 0 ? void 0 : gameDiv.appendChild(tips);
            gameDiv === null || gameDiv === void 0 ? void 0 : gameDiv.appendChild(botBoard);
        }
        else {
            gameDiv.appendChild(dockyard);
            (_b = gameDiv.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(tips);
            (_c = gameDiv.parentElement) === null || _c === void 0 ? void 0 : _c.append(options);
        }
        // change class or some shit
        // }else{
        //   console.log("cant start")
        // }
    }
}
exports.default = BoardSetup;
