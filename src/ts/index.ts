import Player from "./Player";
import GameFlow from "./GameFlow";
import BoardSetup from "./BoardSetup"

const human = new Player(false);
const computer = new Player(true);
const humanBoard: HTMLElement = document.getElementById("human--board")!;
const computerBoard: HTMLElement = document.getElementById("computer--board")!;
const humanBoardSetup = new BoardSetup(human,humanBoard);
const updateBoard = (player: Player) => {
  const shipsAfloat = player.getAfloat();
  let suffix = "";
  suffix = player.isComputer ? "com_" : "hum_";
  console.log(suffix);
  for (const point of shipsAfloat) {
    const afloat = document.getElementById(suffix + point);
    afloat?.classList.add("afloat");
  }
};
humanBoardSetup.addSquares()
human.setEnemy(computer);
computer.setEnemy(human);
humanBoardSetup.updateBoard()

updateBoard(human);
updateBoard(computer);
console.log(human.gameboard);
// console.log(human);
// console.log(computer);
function dragStart(e: any) {
  e.dataTransfer.setData("text/plain", e.target.id);
  console.log(e.dataTransfer);
}
const ships = document.getElementsByClassName("ship");

const arr = Array.from(ships);
console.log(arr);
arr.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});
