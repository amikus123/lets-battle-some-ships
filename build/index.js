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
    human ? suffix = "hum" : "com";
    for (var i = 0; i < 100; i++) {
        var newDiv = document.createElement("div");
        newDiv.className = "game-square";
        newDiv.id = suffix + i;
        parent.appendChild(newDiv);
    }
};
addOneHundredDivs(humanBoard, true);
addOneHundredDivs(computerBoard, false);
human.setEnemy(computer);
computer.setEnemy(human);
// setting ships
human.setShip(1, 21);
human.setShip(3, 53);
human.setShip(5, 9);
human.setShip(2, 42);
computer.setShip(1, 21);
computer.setShip(3, 53);
computer.setShip(5, 9);
computer.setShip(2, 42);
