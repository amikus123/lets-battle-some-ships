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
human.setEnemy(computer);
computer.setEnemy(human);

humanBoardSetup.addSquares();
computerBoardSetup.addSquares();
computer.randomizeShips();
computerBoardSetup.updateBoard();
humanBoardSetup.updateBoard();



const resetButton = document.getElementById("reset");
const radomButton = document.getElementById("random");
const startButton = document.getElementById("start");
const audioButton = document.getElementById("audio");
radomButton?.addEventListener("click", ()=>{humanBoardSetup.randomSetup()});
resetButton?.addEventListener("click", ()=>{humanBoardSetup.reset()});
startButton?.addEventListener("click", startGame);
audioButton?.addEventListener("click", audioToggle);

// allows dropping to dokcyard

// dockyard?.addEventListener("drop", (e: any) => {
//   e.preventDefault();
//   const dropSquare: HTMLElement = e.target;
//   const id = e.dataTransfer!.getData("text/plain");
//   const draggable: HTMLElement = document.getElementById(id)!;
//   dropSquare.appendChild(draggable);
// });




console.log(human);
console.log(computer);
