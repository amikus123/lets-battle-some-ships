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
    phase(phaseNumber) {
        var _a, _b, _c;
        let phaseString = "";
        this.reset();
        if (phaseNumber === 1) {
            phaseString = `Phase one: \n  Setup `;
            (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
            // this.displayTarget.innerText ="";
            setTimeout(() => {
                var _a;
                (_a = this.displayTarget) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
                temp_1.default(this.displayTarget, phaseString);
                setTimeout(() => {
                    var _a, _b;
                    (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
                    (_b = this.displayTarget) === null || _b === void 0 ? void 0 : _b.classList.toggle("hide");
                }, 2500);
            }, 2500);
        }
        else {
            phaseString = `Phase two: \n  Battle `;
            (_b = this.modal) === null || _b === void 0 ? void 0 : _b.classList.toggle("hide");
            (_c = this.displayTarget) === null || _c === void 0 ? void 0 : _c.classList.toggle("hide");
            temp_1.default(this.displayTarget, phaseString);
            setTimeout(() => {
                var _a, _b;
                (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
                (_b = this.displayTarget) === null || _b === void 0 ? void 0 : _b.classList.toggle("hide");
            }, 2500);
        }
    }
    type(text) {
        var _a;
        this.reset();
        (_a = this.displayTarget) === null || _a === void 0 ? void 0 : _a.classList.remove("hide");
        temp_1.default(this.displayTarget, text);
        setTimeout(() => {
            //   this.modal?.classList.toggle("hide");
        }, 5000);
    }
    tpye() { }
    reset() {
        var _a;
        const elementToReplace = this.displayTarget;
        console.log(elementToReplace.classList, elementToReplace.id, elementToReplace.tagName);
        const newElement = document.createElement(elementToReplace.tagName.toLowerCase());
        newElement.id = elementToReplace.id;
        const classArray = elementToReplace.classList.value.split(" ");
        classArray.forEach((item) => {
            newElement.classList.add(item);
        });
        console.log(newElement);
        (_a = elementToReplace.parentElement) === null || _a === void 0 ? void 0 : _a.append(newElement);
        elementToReplace.remove();
        this.displayTarget = newElement;
    }
    typeTips() {
        setTimeout(() => {
            var _a;
            this.reset();
            const text = `Drag ships to move them        \nDobule click on ship to rotate `;
            (_a = this.displayTarget) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
            temp_1.default(this.displayTarget, text);
        }, 5000);
    }
}
exports.default = AnimatedText;
