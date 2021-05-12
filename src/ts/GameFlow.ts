import Player from "./Player";
import BoardSetup from "./BoardSetup";
import TextControl from "./TextControl";

class GameFlow {
  human: Player;
  computer: Player;
  textControl: TextControl;
  humanBoardSetup: BoardSetup;
  humanTurn: boolean;

  constructor(
    human: Player,
    humanBoardSetup: BoardSetup,
    computer: Player,
    textControl: TextControl
  ) {
    this.human = human;
    this.computer = computer;
    this.textControl = textControl;
    this.humanBoardSetup = humanBoardSetup;
    this.humanTurn = true;
  }
  public beginBattle() {
    this.textControl.changePhase(2);
    this.humanBoardSetup.start();
    this.human.addOnClick();
    this.textControl.typeBattleMessage("Attack enemy board!")

  }
  public toggleTurn(){
    this.humanTurn = !this.humanTurn;
  }
  public beginSetup() {}
  public inittializeBoard() {
    this.human.setEnemy(this.computer);
    this.computer.setEnemy(this.human);
    this.textControl.typeLogo();
      this.textControl.changePhase(1);
      this.textControl.typeTips();
  }
  public displayBattleMessage(msg:string){
    this.textControl.typeBattleMessage(msg)
  }
}
export default GameFlow;
