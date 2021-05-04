import Player from "./Player";
import GameFlow from "./GameFlow";
import BoardSetup from "./BoardSetup";
import { audioToggle } from "./Buttons";
import TextControl from "./TextControl"
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
  if(humanBoardSetup.canStart()){
    textControl.changePhase(2)

    humanBoardSetup.start();
  }else{
    // modal or some shit
  }
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

const textControl = new TextControl;
textControl.changePhase(1)
textControl.typeLogo()



// animatedGameText.typeTips()
