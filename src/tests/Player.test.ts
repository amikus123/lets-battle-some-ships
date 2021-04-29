import Player from "../Player";

const human = new Player(false);
const computer = new Player(true);
human.setEnemy(computer);
computer.setEnemy(human);
afterEach(() => {
  human.resetGameboard();
  computer.resetGameboard()
});

test("cheking manual placement of ships", () => {
  expect(human.gameboard.ships.length).toBe(0);
  human.setShip(1, 21);
  expect(human.gameboard.ships.length).toBe(1);
});

test("checking loss detection", () => {
  human.setShip(1, 21);
  computer.beginAttack(1);
  expect(human.hasLost()).toBe(false);
  computer.beginAttack(11);
  computer.beginAttack(21);
  expect(human.hasLost()).toBe(true);
});

test("checking radnom ship setup",()=>{
  human.randomizeShips();
  console.log(human.gameboard.ships)
  expect(human.gameboard.ships.length).toBe(10)
})