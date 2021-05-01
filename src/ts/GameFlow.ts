class GameFlow {
  textDisplay : HTMLElement;
  message:string 
  constructor(){
    this.textDisplay = document.getElementById("game-info")!;
    this.message = "";
  }
  private changeDisplayed(){
    this.textDisplay.innerHTML = this.message;
  }
  beginShot(){
    this.textDisplay.innerHTML = this.message;
    
  }

}
export default GameFlow;
