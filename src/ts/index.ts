import Player from "./Player";
import GameFlow from "./GameFlow"
const human = new Player(false);
const computer = new Player(true);
const humanBoard: HTMLElement = document.getElementById("human--board")!;
const computerBoard: HTMLElement = document.getElementById("computer--board")!;

const addOneHundredDivs = (parent: HTMLElement,player: Player) => {

  let suffix = "";
  suffix = player.isComputer ? "com_" : "hum_";
  for (let i = 0; i < 100; i++) {
    const newDiv = document.createElement("div");
    newDiv.className = "game-square";
    newDiv.id = suffix + i;
    parent.appendChild(newDiv);
  }
};
const updateBoard = (player: Player) => {
  const shipsAfloat = player.getAfloat();
  let suffix = "";
  suffix = player.isComputer ? "com_" : "hum_";
  console.log(suffix)
  for (const point of shipsAfloat) {
    const afloat = document.getElementById(suffix + point)
    afloat?.classList.add("ship--afloat")
  }
  };
addOneHundredDivs(humanBoard, human);
// addOneHundredDivs(computerBoard, computer);

human.setEnemy(computer);
// computer.setEnemy(human);

human.randomizeShips()
computer.randomizeShips()
updateBoard(human)
updateBoard(computer)
console.log(human.gameboard)
// console.log(human);
// console.log(computer);
