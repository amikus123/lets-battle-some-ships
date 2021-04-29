import Ship from "../Ship";

let horizontalShip:Ship, verticalShip:Ship,middleShip:Ship;
beforeEach(() => {
  horizontalShip = new Ship(1, 3);
  verticalShip = new Ship(3, 33);
  middleShip = new Ship(45, 65);

});
test("check if lenghts are correct", () => {
  expect(horizontalShip.length).toBe(3);
  expect(verticalShip.length).toBe(4);
  console.log(horizontalShip.adjecentPositions);
});

test("properly recieves hits", () => {
  expect(horizontalShip.getPoint(1).isHit).toBe(false);
  horizontalShip.receiveHit(1);
  expect(horizontalShip.getPoint(1).isHit).toBe(true);
});
test("properly sinks and  hits", () => {
  verticalShip.receiveHit(3);
  expect(verticalShip.isSunk()).toBe(false);
  verticalShip.receiveHit(13);
  verticalShip.receiveHit(23);
  verticalShip.receiveHit(33);
  expect(verticalShip.isSunk()).toBe(true);
});
test("checking adjecent positions",()=>{
  // expect(hotizontalShip.adjecentPositions).arrayContaining([0,1,2,3,4,10,11,12,13,14])
  expect(horizontalShip.adjecentPositions).toEqual(expect.arrayContaining([0,1,2,3,4,10,11,12,13,14]))
  expect(verticalShip.adjecentPositions).toEqual(expect.arrayContaining([2,3,4,12,13,14,22,23,24,32,33,34,42,43,44]))
  expect(middleShip.adjecentPositions).toEqual(expect.arrayContaining([34,35,36,44,45,46,54,55,56,64,65,66,74,75,76]))

})