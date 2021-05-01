import BoardState,{boardPosition} from "../BoardState";
import Ship from "../Ship";

  
let  boardState = new BoardState;
beforeEach(()=>{
    boardState = new BoardState;
})
test("testing adding ships",()=>{
    const horizontalShip = new Ship(22,23);
    boardState.addShip(horizontalShip);
    

})