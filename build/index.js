"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = __importDefault(require("./Player"));
var human = new Player_1.default(false);
var computer = new Player_1.default(true);
human.setEnemy(computer);
computer.setEnemy(human);
