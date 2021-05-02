/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/js/BoardSetup.js":
/*!*********************************!*\
  !*** ./src/ts/js/BoardSetup.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Ship_1 = __importDefault(__webpack_require__(/*! ./Ship */ \"./src/ts/js/Ship.js\"));\nclass BoardSetup {\n    constructor(player, gameboard) {\n        this.player = player;\n        this.gameboard = gameboard;\n        this.setupPhase = !player.isComputer;\n        if (this.setupPhase) {\n            this.shipsDOM = this.setShips();\n            this.addDClick();\n            this.allowDrag();\n        }\n        else {\n            this.shipsDOM = null;\n        }\n    }\n    setShips() {\n        return Array.from(document.getElementsByClassName(\"ship\"));\n    }\n    addSquares() {\n        const dropShip = this.getDropShip();\n        const beginDrag = this.getBeginDrag();\n        const suffix = this.player.isComputer ? \"com_\" : \"hum_\";\n        for (let i = 0; i < 100; i++) {\n            const newDiv = document.createElement(\"div\");\n            newDiv.className = \"game-square\";\n            newDiv.id = suffix + i;\n            newDiv.setAttribute(\"index\", i.toString());\n            newDiv.addEventListener(\"dragover\", beginDrag);\n            newDiv.addEventListener(\"drop\", dropShip);\n            this.gameboard.appendChild(newDiv);\n        }\n    }\n    updateBoard() {\n        const gameSquares = Array.from(this.gameboard.children);\n        for (let i = 0; i < 100; i++) {\n            gameSquares[i].className = `game-square ${this.player.gameboard.boardState.getSquareState(i)}`;\n        }\n    }\n    getBeginDrag() {\n        const beginDrag = (e) => {\n            e.preventDefault();\n        };\n        return beginDrag;\n    }\n    getDropShip() {\n        const dropShip = (e) => {\n            e.preventDefault();\n            const dropSquare = e.target;\n            const id = e.dataTransfer.getData(\"text/plain\");\n            const draggable = document.getElementById(id);\n            const shipPositions = this.getShipDOMStartAndEnd(dropSquare, draggable);\n            const createdShip = new Ship_1.default(shipPositions[0], shipPositions[1]);\n            const shipDom = document.getElementById(id);\n            console.log(shipPositions, \"postions\");\n            if (this.player.tryToPlaceShip(shipPositions[0], shipPositions[1])) {\n                dropSquare.appendChild(draggable);\n                this.updateBoard();\n                shipDom === null || shipDom === void 0 ? void 0 : shipDom.setAttribute(\"index\", (this.player.gameboard.ships.length - 1).toString());\n            }\n            else {\n            }\n        };\n        return dropShip;\n    }\n    getShipDOMStartAndEnd(square, ship) {\n        const length = Number(ship.getAttribute(\"length\"));\n        const squareIndex = Number(square.getAttribute(\"index\"));\n        if (ship.classList.contains(\"ship-vertical\")) {\n            return [squareIndex, squareIndex + 10 * (length - 1)];\n        }\n        else {\n            return [squareIndex, squareIndex + length - 1];\n        }\n    }\n    addDClick() {\n        if (this.shipsDOM !== null) {\n            this.shipsDOM.forEach((ship) => {\n                ship.addEventListener(\"dblclick\", (e) => {\n                    ship.classList.toggle(\"ship-vertical\");\n                });\n            });\n        }\n    }\n    allowDrag() {\n        if (this.shipsDOM !== null) {\n            const dragStart = (e) => {\n                e.dataTransfer.setData(\"text/plain\", e.target.id);\n                console.log(e.dataTransfer, \"picked\");\n                if (e.target.parentElement.id !== \"dockyard\" &&\n                    e.target.getAttribute(\"index\") !== null) {\n                    this.player.gameboard.removeShip(Number(e.target.getAttribute(\"index\")));\n                    console.log(e.target, this.player);\n                }\n            };\n            this.shipsDOM.forEach((item) => {\n                item.addEventListener(\"dragstart\", dragStart);\n            });\n        }\n    }\n}\nexports.default = BoardSetup;\n\n\n//# sourceURL=webpack://battleships/./src/ts/js/BoardSetup.js?");

/***/ }),

/***/ "./src/ts/js/BoardState.js":
/*!*********************************!*\
  !*** ./src/ts/js/BoardState.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass BoardState {\n    constructor() {\n        this.positions = this.initalSetup();\n    }\n    initalSetup() {\n        const ret = [];\n        for (let i = 0; i < 100; i++) {\n            ret.push({ isHit: false, ship: undefined, canPlace: true });\n        }\n        return ret;\n    }\n    getSquareState(index) {\n        // console.log(this.positions)\n        const result = this.positions[index];\n        if (result.ship !== undefined) {\n            return \"afloat\";\n        }\n        else if (!result.canPlace) {\n            return \"unplaceable\";\n        }\n        else {\n            return \"empty\";\n        }\n    }\n    addShip(ship) {\n        for (const point of ship.hull) {\n            this.positions[point.position].ship = ship;\n            this.positions[point.position].canPlace = false;\n        }\n        for (const index of ship.adjecentPositions) {\n            this.positions[index].canPlace = false;\n        }\n    }\n    updateAfterRemoval(ships) {\n        this.positions = this.initalSetup();\n        ships.forEach(ship => this.addShip(ship));\n    }\n    setHit(position) {\n        if (typeof position === \"number\") {\n            this.addToHitList(position);\n        }\n        else {\n            for (const num of position) {\n                this.addToHitList(num);\n            }\n        }\n    }\n    addToHitList(position) {\n        this.positions[position].isHit = true;\n    }\n    isHit(position) {\n        return this.positions[position].isHit ? true : false;\n    }\n    checkCanBePlaced(ship) {\n        console.log(\"checkCanBePlaced\", ship);\n        if (ship.endPosition > 99) {\n            return false;\n        }\n        if (ship.startPosition % 10 !== ship.endPosition % 10 &&\n            ship.startPosition - (ship.startPosition % 10) !==\n                ship.endPosition - (ship.endPosition % 10)) {\n            return false;\n        }\n        for (const x of ship.hull) {\n            if (!this.positions[x.position].canPlace) {\n                // console.log(x.position, this.unplacable.indexOf(x.position), \"fail\");\n                return false;\n            }\n        }\n        return true;\n    }\n    getSunk() { }\n    getAfloat() { }\n    getHit() { }\n    getUnplacable() { }\n}\nexports.default = BoardState;\n\n\n//# sourceURL=webpack://battleships/./src/ts/js/BoardState.js?");

/***/ }),

/***/ "./src/ts/js/Buttons.js":
/*!******************************!*\
  !*** ./src/ts/js/Buttons.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.resetBoard = exports.startGame = exports.audioToggle = exports.randomSetup = void 0;\nconst randomSetup = () => {\n    console.log(1);\n};\nexports.randomSetup = randomSetup;\nconst audioToggle = () => {\n    console.log(1);\n};\nexports.audioToggle = audioToggle;\nconst startGame = () => {\n    console.log(1);\n};\nexports.startGame = startGame;\nconst resetBoard = () => {\n    console.log(1);\n};\nexports.resetBoard = resetBoard;\n\n\n//# sourceURL=webpack://battleships/./src/ts/js/Buttons.js?");

/***/ }),

/***/ "./src/ts/js/Gameboard.js":
/*!********************************!*\
  !*** ./src/ts/js/Gameboard.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Ship_1 = __importDefault(__webpack_require__(/*! ./Ship */ \"./src/ts/js/Ship.js\"));\nconst BoardState_1 = __importDefault(__webpack_require__(/*! ./BoardState */ \"./src/ts/js/BoardState.js\"));\nclass Gameboard {\n    constructor() {\n        this.ships = [];\n        this.boardState = new BoardState_1.default();\n        this.shipsSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];\n    }\n    resetGameboard() {\n        this.ships = [];\n        this.boardState = new BoardState_1.default();\n    }\n    areShipsSunk() {\n        for (const ship of this.ships) {\n            if (!ship.isSunk()) {\n                return false;\n            }\n        }\n        return true;\n    }\n    tryToPlaceShip(startPosistion, endPosistion, shouldPlace = true) {\n        const createdShip = new Ship_1.default(startPosistion, endPosistion);\n        console.log(createdShip);\n        // horizontal\n        if (this.boardState.checkCanBePlaced(createdShip)) {\n            if (shouldPlace) {\n                this.finishPlacingShip(createdShip);\n            }\n            return true;\n        }\n        else {\n            return false;\n        }\n    }\n    isPositionHit(positon) {\n        return this.boardState.isHit(positon);\n    }\n    getPosition(posistion) {\n        return this.boardState.positions[posistion];\n    }\n    removeShip(ship) {\n        if (typeof ship !== \"number\") {\n            let indexToRemove = -1;\n            console.log(ship, \"REMOVING\");\n            this.ships.forEach((item, index) => {\n                if (ship.endPosition === item.endPosition && ship.startPosition === item.startPosition) {\n                    indexToRemove = index;\n                }\n            });\n            this.ships.splice(indexToRemove, 1);\n            this.boardState.updateAfterRemoval(this.ships);\n        }\n        else {\n            this.ships.splice(ship, 1);\n            this.boardState.updateAfterRemoval(this.ships);\n        }\n    }\n    recieveAttack(posistion) {\n        var _a, _b;\n        if (this.getPosition(posistion).ship === null) {\n            (_a = this.getPosition(posistion).ship) === null || _a === void 0 ? void 0 : _a.receiveHit(posistion);\n            return false;\n        }\n        else {\n            this.getPosition(posistion).isHit = true;\n            (_b = this.getPosition(posistion).ship) === null || _b === void 0 ? void 0 : _b.receiveHit(posistion);\n            return true;\n        }\n    }\n    randomShipSetup() {\n        this.resetGameboard();\n        this.shipsSizes.forEach((length) => {\n            this.createRadnomShip(length);\n        });\n    }\n    createRadnomShip(lenght) {\n        while (true) {\n            if (Math.round(Math.random()) === 1) {\n                if (this.randomVerticalShip(lenght)) {\n                    break;\n                }\n            }\n            else {\n                if (this.randomHorizontalShip(lenght)) {\n                    break;\n                }\n            }\n        }\n    }\n    randomVerticalShip(length) {\n        const randomColumn = Math.floor(Math.random() * 10);\n        const validStarts = this.getValidVerticalStarts(randomColumn, length);\n        if (validStarts.length !== 0) {\n            const randomStart = validStarts[Math.floor(Math.random() * validStarts.length)];\n            const newShip = new Ship_1.default(randomStart, randomStart + (length - 1) * 10);\n            // console.log(\"srodek\", newShip);\n            if (true) {\n                // console.log(randomColumn, validStarts, newShip, randomStart, \"err\");\n                this.finishPlacingShip(newShip);\n                return true;\n            }\n        }\n        return false;\n    }\n    getValidVerticalStarts(column, length) {\n        const possibleStarts = [];\n        // console.log(\"kolumna\", column);\n        for (let i = 0; i < 11 - length; i++) {\n            let canInsert = true;\n            for (let j = 0; j < length; j++) {\n                // j == fieds to check\n                // l = ilosc do sprawdzenia za kazdym razem\n                if (!this.boardState.positions[(i + j) * 10 + column].canPlace) {\n                    canInsert = false;\n                    break;\n                }\n                // console.log(this.boardState.positions[(i + j) * 10 + column]);\n            }\n            if (canInsert) {\n                possibleStarts.push(i * 10 + column);\n            }\n        }\n        // console.log(possibleStarts, column, length);\n        return possibleStarts;\n    }\n    randomHorizontalShip(length) {\n        const randomRow = Math.floor(Math.random() * 10) * 10;\n        const validStarts = this.getValidHorizontalStarts(randomRow, length);\n        if (validStarts.length !== 0) {\n            // there are possible postions\n            const randomStart = validStarts[Math.floor(Math.random() * validStarts.length)];\n            const newShip = new Ship_1.default(randomStart, randomStart + length - 1);\n            this.finishPlacingShip(newShip);\n            return true;\n        }\n        return false;\n    }\n    getValidHorizontalStarts(row, length) {\n        const possibleStarts = [];\n        // console.log(\"kolumna\", row);\n        for (let i = 0; i < 11 - length; i++) {\n            let canInsert = true;\n            for (let j = 0; j < length; j++) {\n                if (!this.boardState.positions[i + j + row].canPlace) {\n                    canInsert = false;\n                    break;\n                }\n                // console.log(this.boardState.positions[i + j + row]);\n            }\n            if (canInsert) {\n                possibleStarts.push(i + row);\n            }\n        }\n        // console.log(possibleStarts, row, length);\n        return possibleStarts;\n    }\n    finishPlacingShip(createdShip) {\n        this.ships.push(createdShip);\n        this.boardState.addShip(createdShip);\n    }\n}\nexports.default = Gameboard;\n\n\n//# sourceURL=webpack://battleships/./src/ts/js/Gameboard.js?");

/***/ }),

/***/ "./src/ts/js/Player.js":
/*!*****************************!*\
  !*** ./src/ts/js/Player.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Gameboard_1 = __importDefault(__webpack_require__(/*! ./Gameboard */ \"./src/ts/js/Gameboard.js\"));\nclass Player {\n    constructor(isCoomputer) {\n        this.isComputer = isCoomputer;\n        this.gameboard = new Gameboard_1.default();\n        this.enemy = null;\n    }\n    resetGameboard() {\n        this.gameboard.resetGameboard();\n    }\n    tryToPlaceShip(startPosistion, endPosistion, shouldPlace = true) {\n        return this.gameboard.tryToPlaceShip(startPosistion, endPosistion, shouldPlace);\n    }\n    setEnemy(enemy) {\n        this.enemy = enemy;\n    }\n    hasLost() {\n        return this.gameboard.areShipsSunk();\n    }\n    recieveAttack(posistion) {\n        this.gameboard.recieveAttack(posistion);\n    }\n    randomizeShips() {\n        this.gameboard.randomShipSetup();\n    }\n    beginAttack(posistion) {\n        var _a;\n        const hasHit = (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.recieveAttack(posistion);\n        // ai should do something wit that info   \n    }\n    choosePositionToAttack(posistion) {\n        var _a;\n        if ((_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.isPositionHit(posistion)) {\n            this.beginAttack(posistion);\n        }\n        else {\n            //\n        }\n    }\n    takeAction() {\n        if (this.isComputer) {\n            //\n        }\n        else {\n            //\n        }\n    }\n    humanAction() { }\n    computerAction() { }\n}\nexports.default = Player;\n\n\n//# sourceURL=webpack://battleships/./src/ts/js/Player.js?");

/***/ }),

/***/ "./src/ts/js/Ship.js":
/*!***************************!*\
  !*** ./src/ts/js/Ship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Ship {\n    constructor(startPosition, endPosition) {\n        this.length = this.setLength(startPosition, endPosition);\n        this.hull = this.setHull(this.length, startPosition, endPosition);\n        this.startPosition = startPosition;\n        this.endPosition = endPosition;\n        this.adjecentPositions = this.setAdjecentPositions(this.hull);\n    }\n    setHull(length, startPosition, endPosition) {\n        //  eP - sP is smaller than 10? then it is horizontal\n        const hull = [];\n        if (endPosition - startPosition < 10) {\n            for (let i = 0; i < length; i++) {\n                hull.push({ isHit: false, position: startPosition + i });\n            }\n        }\n        else {\n            for (let i = 0; i < length; i++) {\n                hull.push({ isHit: false, position: startPosition + i * 10 });\n            }\n        }\n        return hull;\n    }\n    setAdjecentPositions(hull) {\n        let positionsToCheck = [];\n        for (const point of hull) {\n            positionsToCheck = positionsToCheck.concat(this.getAdjecentToPosition(point.position));\n        }\n        return [...new Set(positionsToCheck)];\n    }\n    getAdjecentToPosition(position) {\n        const positions = [position];\n        if (position == 10) {\n            positions.push(0);\n        }\n        if (position % 10 !== 9) {\n            positions.push(position + 1);\n            if (position > 9) {\n                positions.push(position - 9);\n            }\n            if (position < 90) {\n                positions.push(position + 11);\n            }\n        }\n        if (position % 10 !== 0) {\n            positions.push(position - 1);\n            if (position > 9) {\n                positions.push(position - 11);\n            }\n            if (position < 90) {\n                positions.push(position + 9);\n            }\n        }\n        if (position > 10) {\n            positions.push(position - 10);\n        }\n        if (position < 90) {\n            positions.push(position + 10);\n        }\n        return positions;\n    }\n    setLength(startPosition, endPosition) {\n        if (endPosition - startPosition < 10) {\n            //horizotnal\n            return endPosition - startPosition + 1;\n        }\n        else {\n            return (endPosition - startPosition) / 10 + 1;\n        }\n    }\n    receiveHit(hitPosition) {\n        this.getPoint(hitPosition).isHit = true;\n    }\n    getPoint(posistion) {\n        for (const point of this.hull) {\n            if (point.position == posistion) {\n                return point;\n            }\n        }\n        return this.hull[0];\n    }\n    isSunk() {\n        for (const point of this.hull) {\n            if (!point.isHit) {\n                return false;\n            }\n        }\n        return true;\n    }\n}\nexports.default = Ship;\n\n\n//# sourceURL=webpack://battleships/./src/ts/js/Ship.js?");

/***/ }),

/***/ "./src/ts/js/index.js":
/*!****************************!*\
  !*** ./src/ts/js/index.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Player_1 = __importDefault(__webpack_require__(/*! ./Player */ \"./src/ts/js/Player.js\"));\nconst BoardSetup_1 = __importDefault(__webpack_require__(/*! ./BoardSetup */ \"./src/ts/js/BoardSetup.js\"));\nconst Buttons_1 = __webpack_require__(/*! ./Buttons */ \"./src/ts/js/Buttons.js\");\nconst resetButton = document.getElementById(\"reset\");\nconst radomButton = document.getElementById(\"random\");\nconst startButton = document.getElementById(\"start\");\nconst audioButton = document.getElementById(\"audio\");\nresetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener(\"click\", Buttons_1.resetBoard);\nradomButton === null || radomButton === void 0 ? void 0 : radomButton.addEventListener(\"click\", Buttons_1.randomSetup);\nstartButton === null || startButton === void 0 ? void 0 : startButton.addEventListener(\"click\", Buttons_1.startGame);\naudioButton === null || audioButton === void 0 ? void 0 : audioButton.addEventListener(\"click\", Buttons_1.audioToggle);\nconst human = new Player_1.default(false);\nconst computer = new Player_1.default(true);\nconst humanBoard = document.getElementById(\"human--board\");\nconst computerBoard = document.getElementById(\"computer--board\");\nconst computerBoardSetup = new BoardSetup_1.default(computer, computerBoard);\nconst humanBoardSetup = new BoardSetup_1.default(human, humanBoard);\nhuman.setEnemy(computer);\ncomputer.setEnemy(human);\nhumanBoardSetup.addSquares();\ncomputerBoardSetup.addSquares();\ncomputer.randomizeShips();\ncomputerBoardSetup.updateBoard();\nhumanBoardSetup.updateBoard();\nconsole.log(human);\nconsole.log(computer);\n\n\n//# sourceURL=webpack://battleships/./src/ts/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/js/index.js");
/******/ 	
/******/ })()
;