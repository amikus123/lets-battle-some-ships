"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = __importDefault(require("./Player"));
var human = new Player_1.default(false);
var computer = new Player_1.default(true);
var humanBoard = document.getElementById("human--board");
var computerBoard = document.getElementById("computer--board");
var addOneHundredDivs = function (parent, human) {
    var suffix = "";
    suffix = human ? "hum_" : "com_";
    for (var i = 0; i < 100; i++) {
        var newDiv = document.createElement("div");
        newDiv.className = "game-square";
        newDiv.id = suffix + i;
        parent.appendChild(newDiv);
    }
};
var updateBoard = function (player) {
    var shipsAfloat = player.getAfloat();
    var suffix = "";
    suffix = player.isCoomputer ? "hum_" : "com_";
    console.log(suffix);
    for (var _i = 0, shipsAfloat_1 = shipsAfloat; _i < shipsAfloat_1.length; _i++) {
        var point = shipsAfloat_1[_i];
        var afloat = document.getElementById(suffix + point);
        afloat === null || afloat === void 0 ? void 0 : afloat.classList.add("ship--afloat");
    }
};
addOneHundredDivs(humanBoard, true);
addOneHundredDivs(computerBoard, false);
human.setEnemy(computer);
computer.setEnemy(human);
// setting ships
human.setShip(1, 21);
human.setShip(43, 73);
human.setShip(5, 45);
human.setShip(68, 88);
computer.setShip(1, 21);
computer.setShip(3, 53);
computer.setShip(5, 9);
computer.setShip(2, 42);
updateBoard(human);
updateBoard(computer);
// console.log(human);
// console.log(computer);
