import Player from "./Player";
import BoardSetup from "./BoardSetup";
import TextControl from "./TextControl";
import AudioControl from "./AudioControl";
import setupTypewriter from "./animateText"
class GameFlow {
  human: Player;
  computer: Player;
  textControl: TextControl;
  humanBoardSetup: BoardSetup;
  humanTurn: boolean;
  audioControl: AudioControl;

  constructor(
    human: Player,
    humanBoardSetup: BoardSetup,
    computer: Player,
    textControl: TextControl,
    audioControl: AudioControl
  ) {
    this.human = human;
    this.computer = computer;
    this.textControl = textControl;
    this.humanBoardSetup = humanBoardSetup;
    this.humanTurn = true;
    this.audioControl = audioControl;
  }

  public beginBattle() {
    this.textControl.changePhase(2);
    this.humanBoardSetup.start();
    this.human.addOnClick();
    this.textControl.typeBattleMessage("Attack enemy board!");
  }
  public toggleTurn() {
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
  public displayBattleMessage(msg: string) {
    this.textControl.typeBattleMessage(msg);
  }
  public endOfBattle(isWinnerComputer: boolean) {
    if (isWinnerComputer) {
      this.audioControl.playLoseMusic();
    } else {
      this.audioControl.playWinMucis();
    }
    this.displayGameOver(isWinnerComputer);
  }
  private displayGameOver(isWinnerComputer: boolean) {
    const display = isWinnerComputer ? "you have lost! " : "you have won! ";
    this.textControl.showGameOverModal(display);

  
  }
  public restartGame() {
    this.humanBoardSetup.start();
    // this.humanBoardSetup.reset();

    this.textControl.animatedBigModal.hide()
    this.inittializeBoard()
  }
}
export default GameFlow;
