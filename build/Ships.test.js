import Ship from "./Ship.js"

test('creates a 2 element ship', () => {
    const testedShip = new Ship(2, 1,3)
    expect(testedShip).toBe(3);
  });