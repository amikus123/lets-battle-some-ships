import Player from "./Player";

const human = new Player(false);
const computer = new Player(true);
const humanBoard :HTMLElement = document.getElementById("human--board")!;
const computerBoard :HTMLElement = document.getElementById("computer--board")!;

const addOneHundredDivs = (parent:HTMLElement) =>{
    for(let i=0;i<100;i++){
        const new
    }
}

human.setEnemy(computer);
computer.setEnemy(human);

// setting ships
human.setShip(1, 21);
human.setShip(3, 53);
human.setShip(5, 9);
human.setShip(2, 42);

computer.setShip(1, 21);
computer.setShip(3, 53);
computer.setShip(5, 9);
computer.setShip(2, 42);
