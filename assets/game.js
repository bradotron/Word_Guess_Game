// a div to output some debugg and test messages to
var debug = document.getElementById("debugger");
//debug.textContent = "test";

// grab the play button
var playBtn = document.getElementById("play-button");
// add a click listener to the play button that starts the game
playBtn.addEventListener("click", playGame);

// grab the quit button
var quitBtn = document.getElementById("quit-button");
// add a listener to the quit button to call the quitGame function
quitBtn.addEventListener("click", quitGame);

// global variable to track the number of wins
var numWins = 0;

// this will be my random word list:
var wordList = ["potato", "tomato", "pizza", "carrots", "pie", "fudge", "coke"];

// create the overall 'game' function
function playGame(e) {
  // disable the play button and enable the quit button
  playBtn.disabled = true;
  quitBtn.disabled = false;

  //console.log(e);
  //debug.textContent = "Let's Play the Game!";

  // set a number of guesses allowed and show the user how many they have remaining
  var numLives = 5; // or some higher number?

  var gameOver = false;

  // start the game loop here
  while (!gameOver) {
    if (wordGuess()) {
      // the user won
      numWins++;
      // update the displays
    } else {
      // the user lost
      numLives--;
      if (numLives == 0) {
        //game over
        gameOver = true;
      } else {
        //
      }
    }
  }
}

// the quitGame function will clear everything and re-enable the play button
function quitGame(e) {
  // disable the play button and enable the quit button
  playBtn.disabled = false;
  quitBtn.disabled = true;

  //debug.textContent = "I quit!";
  // do clean up to reset the game
}

function wordGuess() {
  //console.log("wordGuess()");
  //initialize the return variable to false
  var win = false;

  // track the total number of guesses
  var numGuesses = 0;

  // return a boolean of win = true/false
  return win;
}
