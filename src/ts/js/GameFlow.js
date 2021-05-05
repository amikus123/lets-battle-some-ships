"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameFlow {
    constructor(human, humanBoardSetup, computer, textControl) {
        this.human = human;
        this.computer = computer;
        this.textControl = textControl;
        this.humanBoardSetup = humanBoardSetup;
        this.humanTurn = true;
    }
    beginBattle() {
        this.textControl.changePhase(2);
        this.humanBoardSetup.start();
        this.human.addOnClick();
    }
    beginSetup() { }
    inittializeBoard() {
        this.human.setEnemy(this.computer);
        this.computer.setEnemy(this.human);
        this.textControl.typeLogo();
        this.textControl.changePhase(1);
        this.textControl.typeTips();
    }
}
exports.default = GameFlow;
