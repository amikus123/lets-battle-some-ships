import Gameboard from "./Gameboard";

const testedGameboard = new Gameboard();
test("check ships placement", () => {
    expect(testedGameboard.getPoint(1)).toEqual({isHit:false,ship:null,position:1})
});
