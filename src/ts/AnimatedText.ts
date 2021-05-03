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
  public phase() {
    const phase1 = `Phase one: \n  Setup `;
    setupTypewriter(this.displayTarget, phase1);
    setTimeout(() => {
      this.modal?.classList.toggle("hide");
    }, 5000);
  }

  public type(text: string) {
    this.modal?.classList.toggle("hide");
    setupTypewriter(this.displayTarget, text);
    setTimeout(() => {
      this.modal?.classList.toggle("hide");
    }, 5000);
  }
}
