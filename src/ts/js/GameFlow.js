"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameFlow {
    constructor(human, humanBoardSetup, computer, textControl, audioControl) {
        this.human = human;
        this.computer = computer;
        this.textControl = textControl;
        this.humanBoardSetup = humanBoardSetup;
        this.humanTurn = true;
        this.audioControl = audioControl;
    }
    beginBattle() {
        this.textControl.changePhase(2);
        this.humanBoardSetup.start();
        this.human.addOnClick();
        this.textControl.typeBattleMessage("Attack enemy board!");
    }
    toggleTurn() {
        this.humanTurn = !this.humanTurn;
    }
    beginSetup() { }
    inittializeBoard() {
        this.human.setEnemy(this.computer);
        this.computer.setEnemy(this.human);
        this.textControl.typeLogo();
        this.textControl.changePhase(1);
        this.textControl.typeTips();
    }
    displayBattleMessage(msg) {
        this.textControl.typeBattleMessage(msg);
    }
    endOfBattle(isWinnerComputer) {
        if (isWinnerComputer) {
            this.audioControl.playLoseMusic();
        }
        else {
            this.audioControl.playWinMucis();
        }
        this.displayGameOver(isWinnerComputer);
    }
    displayGameOver(isWinnerComputer) {
        const display = isWinnerComputer ? "you have lost! " : "you have won! ";
        this.textControl.showGameOverModal(display);
    }
    restartGame() {
        this.humanBoardSetup.start();
        // this.humanBoardSetup.reset();
        this.textControl.animatedBigModal.hide();
        this.inittializeBoard();
    }
}
exports.default = GameFlow;
