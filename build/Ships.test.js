import Ship from "./Ship.js"

test('creates a 2 element ship', () => {
    const testedShip = new Ship(1,3)
    console.log(testedShip)
    expect(testedShip.length).toBe(3)
  });