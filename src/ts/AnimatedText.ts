import setupTypewriter from "./temp";
export default class AnimatedText {
  displayTarget: HTMLElement;
  typeSpeed: number;
  modal: HTMLElement | null;

  constructor(
    element: HTMLElement,
    modal: HTMLElement | null = null,
    speed: number = 10
  ) {
    this.displayTarget = element;
    this.typeSpeed = speed;
    this.modal = modal;
  }
  public setSpeed(newSpeed: number) {
    this.typeSpeed = newSpeed;
  }
  public phase(phaseNumber: number) {
    let phaseString = "";
    if (phaseNumber === 1) {
      phaseString = `Phase one: \n  Setup `;
      this.modal?.classList.toggle("hide");
      // this.displayTarget.innerText ="";
      setTimeout(() => {
        this.displayTarget?.classList.toggle("hide");
        setupTypewriter(this.displayTarget, phaseString);
        setTimeout(() => {
          this.modal?.classList.toggle("hide");
          this.displayTarget?.classList.toggle("hide");
        }, 2500);
      }, 2500);
    } else {
      phaseString = `Phase two: \n  Battle `;
      this.modal?.classList.toggle("hide");
      this.displayTarget?.classList.toggle("hide");
      setupTypewriter(this.displayTarget, phaseString);
      setTimeout(() => {
        this.modal?.classList.toggle("hide");
        this.displayTarget?.classList.toggle("hide");
      }, 2500);
    }
  }

  public type(text: string) {
    this.displayTarget?.classList.toggle("hide");
    setupTypewriter(this.displayTarget, text);
    setTimeout(() => {
      //   this.modal?.classList.toggle("hide");
    }, 5000);
  }
  public typeTips() {
    setTimeout(() => {
      const text = 
      `Drag ships to move them        \nDobule click on ship to rotate `;
      this.displayTarget?.classList.toggle("hide");
      setupTypewriter(this.displayTarget, text);
    }, 5000);
  }
}
