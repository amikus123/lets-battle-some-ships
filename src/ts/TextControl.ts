import AnimatedText from "./AnimatedText";
class TextControl {
  animatedSmallModal: AnimatedText;
  animatedGameText: AnimatedText;
  animatedBigModal: AnimatedText;
  animatedLogo: AnimatedText;
  animatedTip1: AnimatedText;
  animatedTip2: AnimatedText;
  modalSpeed: number;
  constructor() {
    const modalBigText = document.getElementById("modalBigText")!;
    const bigModal = document.getElementById("modalBig")!;
    const modalSmallText = document.getElementById("modalSmallText")!;
    const smallModal = document.getElementById("modalSmall")!;
    const logo = document.getElementById("logo")!;
    const helperText = document.getElementById("helpetText")!;
    const tip1 = document.getElementById("tip1")!;
    const tip2 = document.getElementById("tip2")!;
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
    this.animatedBigModal.typeTemporary(textToDisplay, this.modalSpeed);
  }
  public typeLogo(){
    this.animatedLogo.type("Battleships retro ")
    const sibling= document.getElementById("logo")!.nextElementSibling;
    setTimeout(()=>{
        sibling?.classList.remove("hide")
    },this.modalSpeed)
  }
  public typeTips(){
    this.animatedTip1.type("Drag ships to place them ")
    this.animatedTip2.type("Dobule click on ship to rotate ")

  }
}
export default TextControl;
