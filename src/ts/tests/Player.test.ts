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
  human.tryToPlaceShip(1, 21);
  expect(human.gameboard.ships.length).toBe(1);
});



test("checking radnom ship setup",()=>{
  human.randomizeShips();
  console.log(human.gameboard.ships)
  // expect(human.gameboard.ships.length).toBe()
})