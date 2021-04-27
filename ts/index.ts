import Player from "./Player";

const human = new Player(false);
const computer = new Player(true);
const humanBoard: HTMLElement = document.getElementById("human--board")!;
const computerBoard: HTMLElement = document.getElementById("computer--board")!;

const addOneHundredDivs = (parent: HTMLElement, human: boolean) => {
  let suffix = "";
  suffix = human ? "hum_" : "com_";
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
  suffix = player.isCoomputer ? "hum_" : "com_";
    console.log(suffix)
  for (const point of shipsAfloat) {
      const afloat = document.getElementById(suffix + point)
      afloat?.classList.add("ship--afloat")
  }
};
addOneHundredDivs(humanBoard, true);
addOneHundredDivs(computerBoard, false);

human.setEnemy(computer);
computer.setEnemy(human);

// setting ships
human.setShip(1, 21);
human.setShip(43, 73);
human.setShip(5, 45);
human.setShip(68, 88);

computer.setShip(1, 21);
computer.setShip(3, 53);
computer.setShip(5, 9);
computer.setShip(2, 42);
updateBoard(human)
updateBoard(computer)

// console.log(human);
// console.log(computer);
