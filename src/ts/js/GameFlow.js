"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameFlow {
    constructor() {
        this.textDisplay = document.getElementById("game-info");
        this.message = "";
    }
    changeDisplayed() {
        this.textDisplay.innerHTML = this.message;
    }
    beginShot() {
        this.textDisplay.innerHTML = this.message;
    }
}
exports.default = GameFlow;
