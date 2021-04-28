import Player from "../Player";

const human = new Player(false);
const computer = new Player(true);
test("checking setting enemies", () => {
  expect(human.enemy).toBe(null);
  expect(computer.enemy).toBe(null);
  human.setEnemy(computer);
  computer.setEnemy(human);
  expect(human.enemy).toBe(computer);
  expect(computer.enemy).toBe(human);
});
test("cheking adding ships", () => {
  expect(human.gameboard.ships.length).toBe(0);
  human.setShip(1, 21);
  expect(human.gameboard.ships.length).toBe(1);
});
test("checking recieving hits", () => {
  expect(human.gameboard.isPositionHit(1)).toBe(false);
  computer.beginAttack(1);
  expect(human.gameboard.isPositionHit(1)).toBe(true);
});
test("checking attacking", ()=>{
    computer.setShip(1,5);
    expect(computer.gameboard.getPosition(1).isHit).toBe(false)
    human.beginAttack(1);
    expect(computer.gameboard.getPosition(1).isHit).toBe(true)
})
test("checking loss detection", () => {
  expect(human.hasLost()).toBe(false);
  computer.beginAttack(11);
  computer.beginAttack(21);
  expect(human.hasLost()).toBe(true);
});

