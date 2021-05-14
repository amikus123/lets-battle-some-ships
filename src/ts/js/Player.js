"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gameboard_1 = __importDefault(require("./Gameboard"));
const messages = {
    sunk: "sunk a ship! ",
    hit: "hit a ship! ",
    miss: "missed! ",
};
class Player {
    constructor(isCoomputer) {
        this.isComputer = isCoomputer;
        this.gameboard = new Gameboard_1.default();
        this.enemy = null;
        this.gameFlow = null;
        this.audioControl = null;
        this.nextMoves = {
            moves: [],
            goUp: true,
            add: true,
            baseHit: -1,
        };
        this.messages = messages;
    }
    setGameFlow(gameFlow) {
        this.gameFlow = gameFlow;
    }
    setEnemy(enemy) {
        this.enemy = enemy;
    }
    setAudioControl(audio) {
        this.audioControl = audio;
    }
    // board manipulation
    resetGameboard() {
        this.gameboard.resetGameboard();
    }
    tryToPlaceShip(startPosistion, endPosistion, shouldPlace = true) {
        return this.gameboard.tryToPlaceShip(startPosistion, endPosistion, shouldPlace);
    }
    randomizeShips() {
        this.gameboard.randomShipSetup();
    }
    addOnClick() {
        var _a;
        const enemyBoardDOM = document.getElementById("computer--board");
        Array.from(enemyBoardDOM === null || enemyBoardDOM === void 0 ? void 0 : enemyBoardDOM.children).forEach((square, index) => {
            square.addEventListener("click", () => this.userClick(square, index));
        });
        (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.updateBoard();
        this.updateBoard();
    }
    userClick(square, index) {
        var _a, _b;
        if (!square.classList.contains("ship-hit") &&
            !square.classList.contains("empty-hit") &&
            ((_a = this.gameFlow) === null || _a === void 0 ? void 0 : _a.humanTurn)) {
            this.beginAttack(index);
            this.gameFlow.toggleTurn();
            setTimeout(() => {
                this.enemy.computerMove();
            }, 1);
        }
        else {
            (_b = this.audioControl) === null || _b === void 0 ? void 0 : _b.playErrorSound();
        }
    }
    updateBoard() {
        let id = "";
        if (this.isComputer) {
            id = "computer--board";
        }
        else {
            id = "human--board";
        }
        const gameboardDOM = document.getElementById(id);
        const gameSquares = Array.from(gameboardDOM.children);
        for (let i = 0; i < 100; i++) {
            gameSquares[i].className = `game-square ${this.gameboard.boardState.getSquareState(i)}`;
        }
    }
    hasLost() {
        console.log(this.gameboard);
        return this.gameboard.areShipsSunk();
    }
    getPositionPossibleToAttack() {
        var _a;
        return (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.getPositionPossibleToAttack();
    }
    getPosition(positon) {
        var _a;
        return (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.getPosition(positon);
    }
    recieveAttack(posistion) {
        var _a;
        this.gameboard.recieveAttack(posistion);
        this.updateBoard();
        if (this.hasLost()) {
            (_a = this.gameFlow) === null || _a === void 0 ? void 0 : _a.endOfBattle(this.isComputer);
        }
    }
    beginAttack(posistion) {
        var _a, _b;
        const attackedPosition = this.getPosition(posistion);
        console.log(attackedPosition, "przed");
        (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.recieveAttack(posistion);
        const message = this.getMessageToDisply(attackedPosition);
        this.gameFlow.displayBattleMessage(message);
        (_b = this.enemy) === null || _b === void 0 ? void 0 : _b.updateBoard();
        console.log(attackedPosition, "atakownae");
    }
    getMessageToDisply(posistion) {
        const name = this.isComputer ? "Enemy has " : "You have ";
        const action = this.getAction(posistion);
        return name + action;
    }
    getAction(posistion) {
        if (posistion.ship === undefined) {
            return this.messages.miss;
        }
        else if (posistion.ship.isSunk()) {
            return this.messages.sunk;
        }
        else {
            return this.messages.hit;
        }
    }
    computerMove() {
        var _a;
        if (this.nextMoves.moves.length === 0) {
            const options = this.getPositionPossibleToAttack();
            let randomPositonIndex = Math.floor(Math.random() * (options === null || options === void 0 ? void 0 : options.length));
            this.beginAttack(options[randomPositonIndex]);
            this.tryToAddPossibleMoves(options[randomPositonIndex]);
        }
        else if (this.nextMoves.moves.length === 1) {
            // we know the row or column, so we check ony one axis
            if (!((_a = this.getPosition(this.nextMoves.moves[0])) === null || _a === void 0 ? void 0 : _a.isHit)) {
                // checking if base position was hit
                this.beginAttack(this.nextMoves.moves[0]);
            }
            else {
                this.nextMoves.goUp =
                    Math.abs(this.nextMoves.baseHit - this.nextMoves.moves[0]) >= 10;
                // this.handleOneDirection();
                console.log("one directon");
                this.handleOneDirection2();
            }
        }
        else {
            // we are checking positions in up to 4 direction
            console.log("four");
            this.chooseNextTarget();
        }
        this.gameFlow.toggleTurn();
    }
    checkIfOutsideRowOfAxis(dynamicIndex) {
        const baseIndex = this.nextMoves.moves[0];
        if (this.nextMoves.goUp) {
            return (dynamicIndex < 0 || dynamicIndex > 99);
        }
        else {
            return (baseIndex - (baseIndex % 10) !== dynamicIndex - (dynamicIndex % 10));
        }
    }
    handleOneDirection2() {
        var _a, _b, _c, _d, _e, _f, _g;
        const baseIndex = this.nextMoves.moves[0];
        let indexToCheck = this.nextMoves.moves[0];
        let goUp = true;
        const additionNumber = this.nextMoves.goUp ? 10 : 1;
        if ((_b = (_a = this.getPosition(baseIndex)) === null || _a === void 0 ? void 0 : _a.ship) === null || _b === void 0 ? void 0 : _b.isSunk()) {
            this.nextMoves.moves = [];
        }
        else {
            while (true) {
                indexToCheck += goUp ? additionNumber : -additionNumber;
                console.log(indexToCheck);
                if (this.checkIfOutsideRowOfAxis(indexToCheck)) {
                    console.log("outisde");
                    goUp = !goUp;
                }
                else if (((_c = this.getPosition(indexToCheck)) === null || _c === void 0 ? void 0 : _c.isHit) &&
                    ((_d = this.getPosition(indexToCheck)) === null || _d === void 0 ? void 0 : _d.ship) !== undefined) {
                    //go nex
                }
                else if (((_e = this.getPosition(indexToCheck)) === null || _e === void 0 ? void 0 : _e.isHit) &&
                    ((_f = this.getPosition(indexToCheck)) === null || _f === void 0 ? void 0 : _f.ship) === undefined) {
                    //go back
                    goUp = !goUp;
                }
                else if (!((_g = this.getPosition(indexToCheck)) === null || _g === void 0 ? void 0 : _g.isHit)) {
                    break;
                    //go nex
                }
            }
            const position = this.getPosition(indexToCheck);
            console.log(this.nextMoves, indexToCheck, this.getAction(position));
            this.beginAttack(indexToCheck);
            if (this.getAction(position) === this.messages.hit) {
                this.nextMoves.moves[0] = indexToCheck;
            }
            else if (this.getAction(position) === this.messages.sunk) {
                this.nextMoves.moves = [];
            }
            else {
            }
        }
    }
    // private handleOneDirection() {
    //   if (this.nextMoves.goUp) {
    //     this.handleUp();
    //   } else {
    //     this.handleSide();
    //   }
    // }
    // private handleSide() {
    //   // console.log(this.nextMoves, this.nextMoves.moves[0]);
    //   const baseIndex = this.nextMoves.moves[0];
    //   let indexToCheck = this.nextMoves.moves[0];
    //   let goRight = true;
    //   if (this.getPosition(baseIndex)?.ship?.isSunk()) {
    //     this.nextMoves.moves = [];
    //   } else {
    //     while (true) {
    //       indexToCheck += goRight ? 1 : -1;
    //       console.log(indexToCheck);
    //       if (
    //         baseIndex - (baseIndex % 10) !==
    //         indexToCheck - (indexToCheck % 10)
    //       ) {
    //         console.log("outisde");
    //         goRight = !goRight;
    //       } else if (
    //         this.getPosition(indexToCheck)?.isHit &&
    //         this.getPosition(indexToCheck)?.ship !== undefined
    //       ) {
    //         //go nex
    //       } else if (
    //         this.getPosition(indexToCheck)?.isHit &&
    //         this.getPosition(indexToCheck)?.ship === undefined
    //       ) {
    //         //go back
    //         goRight = !goRight;
    //       } else if (!this.getPosition(indexToCheck)?.isHit) {
    //         break;
    //         //go nex
    //       }
    //     }
    //     const position = this.getPosition(indexToCheck)!;
    //     console.log(this.nextMoves, indexToCheck, this.getAction(position));
    //     this.beginAttack(indexToCheck);
    //     if (this.getAction(position) === this.messages.hit) {
    //       this.nextMoves.moves[0] = indexToCheck;
    //     } else if (this.getAction(position) === this.messages.sunk) {
    //       this.nextMoves.moves = [];
    //     } else {
    //     }
    //   }
    // }
    // private handleUp() {
    //   console.log("UP");
    //   console.log(this.nextMoves, this.nextMoves.moves[0]);
    //   const baseIndex = this.nextMoves.moves[0];
    //   let indexToCheck = this.nextMoves.moves[0];
    //   let goUp = true;
    //   // go right by deafult
    //   // if posistion is hit and a ship - continue
    //   // is position is hit and not a ship go back
    //   // if positon is not hti go next
    //   // if chanegd the row - go previous direction
    //   if (this.getPosition(baseIndex)?.ship?.isSunk()) {
    //     console.log(
    //       "zatopiony",
    //       this.getPosition(baseIndex)?.ship,
    //       this.getPosition(baseIndex)?.ship?.isSunk()
    //     );
    //     this.nextMoves.moves = [];
    //   } else {
    //     while (true) {
    //       indexToCheck += goUp ? 10 : -10;
    //       console.log(indexToCheck);
    //       if (indexToCheck < 0 || indexToCheck > 99) {
    //         goUp = !goUp;
    //       } else if (
    //         this.getPosition(indexToCheck)?.isHit &&
    //         this.getPosition(indexToCheck)?.ship !== undefined
    //       ) {
    //         //go nex
    //       } else if (
    //         this.getPosition(indexToCheck)?.isHit &&
    //         this.getPosition(indexToCheck)?.ship === undefined
    //       ) {
    //         //go back
    //         goUp = !goUp;
    //       } else if (!this.getPosition(indexToCheck)?.isHit) {
    //         break;
    //         //go nex
    //       }
    //     }
    //     const position = this.getPosition(indexToCheck)!;
    //     console.log(this.nextMoves, indexToCheck, this.getAction(position));
    //     this.beginAttack(indexToCheck);
    //     if (this.getAction(position) === this.messages.hit) {
    //       this.nextMoves.moves[0] = indexToCheck;
    //     } else if (this.getAction(position) === this.messages.miss) {
    //       // this.nextMoves.add = !this.nextMoves.add;
    //     } else {
    //       this.nextMoves.moves = [];
    //     }
    //   }
    // }
    chooseNextTarget() {
        const randomIndex = Math.floor(Math.random() * this.nextMoves.moves.length);
        const positionIndex = this.nextMoves.moves[randomIndex];
        const position = this.getPosition(positionIndex);
        console.log(randomIndex, positionIndex, position, this.nextMoves, "XDDD");
        this.beginAttack(positionIndex);
        if (this.getAction(position) === this.messages.hit) {
            //determining direction
            if ((this.nextMoves.baseHit - positionIndex) % 10 === 0) {
                this.nextMoves.goUp = true;
            }
            else {
                this.nextMoves.goUp = false;
            }
            this.nextMoves.add = true;
            this.nextMoves.moves = [positionIndex];
        }
        else if (this.getAction(position) === this.messages.miss) {
            // miss, we are removing this position
            this.nextMoves.moves = this.nextMoves.moves.filter((item) => item != positionIndex);
        }
        else {
            // ship was sunk, we have to reset
            this.nextMoves.moves = [];
        }
    }
    getAdjecentToPosition(position) {
        const positions = [position];
        if (position == 10) {
            positions.push(0);
        }
        if (position % 10 !== 9) {
            positions.push(position + 1);
        }
        if (position % 10 !== 0) {
            positions.push(position - 1);
        }
        if (position > 10) {
            positions.push(position - 10);
        }
        if (position < 90) {
            positions.push(position + 10);
        }
        return positions;
    }
    tryToAddPossibleMoves(positionIndex) {
        const postion = this.getPosition(positionIndex);
        if (this.getAction(postion) === this.messages.hit) {
            let indexesToCheck = this.getAdjecentToPosition(positionIndex);
            this.nextMoves.baseHit = positionIndex;
            console.log(indexesToCheck, "to check");
            indexesToCheck = indexesToCheck.filter((item) => {
                var _a;
                if (!((_a = this.getPosition(item)) === null || _a === void 0 ? void 0 : _a.isHit)) {
                    return item;
                }
            });
            console.log(indexesToCheck, "after");
            indexesToCheck.forEach((item) => {
                var _a;
                if (!((_a = this.getPosition(item)) === null || _a === void 0 ? void 0 : _a.isHit)) {
                    this.nextMoves.moves.push(item);
                }
            });
            console.log(indexesToCheck, "end");
        }
    }
}
exports.default = Player;
