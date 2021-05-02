"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./Player"));
const BoardSetup_1 = __importDefault(require("./BoardSetup"));
const Buttons_1 = require("./Buttons");
const resetButton = document.getElementById("reset");
const radomButton = document.getElementById("random");
const startButton = document.getElementById("start");
const audioButton = document.getElementById("audio");
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", Buttons_1.resetBoard);
radomButton === null || radomButton === void 0 ? void 0 : radomButton.addEventListener("click", Buttons_1.randomSetup);
startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener("click", Buttons_1.startGame);
audioButton === null || audioButton === void 0 ? void 0 : audioButton.addEventListener("click", Buttons_1.audioToggle);
// allows dropping to dokcyard
const dockyard = document.getElementById("dockyard");
dockyard === null || dockyard === void 0 ? void 0 : dockyard.addEventListener("dragover", (e) => {
    e.preventDefault();
});
dockyard === null || dockyard === void 0 ? void 0 : dockyard.addEventListener("drop", (e) => {
    e.preventDefault();
    const dropSquare = e.target;
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);
    dropSquare.appendChild(draggable);
});
const human = new Player_1.default(false);
const computer = new Player_1.default(true);
const humanBoard = document.getElementById("human--board");
const computerBoard = document.getElementById("computer--board");
const computerBoardSetup = new BoardSetup_1.default(computer, computerBoard);
const humanBoardSetup = new BoardSetup_1.default(human, humanBoard);
human.setEnemy(computer);
computer.setEnemy(human);
humanBoardSetup.addSquares();
computerBoardSetup.addSquares();
computer.randomizeShips();
computerBoardSetup.updateBoard();
humanBoardSetup.updateBoard();
console.log(human);
console.log(computer);
