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
addOneHundredDivs(computerBoard, computer);

human.setEnemy(computer);
computer.setEnemy(human);

// setting ships
// human.setShip(12, 42)
// human.setShip(65, 69);
// human.setShip(81, 84);
// human.setShip(18, 38);
// computer.setShip(12, 42)
// computer.setShip(65, 69);
// computer.setShip(81, 84);
// computer.setShip(18, 38);
human.randomizeShips()
computer.randomizeShips()
updateBoard(human)
updateBoard(computer)

// console.log(human);
// console.log(computer);
