"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoardSetup {
    constructor() {
        this.ships = this.setShips();
        this.addDClick();
        console.log("created", this.ships);
    }
    setShips() {
        return Array.from(document.getElementsByClassName("ship"));
    }
    addDClick() {
        this.ships.forEach((ship) => {
            ship.addEventListener("dblclick", (e) => {
                ship.classList.toggle("ship-vertical");
            });
        });
    }
}
exports.default = BoardSetup;
