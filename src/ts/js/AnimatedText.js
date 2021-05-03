"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const temp_1 = __importDefault(require("./temp"));
class AnimatedText {
    constructor(element, modal = null, speed = 10) {
        this.displayTarget = element;
        this.typeSpeed = speed;
        this.modal = modal;
    }
    setSpeed(newSpeed) {
        this.typeSpeed = newSpeed;
    }
    phase() {
        const phase1 = `Phase one: \n  Setup `;
        temp_1.default(this.displayTarget, phase1);
        setTimeout(() => {
            var _a;
            (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
        }, 5000);
    }
    type(text) {
        var _a;
        (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
        temp_1.default(this.displayTarget, text);
        setTimeout(() => {
            var _a;
            (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
        }, 5000);
    }
}
exports.default = AnimatedText;
