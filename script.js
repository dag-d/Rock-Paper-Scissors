let playerScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("result");
const roundDisplay = document.getElementById("round");
const restartBtn = document.getElementById("restart");

function playGame(playerChoice) {
  if (round > maxRounds) return;

  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  playerDisplay.textContent = `PLAYER: ${playerChoice}`;
  computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
  resultDisplay.textContent = result;
  roundDisplay.textContent = `Round ${round} of ${maxRounds}`;

  if (result.includes("Win")) playerScore++;
  else if (result.includes("Lose")) computerScore++;

  round++;

  if (round > maxRounds) {
    showFinalResult();
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

function showfinalResult(result) {
  const resultDisplay = document.getElementById("result");
  let emoji = "";

  if (result === "You Win!") {
    emoji = "🎉🔥😎";
  } else if (result === "You Lose!") {
    emoji = "😢💔👎";
  } else {
    emoji = "🤝😐🔄";
  }

  resultDisplay.innerHTML = `<strong style="font-size: 1.5em; color: #ff00cc;">${result}</strong> ${emoji}`;
}

restartBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  playerDisplay.textContent = "PLAYER:";
  computerDisplay.textContent = "COMPUTER:";
  resultDisplay.textContent = "";
  roundDisplay.textContent = "Round";
});
