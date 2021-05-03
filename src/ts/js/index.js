"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./Player"));
const BoardSetup_1 = __importDefault(require("./BoardSetup"));
const AnimatedText_1 = __importDefault(require("./AnimatedText"));
const Buttons_1 = require("./Buttons");
const human = new Player_1.default(false);
const computer = new Player_1.default(true);
const humanBoard = document.getElementById("human--board");
const computerBoard = document.getElementById("computer--board");
const computerBoardSetup = new BoardSetup_1.default(computer, computerBoard);
const humanBoardSetup = new BoardSetup_1.default(human, humanBoard);
const resetButton = document.getElementById("reset");
const radomButton = document.getElementById("random");
const startButton = document.getElementById("start");
const audioButton = document.getElementById("audio");
const audioIcon = document.getElementById("audioIcon");
radomButton === null || radomButton === void 0 ? void 0 : radomButton.addEventListener("click", () => {
    humanBoardSetup.randomSetup();
});
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => {
    humanBoardSetup.reset();
});
startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener("click", () => {
    if (humanBoardSetup.canStart()) {
        animatedBigModal.phase(2);
        humanBoardSetup.start();
        animatedGameText.type("Attack! \n The Enemy ");
    }
    else {
        // modal or some shit
    }
});
audioButton === null || audioButton === void 0 ? void 0 : audioButton.addEventListener("click", Buttons_1.audioToggle);
audioIcon === null || audioIcon === void 0 ? void 0 : audioIcon.addEventListener("click", Buttons_1.audioToggle);
human.setEnemy(computer);
computer.setEnemy(human);
humanBoardSetup.addSquares();
computerBoardSetup.addSquares();
computer.randomizeShips();
// computerBoardSetup.updateBoard();
humanBoardSetup.updateBoard();
console.log(human);
console.log(computer);
const modalBigText = document.getElementById("modalBigText");
const bigModal = document.getElementById("modalBig");
const modalSmallText = document.getElementById("modalSmallText");
const smallModal = document.getElementById("modalSmall");
const logo = document.getElementById("logo");
const helperText = document.getElementById("helpetText");
const animatedSmallModal = new AnimatedText_1.default(modalSmallText, smallModal);
const animatedBigModal = new AnimatedText_1.default(modalBigText, bigModal);
const animatedGameText = new AnimatedText_1.default(helperText);
const animatedLogo = new AnimatedText_1.default(logo);
animatedLogo.type("BATTLESHIPS RETRO ");
animatedBigModal.phase(1);
animatedGameText.typeTips();
