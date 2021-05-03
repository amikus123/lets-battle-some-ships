import Player from "./Player";
import GameFlow from "./GameFlow";
import BoardSetup from "./BoardSetup";
import { randomSetup, audioToggle, startGame, resetBoard } from "./Buttons";



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

radomButton?.addEventListener("click", ()=>{humanBoardSetup.randomSetup()});
resetButton?.addEventListener("click", ()=>{humanBoardSetup.reset()});
startButton?.addEventListener("click", ()=>{humanBoardSetup.start()});
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
