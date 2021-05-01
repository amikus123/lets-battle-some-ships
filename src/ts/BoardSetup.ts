class BoardSetup {
  ships: Element[];

  constructor() {
    this.ships = this.setShips();
    this.addDClick()
    console.log("created",this.ships)
  }
  private setShips() {
    return Array.from(document.getElementsByClassName("ship"));
  }
  private addDClick() {
    this.ships.forEach((ship) => {
      ship.addEventListener("dblclick", (e) => {
        ship.classList.toggle("ship-vertical");
      });
    });
  
  }
}
export default BoardSetup;
