import Ship from "../Ship";

const hotizontalShip = new Ship(1,3)
const verticalShip = new Ship(3,33)
test('check if lenghts are correct', () => {
    expect(hotizontalShip.length).toBe(3)
    expect(verticalShip.length).toBe(4)
  });
  
test("properly recieves hits",()=>{
  expect(hotizontalShip.getPoint(1).isHit).toBe(false)
  hotizontalShip.receiveHit(1)
  expect(hotizontalShip.getPoint(1).isHit).toBe(true)

})
test("properly sinks and  hits",()=>{
  verticalShip.receiveHit(3);
  expect(verticalShip.isSunk()).toBe(false)
  verticalShip.receiveHit(13);
  verticalShip.receiveHit(23);
  verticalShip.receiveHit(33);
  expect(verticalShip.isSunk()).toBe(true)

})
