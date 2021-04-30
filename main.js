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

/***/ "./build/BoardState.js":
/*!*****************************!*\
  !*** ./build/BoardState.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass BoardState {\n    constructor() {\n        this.positions = this.initalSetup();\n        this.afloat = [];\n        this.sunk = [];\n        this.hit = [];\n        this.miss = [];\n        this.unplacable = [];\n    }\n    initalSetup() {\n        const ret = [];\n        for (let i = 0; i < 100; i++) {\n            ret.push({ isHit: false, position: i, ship: undefined, canPlace: true });\n        }\n        return ret;\n    }\n    addShip(ship) {\n        for (const point of ship.hull) {\n            this.positions[point.position].ship = ship;\n            this.positions[point.position].canPlace = false;\n            this.afloat.push(point.position);\n        }\n        let combinedUnplaceable = this.unplacable\n            .concat(ship.adjecentPositions)\n            .concat(this.afloat)\n            .concat(this.sunk);\n        this.unplacable = [...new Set(combinedUnplaceable)];\n        for (const x of this.unplacable) {\n            this.positions[x].canPlace = false;\n        }\n        console.log(this.unplacable, \"dont place here\", this.positions);\n    }\n    numbersFromPositions(arr) {\n        const ret = [];\n        for (const num of arr) {\n            ret.push(num.position);\n        }\n        return ret;\n    }\n    postionsFromNumbers(arr) {\n        const ret = [];\n        for (const num of arr) {\n            ret.push(this.positions[num]);\n        }\n        return ret;\n    }\n    setHit(position) {\n        if (typeof position === \"number\") {\n            this.addToHitList(position);\n        }\n        else {\n            for (const num of position) {\n                this.addToHitList(num);\n            }\n        }\n    }\n    addToHitList(position) {\n        this.positions[position].isHit = true;\n        this.hit.push(position);\n        if (this.positions[position].ship === undefined) {\n            this.miss.push(position);\n        }\n        else {\n            this.hit.push(position);\n        }\n    }\n    isHit(position) {\n        return this.positions[position].isHit ? true : false;\n    }\n    checkCanBePlaced(ship) {\n        for (const x of ship.hull) {\n            if (this.unplacable.indexOf(x.position) !== -1) {\n                console.log(x.position, this.unplacable.indexOf(x.position), \"fail\");\n                return false;\n            }\n        }\n        return true;\n    }\n    getSunk() { }\n    getAfloat() { }\n}\nexports.default = BoardState;\n\n\n//# sourceURL=webpack://battleships/./build/BoardState.js?");

/***/ }),

/***/ "./build/Gameboard.js":
/*!****************************!*\
  !*** ./build/Gameboard.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Ship_1 = __importDefault(__webpack_require__(/*! ./Ship */ \"./build/Ship.js\"));\nconst BoardState_1 = __importDefault(__webpack_require__(/*! ./BoardState */ \"./build/BoardState.js\"));\nclass Gameboard {\n    constructor() {\n        this.ships = [];\n        this.boardState = new BoardState_1.default();\n        this.shipsSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];\n        // this.shipsSizes = [3,2,1];\n    }\n    resetGameboard() {\n        this.ships = [];\n        this.boardState = new BoardState_1.default();\n    }\n    areShipsSunk() {\n        for (const ship of this.ships) {\n            if (!ship.isSunk()) {\n                return false;\n            }\n        }\n        return true;\n    }\n    finishPlacingShip(createdShip) {\n        this.ships.push(createdShip);\n        this.boardState.addShip(createdShip);\n    }\n    tryToPlaceShip(startPosistion, endPosistion) {\n        const createdShip = new Ship_1.default(startPosistion, endPosistion);\n        // horizontal\n        if (this.boardState.checkCanBePlaced(createdShip)) {\n            this.finishPlacingShip(createdShip);\n            return true;\n        }\n        else {\n            return false;\n        }\n    }\n    isPositionHit(positon) {\n        return this.boardState.isHit(positon);\n    }\n    getPosition(posistion) {\n        return this.boardState.positions[posistion];\n    }\n    recieveAttack(posistion) {\n        var _a, _b;\n        if (this.getPosition(posistion).ship === null) {\n            (_a = this.getPosition(posistion).ship) === null || _a === void 0 ? void 0 : _a.receiveHit(posistion);\n            return false;\n        }\n        else {\n            this.getPosition(posistion).isHit = true;\n            (_b = this.getPosition(posistion).ship) === null || _b === void 0 ? void 0 : _b.receiveHit(posistion);\n            return true;\n        }\n    }\n    randomShipSetup() {\n        this.resetGameboard();\n        this.shipsSizes.forEach((length) => {\n            this.createRadnomShip(length);\n        });\n    }\n    createRadnomShip(lenght) {\n        while (true) {\n            if (this.randomBinary()) {\n                if (this.randomVerticalShip(lenght)) {\n                    break;\n                }\n            }\n            else {\n                // if (this.randomHorizontalShip(lenght)) {\n                //   break;\n                // }\n                if (this.randomVerticalShip(lenght)) {\n                    break;\n                }\n            }\n            // break;\n        }\n    }\n    getValidHorizontalStarts(row, length) {\n        const possibleStarts = [];\n        for (let i = row; i < row + 10 - length; i++) {\n            let canInsert = true;\n            for (let j = i; j < row + 10; j++) {\n                if (!this.boardState.positions[j].canPlace) {\n                    canInsert = false;\n                    break;\n                }\n            }\n            if (canInsert) {\n                possibleStarts.push(i);\n            }\n            break;\n        }\n        // console.log(possibleStarts, row, length);\n        return possibleStarts;\n    }\n    randomHorizontalShip(length) {\n        let randomRow = 0;\n        let validStarts = [];\n        randomRow = Math.floor(Math.random() * 10) * 10;\n        validStarts = this.getValidHorizontalStarts(randomRow, length);\n        if (validStarts.length !== 0) {\n            // there are possible postions\n            const randomStart = validStarts[Math.floor(Math.random() * validStarts.length)];\n            const newShip = new Ship_1.default(randomStart, randomStart + length - 1);\n            this.finishPlacingShip(newShip);\n            return true;\n        }\n        return false;\n    }\n    getValidVerticalStarts(column, length) {\n        const possibleStarts = [];\n        // i = ilosc powtorzen gornej perli  11-l\n        console.log(\"kolumna\", column);\n        for (let i = 0; i < 11 - length; i++) {\n            let canInsert = true;\n            for (let j = 0; j < length; j++) {\n                // j == fieds to check\n                // l = ilosc do sprawdzenia za kazdym razem\n                if (!this.boardState.positions[(i + j) * 10 + column].canPlace) {\n                    canInsert = false;\n                    break;\n                }\n                console.log(this.boardState.positions[(i + j) * 10 + column]);\n            }\n            if (canInsert) {\n                possibleStarts.push(i * 10 + column);\n            }\n        }\n        // possibleStarts.push(2)\n        console.log(possibleStarts, column, length);\n        return possibleStarts;\n    }\n    randomVerticalShip(length) {\n        const randomColumn = Math.floor(Math.random() * 10);\n        // 0 9\n        const validStarts = this.getValidVerticalStarts(randomColumn, length);\n        if (validStarts.length !== 0) {\n            const randomStart = validStarts[Math.floor(Math.random() * validStarts.length)];\n            const newShip = new Ship_1.default(randomStart, randomStart + (length - 1) * 10);\n            console.log(\"srodek\", newShip);\n            if (this.boardState.checkCanBePlaced(newShip)) {\n                console.log(randomColumn, validStarts, newShip, randomStart, \"err\");\n                this.finishPlacingShip(newShip);\n                return true;\n            }\n        }\n        return false;\n    }\n    randomBinary() {\n        let random = Math.round(Math.random());\n        return random === 0 ? false : true;\n    }\n}\nexports.default = Gameboard;\n\n\n//# sourceURL=webpack://battleships/./build/Gameboard.js?");

/***/ }),

/***/ "./build/Player.js":
/*!*************************!*\
  !*** ./build/Player.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Gameboard_1 = __importDefault(__webpack_require__(/*! ./Gameboard */ \"./build/Gameboard.js\"));\nclass Player {\n    constructor(isCoomputer) {\n        this.isComputer = isCoomputer;\n        this.gameboard = new Gameboard_1.default();\n        this.enemy = null;\n    }\n    resetGameboard() {\n        this.gameboard.resetGameboard();\n    }\n    setShip(startPosistion, endPosistion) {\n        this.gameboard.tryToPlaceShip(startPosistion, endPosistion);\n    }\n    setEnemy(enemy) {\n        this.enemy = enemy;\n    }\n    hasLost() {\n        return this.gameboard.areShipsSunk();\n    }\n    recieveAttack(posistion) {\n        this.gameboard.recieveAttack(posistion);\n    }\n    randomizeShips() {\n        this.gameboard.randomShipSetup();\n    }\n    beginAttack(posistion) {\n        var _a;\n        const hasHit = (_a = this.enemy) === null || _a === void 0 ? void 0 : _a.recieveAttack(posistion);\n        // ai should do something wit that info   \n    }\n    choosePositionToAttack(posistion) {\n        var _a;\n        if ((_a = this.enemy) === null || _a === void 0 ? void 0 : _a.gameboard.isPositionHit(posistion)) {\n            this.beginAttack(posistion);\n        }\n        else {\n            //\n        }\n    }\n    takeAction() {\n        if (this.isComputer) {\n            //\n        }\n        else {\n            //\n        }\n    }\n    getSunk() {\n        return this.gameboard.boardState.sunk;\n    }\n    getAfloat() {\n        return this.gameboard.boardState.afloat;\n    }\n    humanAction() { }\n    computerAction() { }\n}\nexports.default = Player;\n\n\n//# sourceURL=webpack://battleships/./build/Player.js?");

/***/ }),

/***/ "./build/Ship.js":
/*!***********************!*\
  !*** ./build/Ship.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Ship {\n    constructor(startPosition, endPosition) {\n        this.length = this.setLength(startPosition, endPosition);\n        this.hull = this.setHull(this.length, startPosition, endPosition);\n        this.startPosition = startPosition;\n        this.endPosition = endPosition;\n        this.adjecentPositions = this.setAdjecentPositions(this.hull);\n    }\n    setHull(length, startPosition, endPosition) {\n        //  eP - sP is smaller than 10? then it is horizontal\n        const hull = [];\n        if (endPosition - startPosition < 10) {\n            for (let i = 0; i < length; i++) {\n                hull.push({ isHit: false, position: startPosition + i });\n            }\n        }\n        else {\n            for (let i = 0; i < length; i++) {\n                hull.push({ isHit: false, position: startPosition + i * 10 });\n            }\n        }\n        return hull;\n    }\n    setAdjecentPositions(hull) {\n        let positionsToCheck = [];\n        for (const point of hull) {\n            positionsToCheck = positionsToCheck.concat(this.getAdjecentToPosition(point.position));\n        }\n        return [...new Set(positionsToCheck)];\n    }\n    getAdjecentToPosition(position) {\n        const positions = [position];\n        if (position % 10 !== 9) {\n            positions.push(position + 1);\n            if (position > 9) {\n                positions.push(position - 9);\n            }\n            if (position < 90) {\n                positions.push(position + 11);\n            }\n        }\n        if (position % 10 !== 0) {\n            positions.push(position - 1);\n            if (position > 9) {\n                positions.push(position - 11);\n            }\n            if (position < 90) {\n                positions.push(position + 9);\n            }\n        }\n        if (position > 10) {\n            positions.push(position - 10);\n        }\n        if (position < 90) {\n            positions.push(position + 10);\n        }\n        return positions;\n    }\n    setLength(startPosition, endPosition) {\n        if (endPosition - startPosition < 10) {\n            //horizotnal\n            return endPosition - startPosition + 1;\n        }\n        else {\n            return (endPosition - startPosition) / 10 + 1;\n        }\n    }\n    receiveHit(hitPosition) {\n        this.getPoint(hitPosition).isHit = true;\n    }\n    getPoint(posistion) {\n        for (const point of this.hull) {\n            if (point.position == posistion) {\n                return point;\n            }\n        }\n        return this.hull[0];\n    }\n    isSunk() {\n        for (const point of this.hull) {\n            if (!point.isHit) {\n                return false;\n            }\n        }\n        return true;\n    }\n}\nexports.default = Ship;\n\n\n//# sourceURL=webpack://battleships/./build/Ship.js?");

/***/ }),

/***/ "./build/index.js":
/*!************************!*\
  !*** ./build/index.js ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Player_1 = __importDefault(__webpack_require__(/*! ./Player */ \"./build/Player.js\"));\nconst human = new Player_1.default(false);\nconst computer = new Player_1.default(true);\nconst humanBoard = document.getElementById(\"human--board\");\nconst computerBoard = document.getElementById(\"computer--board\");\nconst addOneHundredDivs = (parent, player) => {\n    let suffix = \"\";\n    suffix = player.isComputer ? \"com_\" : \"hum_\";\n    for (let i = 0; i < 100; i++) {\n        const newDiv = document.createElement(\"div\");\n        newDiv.className = \"game-square\";\n        newDiv.id = suffix + i;\n        parent.appendChild(newDiv);\n    }\n};\nconst updateBoard = (player) => {\n    const shipsAfloat = player.getAfloat();\n    let suffix = \"\";\n    suffix = player.isComputer ? \"com_\" : \"hum_\";\n    console.log(suffix);\n    for (const point of shipsAfloat) {\n        const afloat = document.getElementById(suffix + point);\n        afloat === null || afloat === void 0 ? void 0 : afloat.classList.add(\"ship--afloat\");\n    }\n};\naddOneHundredDivs(humanBoard, human);\naddOneHundredDivs(computerBoard, computer);\nhuman.setEnemy(computer);\ncomputer.setEnemy(human);\n// setting ships\n// human.setShip(12, 42)\n// human.setShip(65, 69);\n// human.setShip(81, 84);\n// human.setShip(18, 38);\n// computer.setShip(12, 42)\n// computer.setShip(65, 69);\n// computer.setShip(18, 38);\nhuman.randomizeShips();\n// computer.randomizeShips()\nupdateBoard(human);\nupdateBoard(computer);\nconsole.log(human.gameboard);\n// console.log(human);\n// console.log(computer);\n\n\n//# sourceURL=webpack://battleships/./build/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./build/index.js");
/******/ 	
/******/ })()
;