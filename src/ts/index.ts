import Player from "./Player";
import GameFlow from "./GameFlow";
import BoardSetup from "./BoardSetup";
import TextControl from "./TextControl";
const human = new Player(false);
const computer = new Player(true);
const humanBoard: HTMLElement = document.getElementById("human--board")!;
const computerBoard: HTMLElement = document.getElementById("computer--board")!;
const computerBoardSetup = new BoardSetup(computer, computerBoard);
const humanBoardSetup = new BoardSetup(human, humanBoard);
const textControl = new TextControl();
const gameFlow = new GameFlow(human,humanBoardSetup, computer,textControl);

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
  if (humanBoardSetup.canStart()) {
    gameFlow.beginBattle();
  } else {
    // modal or some shit
  }
});

const audioToggle = () => {};
audioButton?.addEventListener("click", audioToggle);
audioIcon?.addEventListener("click", audioToggle);
gameFlow.inittializeBoard()
gameFlow.beginSetup();
humanBoardSetup.addSquares();
computerBoardSetup.addSquares();

computer.randomizeShips();
humanBoardSetup.updateBoard();
console.log(human);
console.log(computer);


// animatedGameText.typeTips()
