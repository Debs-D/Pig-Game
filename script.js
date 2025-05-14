"use strict";

const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");
const scoreOne = document.getElementById("score--0");
const scoreTwo = document.getElementById("score--1");
const currentPlOne = document.getElementById("current--0");
const currentPlTwo = document.getElementById("current--1");
const dice = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores;
let activePlayer;
let currentScore;
let playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  currentPlOne.textContent = 0;
  currentPlTwo.textContent = 0;
  dice.classList.add("hidden");

  playerOne.classList.remove("player--winner", "player--active");
  playerTwo.classList.remove("player--winner", "player--active");

  playerOne.classList.add("player--active");
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle("player--active");
  playerTwo.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generate random number
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // Display dice roll
    dice.classList.remove("hidden");
    dice.src = `./images/dice-${randomDice}.png`;

    // Check if rolled 1
    if (randomDice !== 1) {
      // Add to current score
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to total
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player won
    if (scores[activePlayer] >= 10) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  init();
});
