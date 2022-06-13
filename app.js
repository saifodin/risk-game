/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var panelPlayerOne = document.querySelector(".player-0-panel");
var panelPlayerTwo = document.querySelector(".player-1-panel");

var namePlayOne = document.querySelector("#name-0");
var namePlayTwo = document.querySelector("#name-1");

var btnRoll = document.querySelector(".btn-roll");
var btnHold = document.querySelector(".btn-hold");
var btnNew = document.querySelector(".btn-new");
var imgDice = document.querySelector(".dice");

var boardScoreOne = document.querySelector("#score-0");
var boardScoreTwo = document.querySelector("#score-1");
var boardRoundOne = document.querySelector("#current-0");
var boardRoundTwo = document.querySelector("#current-1");

var isPlayerOne = true;
var roundScore = 0;
var scoreOne = 0
var scoreTwo = 0;
var isGameEnd = 0;

function changeRoundScore(_dicNum) {
  if (_dicNum == 1) {
    roundScore = 0;
    changeBoards();
    changePlayer();
    imgDice.style.display = "none";
  }
  else {
    roundScore += _dicNum
  }
}

function changeBoards() {
  if (isPlayerOne) {
    boardScoreOne.textContent = scoreOne;
    boardRoundOne.textContent = roundScore;
  } else {
    boardScoreTwo.textContent = scoreTwo;
    boardRoundTwo.textContent = roundScore;
  }
}

function roundInScore() {
  if (isPlayerOne)
    scoreOne += roundScore;
  else
    scoreTwo += roundScore;
  roundScore = 0;
  imgDice.style.display = "none";
  if (scoreOne >= 10 || scoreTwo >= 10) {
    return "foundWinner";
  }
}

function changePlayer() {
  isPlayerOne = !isPlayerOne;
  panelPlayerOne.classList.toggle("active");
  panelPlayerTwo.classList.toggle("active");
}

function foundWinner() {
  if (scoreOne >= 10) {
    namePlayOne.textContent = "WINNER!";
    namePlayOne.classList.add("playerWin");
    panelPlayerOne.classList.add("winner");
  }
  else {
    namePlayTwo.textContent = "WINNER!";
    namePlayTwo.classList.add("playerWin");
    panelPlayerTwo.classList.add("winner");
  }
  panelPlayerOne.classList.remove("active");
  panelPlayerTwo.classList.remove("active");
}

function startNewGame() {
  isPlayerOne = true;
  roundScore = 0;
  scoreOne = 0, scoreTwo = 0;
  isGameEnd = 0;
  imgDice.style.display = "none";
  boardScoreTwo.textContent = scoreTwo;

  namePlayOne.textContent = "PLAYER 1";
  namePlayOne.classList.remove("playerWin");
  panelPlayerOne.classList.remove("winner");

  namePlayTwo.textContent = "PLAYER 2";
  namePlayTwo.classList.remove("playerWin");
  panelPlayerTwo.classList.remove("winner");
  panelPlayerTwo.classList.remove("active");


  panelPlayerOne.classList.add("active");
  changeBoards();
}

imgDice.style.display = "none";
boardScoreTwo.textContent = scoreTwo;
changeBoards();

btnRoll.addEventListener("click", function () {
  if (!isGameEnd) {
    var dicNum = Math.floor(Math.random() * 6) + 1;
    imgDice.style.display = "inline";
    imgDice.src = `dice-${dicNum}.png`;
    changeRoundScore(dicNum);
    changeBoards();
  }
  else {
    startNewGame();
  }

})

btnHold.addEventListener("click", function () {
  if (!isGameEnd) {
    if (roundInScore() == "foundWinner") {
      isGameEnd = 1;
    }
    roundInScore();
    changeBoards();
    changePlayer();
    if (isGameEnd) {
      foundWinner();
    }
  }
  else {
    startNewGame();
  }
})

btnNew.addEventListener("click", function () {
  startNewGame();
})