import Player from "./Player";

const human = new Player(false)
const computer = new Player(true)
human.setEnemy(computer);
computer.setEnemy(human);


