import Gameboard from "./Gameboard";
class Player {
  isCoomputer: boolean;
  gameboard: Gameboard;
  enemy: Player | null;
  constructor(isCoomputer: boolean) {
    this.isCoomputer = isCoomputer;
    this.gameboard = new Gameboard();
    this.enemy = null;
  }

  public setShip(startPosistion: number, endPosistion: number) {
    this.gameboard.placeShip(startPosistion, endPosistion);
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

  private beginAttack(posistion: number) {
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
    if (this.isCoomputer) {
      //
    } else {
      //
    }
  }
  public getSunk(){
    return this.gameboard.shipState.sunk

  }
  public getAfloat(){
    return this.gameboard.shipState.afloat

  }
  private humanAction() {}
  private computerAction() {}
}
export default Player;
