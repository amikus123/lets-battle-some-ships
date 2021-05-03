import Player from "./Player";
import GameFlow from "./GameFlow";
import BoardSetup from "./BoardSetup";
import AnimatedText from "./AnimatedText";
import { audioToggle } from "./Buttons";

const human = new Player(false);
const computer = new Player(true);
const humanBoard: HTMLElement = document.getElementById("human--board")!;
const computerBoard: HTMLElement = document.getElementById("computer--board")!;
const computerBoardSetup = new BoardSetup(computer, computerBoard);
const humanBoardSetup = new BoardSetup(human, humanBoard);

const resetButton = document.getElementById("reset");
const radomButton = document.getElementById("random");
const startButton = document.getElementById("start");
const audioButton = document.getElementById("audio");
const audioIcon = document.getElementById("audioIcon");

radomButton?.addEventListener("click", () => {
  humanBoardSetup.randomSetup();
});
resetButton?.addEventListener("click", () => {
  humanBoardSetup.reset();
});
startButton?.addEventListener("click", () => {
  humanBoardSetup.start();
});
audioButton?.addEventListener("click", audioToggle);
audioIcon?.addEventListener("click", audioToggle);

human.setEnemy(computer);
computer.setEnemy(human);

humanBoardSetup.addSquares();
computerBoardSetup.addSquares();
computer.randomizeShips();
// computerBoardSetup.updateBoard();
humanBoardSetup.updateBoard();
console.log(human);
console.log(computer);

const modalBigText = document.getElementById("modalBigText")!;
const bigModal = document.getElementById("modalBig")!;
const modalSmallText = document.getElementById("modalSmallText")!;
const smallModal = document.getElementById("modalSmall")!;
const logo = document.getElementById("logo")!;
const helperText = document.getElementById("helpetText")!;
const animatedSmallModal = new AnimatedText(modalSmallText, smallModal);
const animatedBigModal = new AnimatedText(modalBigText, bigModal);
const animatedGameText = new AnimatedText(helperText);
const animatedLogo = new AnimatedText(logo);

animatedLogo.type("BATTLESHIPS RETRO ")
animatedBigModal.phase();