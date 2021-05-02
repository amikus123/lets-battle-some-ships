import Gameboard from "./Gameboard";
class Player {
  isComputer: boolean;
  gameboard: Gameboard;
  enemy: Player | null;
  constructor(isCoomputer: boolean) {
    this.isComputer = isCoomputer;
    this.gameboard = new Gameboard();
    this.enemy = null;
  }
  public resetGameboard(){
    this.gameboard.resetGameboard();
  }
  public tryToPlaceShip(startPosistion: number, endPosistion: number ,shouldPlace:boolean=true) {
    return this.gameboard.tryToPlaceShip(startPosistion, endPosistion,shouldPlace);
  }
  public setEnemy(enemy: Player) {
    this.enemy = enemy;
  }

  public hasLost(){
      return this.gameboard.areShipsSunk();
  }
  private recieveAttack(posistion: number) {
    this.gameboard.recieveAttack(posistion);
  }
  public randomizeShips(){
    this.gameboard.randomShipSetup();
  }
  public beginAttack(posistion: number) {
    const hasHit = this.enemy?.recieveAttack(posistion);
    // ai should do something wit that info   
  }
  public choosePositionToAttack(posistion: number) {
    if (this.enemy?.gameboard.isPositionHit(posistion)) {
      this.beginAttack(posistion);
    } else {
      //
    }
  }
  public takeAction() {
    if (this.isComputer) {
      //
    } else {
      //
    }
  }

  private humanAction(){}
  private computerAction(){}
}
export default Player;
