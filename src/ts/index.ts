import Player from "./Player";
import GameFlow from "./GameFlow";
import BoardSetup from "./BoardSetup";
import TextControl from "./TextControl";
import AudioControl from "./AudioControl";
const human = new Player(false);
const computer = new Player(true);
const humanBoard: HTMLElement = document.getElementById("human--board")!;
const computerBoard: HTMLElement = document.getElementById("computer--board")!;
const audioControl = new AudioControl();
const computerBoardSetup = new BoardSetup(computer, computerBoard,audioControl);
const humanBoardSetup = new BoardSetup(human, humanBoard,audioControl);
const textControl = new TextControl();
const gameFlow = new GameFlow(
  human,
  humanBoardSetup,
  computer,
  textControl,
  audioControl
);
human.setAudioControl(audioControl);
human.setGameFlow(gameFlow);
computer.setGameFlow(gameFlow);

const resetButton = document.getElementById("reset")!;
const radomButton = document.getElementById("random")!;
const startButton = document.getElementById("start")!;
const audioButton = document.getElementById("audio")!;
const audioIcon = document.getElementById("audioIcon")!;
const restartButton = document.getElementById("restart")!;

radomButton?.addEventListener("click", () => {
  humanBoardSetup.randomSetup();
  audioControl.playClickSound()
});
resetButton?.addEventListener("click", () => {
  humanBoardSetup.reset();
  audioControl.playClickSound()

});
startButton?.addEventListener("click", () => {
  if (humanBoardSetup.canStart()) {
  audioControl.playClickSound()

    gameFlow.beginBattle();
  } else {
    audioControl.playErrorSound();
  }
});
restartButton.addEventListener("click", () => {
  gameFlow.restartGame();
  humanBoardSetup.reset();
  human.resetGameboard();
  human.updateBoard();
  computer.resetGameboard();
  computer.randomizeShips();
  computer.updateBoard();
});
const audioToggle = () => {
  audioControl.toggleMute();
  let text = "";
  if (audioControl.isMuted) {
    text = "audio off";
  } else {
    text = "audio on";
  }
  audioButton.innerHTML = text;
  audioIcon.innerText = text;
  audioButton.classList.toggle("muted");
  audioIcon.classList.toggle("muted");
};
audioButton?.addEventListener("click", audioToggle);
audioIcon?.addEventListener("click", audioToggle);
gameFlow.inittializeBoard();
humanBoardSetup.addSquares();
computerBoardSetup.addSquares();
computer.randomizeShips();
humanBoardSetup.updateBoard();

// animatedGameText.typeTips()
