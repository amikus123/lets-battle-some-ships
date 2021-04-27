import Gameboard from "../Gameboard";

const testedGameboard = new Gameboard();
test("checking ships placement", () => {
    expect(testedGameboard.getPoint(1)).toEqual({isHit:false,ship:null,position:1})
    testedGameboard.placeShip(1,21);
    const firstShip = testedGameboard.ships[0]
    expect(testedGameboard.getPoint(1)).toEqual({isHit:false,ship:firstShip,position:1})
    expect(testedGameboard.getPoint(11)).toEqual({isHit:false,ship:firstShip,position:11})
    expect(testedGameboard.getPoint(21)).toEqual({isHit:false,ship:firstShip,position:21})
    expect(testedGameboard.getPoint(31)).toEqual({isHit:false,ship:null,position:31})
});
test("checking recieving hits",()=>{
    const firstShip = testedGameboard.ships[0]
    expect(testedGameboard.getPoint(1)).toEqual({isHit:false,ship:firstShip,position:1})
    testedGameboard.recieveAttack(1)
    expect(testedGameboard.getPoint(1)).toEqual({isHit:true,ship:firstShip,position:1})
})
test("checking sunkDetection",()=>{
    testedGameboard.recieveAttack(11)
    expect(testedGameboard.areShipsSunk()).toBe(false)
    testedGameboard.recieveAttack(21)
    expect(testedGameboard.areShipsSunk()).toBe(true)
    testedGameboard.placeShip(2,22);
    expect(testedGameboard.areShipsSunk()).toBe(false)
    testedGameboard.recieveAttack(2)
    testedGameboard.recieveAttack(12)
    testedGameboard.recieveAttack(22)
    expect(testedGameboard.areShipsSunk()).toBe(true)

})