let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let maxRounds = 5;
let gameStarted = false;

const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("result");
const roundDisplay = document.getElementById("round");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const roundSelector = document.getElementById("rounds");
const choiceButtons = document.querySelectorAll(".emoji-btn");

function startGame() {
  maxRounds = parseInt(roundSelector.value);
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  gameStarted = true;

  resultDisplay.innerHTML = "";
  resetBtn.style.display = "none";
  updateRoundDisplay();

  // Enable choice buttons
  choiceButtons.forEach(btn => btn.disabled = false);
}

function playGame(playerChoice) {
  if (!gameStarted || currentRound > maxRounds) return;

  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  playerDisplay.textContent = `PLAYER: ${playerChoice}`;
  computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
  roundDisplay.textContent = `Round ${currentRound} of ${maxRounds}`;

  if (result.includes("Win")) playerScore++;
  else if (result.includes("Lose")) computerScore++;

  currentRound++;

  if (currentRound > maxRounds) {
    showFinalResult();
    resetBtn.style.display = "inline-block";
    gameStarted = false;

    // Disable choice buttons
    choiceButtons.forEach(btn => btn.disabled = true);
  }
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(player, computer) {
  if (player === computer) return "It's a Draw!";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You Win!";
  } else {
    return "You Lose!";
  }
}

function showFinalResult() {
  let finalMessage = "";
  let emoji = "";

  if (playerScore > computerScore) {
    finalMessage = "You Win!";
    emoji = "🎉🔥😎";
  } else if (playerScore < computerScore) {
    finalMessage = "You Lose!";
    emoji = "😢💔👎";
  } else {
    finalMessage = "It's a Draw!";
    emoji = "🤝😐🔄";
  }

  resultDisplay.innerHTML = `<strong style="font-size: 1.5em; color: #ff00cc;">${finalMessage}</strong> ${emoji}`;
}

resetBtn.addEventListener("click", function () {
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  gameStarted = true;

  playerDisplay.textContent = "PLAYER:";
  computerDisplay.textContent = "COMPUTER:";
  resultDisplay.innerHTML = "";
  roundDisplay.textContent = "Round";

  this.style.display = "none";

  // Disable choice buttons until Start is clicked again
  choiceButtons.forEach(btn => btn.disabled = false);
});
