const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.getElementById('dice');
const btnNew = document.getElementById('btn-new-game');
const btnRoll = document.getElementById('btn-roll');
const btnHold = document.getElementById('btn-hold');

let scores, currentScore, activePlayer, playing, rollInterval;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.style.display = 'none';

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Clear any existing interval when resetting the game
  if (rollInterval) {
    clearInterval(rollInterval);
    rollInterval = null;
  }
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  switch (activePlayer) {
    case 0:
      activePlayer = 1;
      break;
    case 1:
      activePlayer = 0;
      break;
  }

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function rollDice() {
  if (playing) {
    const dice = Math.trunc(Math.random() * 4) + 1;
    diceEl.style.display = 'block';
    diceEl.src = `die${dice}.jpg`;

    switch (dice) {
      case 1:
        switchPlayer();
        break;
      default:
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        break;
    }
  }
}

function startRolling() {
  if (playing && !rollInterval) {
    rollDice(); // Roll immediately
    rollInterval = setInterval(rollDice, 3000); // Continue rolling every 3 seconds
  }
}

btnRoll.addEventListener('click', function () {
  switch (playing) {
    case true:
      startRolling();
      break;
    default:
      break;
  }
});

btnHold.addEventListener('click', function () {
  switch (playing) {
    case true:
      // Stop the rolling interval when hold is pressed
      if (rollInterval) {
        clearInterval(rollInterval);
        rollInterval = null;
      }
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

      switch (true) {
        case scores[activePlayer] >= 20:
          playing = false;
          diceEl.style.display = 'none';
          document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
          document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
          break;
        default:
          switchPlayer();
          startRolling(); // Automatically start rolling for the next player
          break;
      }
      break;
    default:
      break;
  }
});

btnNew.addEventListener('click', init);