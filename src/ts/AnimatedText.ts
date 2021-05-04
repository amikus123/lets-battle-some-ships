import setupTypewriter from "./temp";
export default class AnimatedText {
  displayTarget: HTMLElement;
  typeSpeed: number;
  modal: HTMLElement | null;
  lastTimeoutId: number | null;
  constructor(
    element: HTMLElement,
    modal: HTMLElement | null = null,
    speed: number = 10
  ) {
    this.displayTarget = element;
    this.typeSpeed = speed;
    this.modal = modal;
    this.lastTimeoutId = null;
  }
  public setSpeed(newSpeed: number) {
    this.typeSpeed = newSpeed;
  }
  private removePreviousTimeout = () => {
    if (this.lastTimeoutId !== null) {
      clearTimeout(this.lastTimeoutId);
      this.lastTimeoutId = null;
    }
  };
  public typeTemporary(text: string, removeAfter: number = 2500) {
    this.resetText();
    this.removePreviousTimeout();
    this.displayTarget?.classList.remove("hide");
    if (this.modal) {
      this.modal?.classList.remove("hide");
    }
    setupTypewriter(this.displayTarget, text);
    setTimeout(() => {
      this.displayTarget?.classList.add("hide");
      if (this.modal) {
        this.modal?.classList.add("hide");
      }
    }, removeAfter);
  }
  public type(text: string) {
    this.resetText();
    this.removePreviousTimeout();
    this.displayTarget?.classList.remove("hide");
    if (this.modal) {
      this.modal?.classList.remove("hide");
    }
    setupTypewriter(this.displayTarget, text);
  }
  public hide() {
    this.displayTarget.classList.add("hide")
    if(this.modal){
      this.modal?.classList.add("hide");

    }
  }
  private resetText() {
    const elementToReplace = this.displayTarget;
    
    const newElement = document.createElement(
      elementToReplace.tagName.toLowerCase()
    );
    newElement.id = elementToReplace.id;
    const classArray = elementToReplace.classList.value.split(" ");
    classArray.forEach((item) => {
      newElement.classList.add(item);
    });
    if(elementToReplace.nextElementSibling === null){
      elementToReplace.parentElement?.append(newElement);
    }else{
      elementToReplace.parentElement?.insertBefore(newElement,elementToReplace.nextElementSibling)
    }
    elementToReplace.remove();
    this.displayTarget = newElement;
  }
}
