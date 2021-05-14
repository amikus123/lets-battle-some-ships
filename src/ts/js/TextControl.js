"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnimatedText_1 = __importDefault(require("./AnimatedText"));
const animateText_1 = __importDefault(require("./animateText"));
class TextControl {
    constructor() {
        const modalBigText = document.getElementById("modalBigText");
        const restart = document.getElementById("restart");
        const bigModal = document.getElementById("modalBig");
        const modalSmallText = document.getElementById("modalSmallText");
        const smallModal = document.getElementById("modalSmall");
        const logo = document.getElementById("logo");
        const helperText = document.getElementById("helperText");
        const tip1 = document.getElementById("tip1");
        const tip2 = document.getElementById("tip2");
        this.restartButton = restart;
        this.animatedSmallModal = new AnimatedText_1.default(modalSmallText, smallModal);
        this.animatedBigModal = new AnimatedText_1.default(modalBigText, bigModal);
        this.animatedGameText = new AnimatedText_1.default(helperText);
        this.animatedLogo = new AnimatedText_1.default(logo);
        this.animatedTip1 = new AnimatedText_1.default(tip1);
        this.animatedTip2 = new AnimatedText_1.default(tip2);
        this.modalSpeed = 2500;
    }
    changePhase(phase) {
        let textToDisplay = ``;
        if (phase === 1) {
            textToDisplay = `Phase one \n  Setup `;
        }
        else {
            textToDisplay = `Phase two \n Battle `;
        }
        if (this.animatedBigModal.displayTarget.nextElementSibling !== null) {
            this.animatedBigModal.displayTarget.nextElementSibling.classList.add("hide");
        }
        if (this.animatedBigModal.displayTarget.previousElementSibling !== null) {
            console.log(this.animatedBigModal.displayTarget.previousElementSibling);
            this.animatedBigModal.displayTarget.previousElementSibling.classList.add("hide");
        }
        this.animatedBigModal.typeTemporary(textToDisplay, this.modalSpeed);
    }
    typeLogo() {
        this.animatedLogo.type("Battleships retro ");
        const sibling = document.getElementById("logo").nextElementSibling;
        setTimeout(() => {
            sibling === null || sibling === void 0 ? void 0 : sibling.classList.remove("hide");
        }, this.modalSpeed);
    }
    typeTips() {
        setTimeout(() => {
            this.animatedTip1.type("Drag ships to place them ");
            this.animatedTip2.type("Dobule click on ship to rotate ");
        }, this.modalSpeed);
    }
    typeBattleMessage(msg) {
        this.animatedGameText.type(msg);
    }
    showGameOverModal(msg) {
        this.animatedBigModal.type(msg);
        setTimeout(() => {
            this.restartButton.classList.remove("hide");
            animateText_1.default(this.restartButton, "play again ");
        }, 1000);
    }
}
exports.default = TextControl;
