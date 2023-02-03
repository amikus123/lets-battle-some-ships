import AnimatedText from "./AnimatedText";
import setupTypewriter from "./animateText";
class TextControl {
  animatedSmallModal: AnimatedText;
  animatedGameText: AnimatedText;
  animatedBigModal: AnimatedText;
  animatedLogo: AnimatedText;
  animatedTip1: AnimatedText;
  animatedTip2: AnimatedText;
  modalSpeed: number;
  restartButton: HTMLElement;
  constructor() {
    const modalBigText = document.getElementById("modalBigText")!;
    const restart = document.getElementById("restart")!;

    const bigModal = document.getElementById("modalBig")!;
    const modalSmallText = document.getElementById("modalSmallText")!;
    const smallModal = document.getElementById("modalSmall")!;
    const logo = document.getElementById("logo")!;
    const helperText = document.getElementById("helperText")!;
    const tip1 = document.getElementById("tip1")!;
    const tip2 = document.getElementById("tip2")!;
    this.restartButton = restart;
    this.animatedSmallModal = new AnimatedText(modalSmallText, smallModal);
    this.animatedBigModal = new AnimatedText(modalBigText, bigModal);
    this.animatedGameText = new AnimatedText(helperText);
    this.animatedLogo = new AnimatedText(logo);
    this.animatedTip1 = new AnimatedText(tip1);
    this.animatedTip2 = new AnimatedText(tip2);
    this.modalSpeed = 2500;
  }
  public changePhase(phase: number) {
    let textToDisplay = ``;
    if (phase === 1) {
      textToDisplay = `Phase one \n  Setup `;
    } else {
      textToDisplay = `Phase two \n Battle `;
    }
    if (this.animatedBigModal.displayTarget.nextElementSibling !== null) {
      this.animatedBigModal.displayTarget.nextElementSibling!.classList.add(
        "hide"
      );
    }
    if (this.animatedBigModal.displayTarget.previousElementSibling !== null) {
      this.animatedBigModal.displayTarget.previousElementSibling!.classList.add(
        "hide"
      );
    }
    this.animatedBigModal.typeTemporary(textToDisplay, this.modalSpeed);
  }
  public typeLogo() {
    this.animatedLogo.type("Battleships retro ");
    const sibling = document.getElementById("logo")!.nextElementSibling;
    setTimeout(() => {
      sibling?.classList.remove("hide");
    }, this.modalSpeed);
  }
  public typeTips() {
    setTimeout(() => {
      this.animatedTip1.type("Drag ships to place them ");
      this.animatedTip2.type("Dobule click on ship to rotate ");
    }, this.modalSpeed);
  }
  public typeBattleMessage(msg: string) {
    this.animatedGameText!.type(msg);
  }
  public showGameOverModal(msg: string) {
    this.animatedBigModal.type(msg);
    setTimeout(() => {
      this.restartButton.classList.remove("hide");
      setupTypewriter(this.restartButton, "play again ");
    }, 1000);
  }
}
export default TextControl;
