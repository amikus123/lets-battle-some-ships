"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./Player"));
const BoardSetup_1 = __importDefault(require("./BoardSetup"));
const human = new Player_1.default(false);
const computer = new Player_1.default(true);
const humanBoard = document.getElementById("human--board");
const computerBoard = document.getElementById("computer--board");
const boardSetup = new BoardSetup_1.default;
const addOneHundredDivs = (parent, player) => {
    const allowDrag = (e) => {
        e.preventDefault();
    };
    const dropShip = (e) => {
        e.preventDefault();
        console.log(1, e.dataTransfer);
        const id = e.dataTransfer.getData("text/plain");
        const draggable = document.getElementById(id);
        // console.log(111111,draggable,id,"drop")
        e.target.appendChild(draggable);
    };
    let suffix = "";
    suffix = player.isComputer ? "com_" : "hum_";
    for (let i = 0; i < 100; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = "game-square";
        newDiv.id = suffix + i;
        newDiv.addEventListener("dragover", allowDrag);
        // newDiv.addEventListener("dragend",dragEnd)
        newDiv.addEventListener("drop", dropShip);
        parent.appendChild(newDiv);
    }
};
const updateBoard = (player) => {
    const shipsAfloat = player.getAfloat();
    let suffix = "";
    suffix = player.isComputer ? "com_" : "hum_";
    console.log(suffix);
    for (const point of shipsAfloat) {
        const afloat = document.getElementById(suffix + point);
        afloat === null || afloat === void 0 ? void 0 : afloat.classList.add("ship--afloat");
    }
};
addOneHundredDivs(humanBoard, human);
// addOneHundredDivs(computerBoard, computer);
human.setEnemy(computer);
// computer.setEnemy(human);
human.randomizeShips();
computer.randomizeShips();
updateBoard(human);
updateBoard(computer);
console.log(human.gameboard);
// console.log(human);
// console.log(computer);
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    console.log(e.dataTransfer);
}
const ships = document.getElementsByClassName("ship");
const arr = Array.from(ships);
console.log(arr);
arr.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
});
