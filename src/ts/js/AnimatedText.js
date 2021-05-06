"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const animateText_1 = __importDefault(require("./animateText"));
class AnimatedText {
    constructor(element, modal = null, speed = 10) {
        this.removePreviousTimeout = () => {
            if (this.lastTimeoutId !== null) {
                clearTimeout(this.lastTimeoutId);
                this.lastTimeoutId = null;
            }
        };
        this.displayTarget = element;
        this.typeSpeed = speed;
        this.modal = modal;
        this.lastTimeoutId = null;
    }
    setSpeed(newSpeed) {
        this.typeSpeed = newSpeed;
    }
    typeTemporary(text, removeAfter = 2500) {
        var _a, _b;
        this.resetText();
        this.removePreviousTimeout();
        (_a = this.displayTarget) === null || _a === void 0 ? void 0 : _a.classList.remove("hide");
        if (this.modal) {
            (_b = this.modal) === null || _b === void 0 ? void 0 : _b.classList.remove("hide");
        }
        animateText_1.default(this.displayTarget, text);
        setTimeout(() => {
            var _a, _b;
            (_a = this.displayTarget) === null || _a === void 0 ? void 0 : _a.classList.add("hide");
            if (this.modal) {
                (_b = this.modal) === null || _b === void 0 ? void 0 : _b.classList.add("hide");
            }
        }, removeAfter);
    }
    type(text) {
        var _a, _b;
        this.resetText();
        this.removePreviousTimeout();
        (_a = this.displayTarget) === null || _a === void 0 ? void 0 : _a.classList.remove("hide");
        if (this.modal) {
            (_b = this.modal) === null || _b === void 0 ? void 0 : _b.classList.remove("hide");
        }
        animateText_1.default(this.displayTarget, text);
    }
    hide() {
        var _a;
        this.displayTarget.classList.add("hide");
        if (this.modal) {
            (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.add("hide");
        }
    }
    resetText() {
        var _a, _b;
        const elementToReplace = this.displayTarget;
        const newElement = document.createElement(elementToReplace.tagName.toLowerCase());
        newElement.id = elementToReplace.id;
        const classArray = elementToReplace.classList.value.split(" ");
        classArray.forEach((item) => {
            newElement.classList.add(item);
        });
        if (elementToReplace.nextElementSibling === null) {
            (_a = elementToReplace.parentElement) === null || _a === void 0 ? void 0 : _a.append(newElement);
        }
        else {
            (_b = elementToReplace.parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(newElement, elementToReplace.nextElementSibling);
        }
        elementToReplace.remove();
        this.displayTarget = newElement;
    }
}
exports.default = AnimatedText;
