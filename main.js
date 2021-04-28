(()=>{"use strict";var t={53:function(t,s,i){var e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(s,"__esModule",{value:!0});const o=e(i(411));class n{constructor(){this.afloat=[],this.sunk=[]}addAfloat(t){this.afloat.push(t)}addSunk(t){this.sunk.push(t);const s=this.afloat.indexOf(t);this.afloat.splice(s,1)}}s.default=class{constructor(){this.boardPositions=this.setPoints(),this.ships=[],this.shipState=new n}setPoints(){const t=[];for(let s=0;s<100;s++)t.push({isHit:!1,position:s,ship:void 0});return t}placeShip(t){this.ships.push(t);const s=t.startPosition,i=t.endPosition;if(i-s<10)for(let e=s;e<=i;e++)this.boardPositions[e].ship=t,this.shipState.addAfloat(e);else for(let e=s;e<=i;e+=10)this.shipState.addAfloat(e),this.boardPositions[e].ship=t}tryToPlaceShip(t,s){const i=new o.default(t,s);return!!this.checkIfShipCanBePlaced(i)&&(this.placeShip(i),!0)}checkIfShipCanBePlaced(t){let s=!0;const i=this.getPositionsToCheck(t);for(const t of i)this.checkPosition(t)&&(s=!1);return s}getPositionsToCheck(t){let s=[];for(const i of t.hull)s=s.concat(this.positionsToCheck(i.position));return[...new Set(s)]}checkPosition(t){return void 0!==this.getPosition(t).ship}positionsToCheck(t){const s=[];return t%10!=9&&(s.push(t+1),s.push(t-9),s.push(t+11)),t%10!=0&&(s.push(t-1),s.push(t-11),s.push(t+9)),t>10&&s.push(t-10),t<89&&s.push(t+10),s}isPositionHit(t){return!!this.boardPositions[t].isHit}getPosition(t){return console.log(this.boardPositions[t]),this.boardPositions[t]}recieveAttack(t){var s,i;return null===this.boardPositions[t].ship?(null===(s=this.boardPositions[t].ship)||void 0===s||s.receiveHit(t),!1):(this.boardPositions[t].isHit=!0,null===(i=this.boardPositions[t].ship)||void 0===i||i.receiveHit(t),!0)}areShipsSunk(){for(const t of this.ships)if(!t.isSunk())return!1;return!0}}},878:function(t,s,i){var e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(s,"__esModule",{value:!0});const o=e(i(53));s.default=class{constructor(t){this.isComputer=t,this.gameboard=new o.default,this.enemy=null}setShip(t,s){this.gameboard.tryToPlaceShip(t,s)}setEnemy(t){this.enemy=t}hasLost(){return this.gameboard.areShipsSunk()}recieveAttack(t){this.gameboard.recieveAttack(t)}beginAttack(t){var s;null===(s=this.enemy)||void 0===s||s.recieveAttack(t)}choosePositionToAttack(t){var s;(null===(s=this.enemy)||void 0===s?void 0:s.gameboard.isPositionHit(t))&&this.beginAttack(t)}takeAction(){this.isComputer}getSunk(){return this.gameboard.shipState.sunk}getAfloat(){return this.gameboard.shipState.afloat}humanAction(){}computerAction(){}}},411:(t,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.default=class{constructor(t,s){this.length=this.setLength(t,s),this.hull=this.setHull(this.length,t,s),this.startPosition=t,this.endPosition=s}setHull(t,s,i){const e=[];if(i-s<10)for(let i=0;i<t;i++)e.push({isHit:!1,position:s+i});else for(let i=0;i<t;i++)e.push({isHit:!1,position:s+10*i});return e}setLength(t,s){return s-t<10?s-t+1:(s-t)/10+1}receiveHit(t){this.getPoint(t).isHit=!0}getPoint(t){for(const s of this.hull)if(s.position==t)return s;return this.hull[0]}isSunk(){for(const t of this.hull)if(!t.isHit)return!1;return!0}}},880:function(t,s,i){var e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(s,"__esModule",{value:!0});const o=e(i(878)),n=new o.default(!1),r=new o.default(!0),h=document.getElementById("human--board"),a=document.getElementById("computer--board"),u=(t,s)=>{let i="";i=s.isComputer?"com_":"hum_";for(let s=0;s<100;s++){const e=document.createElement("div");e.className="game-square",e.id=i+s,t.appendChild(e)}},l=t=>{const s=t.getAfloat();let i="";i=t.isComputer?"com_":"hum_",console.log(i);for(const t of s){const s=document.getElementById(i+t);null==s||s.classList.add("ship--afloat")}};u(h,n),u(a,r),n.setEnemy(r),r.setEnemy(n),n.setShip(12,42),n.setShip(65,69),n.setShip(81,84),n.setShip(18,38),r.setShip(12,42),r.setShip(65,69),r.setShip(81,84),r.setShip(18,38),l(n),l(r)}},s={};!function i(e){var o=s[e];if(void 0!==o)return o.exports;var n=s[e]={exports:{}};return t[e].call(n.exports,n,n.exports,i),n.exports}(880)})();