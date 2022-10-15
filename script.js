"use strict";
//Selecting Elements
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const player1Score = document.querySelector("#score--0");
const player2Score = document.querySelector("#score--1");
const player1CurrentScore = document.querySelector("#current--0");
const player2CurrentScore = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");

let scores, currentScore, activePlayer, playing;

const init = function () {
  //Starting Conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //set all scores to 0
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  playing = true;
  diceEl.classList.add("hidden");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  
  //player 1 as active player
  player1.classList.add("player--active");

  player2.classList.remove("player--active");
};
init()

//Function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generate Random dice roll
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    console.log(diceRoll);
    //Render results
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRoll}.png`;
    //if diceRoll!==1

    if (diceRoll !== 1) {
      //Add dice roll to current score
      currentScore += diceRoll;
      // player1CurrentScore.textContent=currentScore
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    //set current score to 0
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //render current score on total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //if total score>100, player wins
    if (scores[activePlayer] >= 100) {
      //finish the game(player wins)
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", init);
