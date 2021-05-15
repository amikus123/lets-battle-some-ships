"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./Player"));
const GameFlow_1 = __importDefault(require("./GameFlow"));
const BoardSetup_1 = __importDefault(require("./BoardSetup"));
const TextControl_1 = __importDefault(require("./TextControl"));
const AudioControl_1 = __importDefault(require("./AudioControl"));
const human = new Player_1.default(false);
const computer = new Player_1.default(true);
const humanBoard = document.getElementById("human--board");
const computerBoard = document.getElementById("computer--board");
const audioControl = new AudioControl_1.default();
const computerBoardSetup = new BoardSetup_1.default(computer, computerBoard, audioControl);
const humanBoardSetup = new BoardSetup_1.default(human, humanBoard, audioControl);
const textControl = new TextControl_1.default();
const gameFlow = new GameFlow_1.default(human, humanBoardSetup, computer, textControl, audioControl);
human.setAudioControl(audioControl);
computer.setAudioControl(audioControl);
human.setGameFlow(gameFlow);
computer.setGameFlow(gameFlow);
const resetButton = document.getElementById("reset");
const radomButton = document.getElementById("random");
const startButton = document.getElementById("start");
const audioButton = document.getElementById("audio");
const audioIcon = document.getElementById("audioIcon");
const restartButton = document.getElementById("restart");
radomButton === null || radomButton === void 0 ? void 0 : radomButton.addEventListener("click", () => {
    humanBoardSetup.randomSetup();
    audioControl.playClickSound();
});
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => {
    humanBoardSetup.reset();
    audioControl.playClickSound();
});
startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener("click", () => {
    if (humanBoardSetup.canStart()) {
        audioControl.playClickSound();
        gameFlow.beginBattle();
    }
    else {
        audioControl.playLoseMusic();
        // audioControl.playErrorSound();
    }
});
restartButton.addEventListener("click", () => {
    audioControl.playClickSound();
    gameFlow.restartGame();
    humanBoardSetup.reset();
    human.resetGameboard();
    human.updateBoard();
    computer.resetGameboard();
    computer.randomizeShips();
    computer.updateBoard();
    audioControl.playDefaultMusic();
});
const audioToggle = () => {
    audioControl.toggleMute();
    let text = "";
    if (audioControl.isMuted) {
        text = "audio off";
    }
    else {
        text = "audio on";
    }
    audioButton.innerHTML = text;
    audioIcon.innerText = text;
    audioButton.classList.toggle("muted");
    audioIcon.classList.toggle("muted");
};
audioButton === null || audioButton === void 0 ? void 0 : audioButton.addEventListener("click", audioToggle);
audioIcon === null || audioIcon === void 0 ? void 0 : audioIcon.addEventListener("click", audioToggle);
gameFlow.inittializeBoard();
humanBoardSetup.addSquares();
computerBoardSetup.addSquares();
computer.randomizeShips();
humanBoardSetup.updateBoard();
// animatedGameText.typeTips()
