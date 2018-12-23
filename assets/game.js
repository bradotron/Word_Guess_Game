// grab the gameDiv
var gameDiv = document.getElementById("gameDiv");

// grab the play button
var playBtn = document.getElementById("play-button");
// add a click listener to the play button that starts the game
playBtn.addEventListener("click", playGame);

// grab the quit button
var quitBtn = document.getElementById("quit-button");
// add a listener to the quit button to call the quitGame function
quitBtn.addEventListener("click", quitGame);

var userPrompt = document.getElementById("user-prompt");
var livesDisplay = document.getElementById("lives-display");
var winsDisplay = document.getElementById("wins-display");
var wordDisplay = document.getElementById("word-display");
var lettersGuessed = document.getElementById("letters-guessed");

// global variable to track the number of wins
var numWins = 0;

// tracks the lives, if lives = 0, user loses
var numLives = 0;

// tracks the number of guesses made
var numGuesses = 0;

// this is the word the user needs to guess
var myWord = "";

// this is a message to prompt the user for things
var userMessage = "";

// this array will contain all the letters guessed so far
var guessedLetters = [];

// this string will be what is presented to the user during the game to show progress
var wordProgress = "";

// this will be my random word list:
var wordList = ["potato", "tomato", "pizza", "carrots", "pie", "fudge", "coke"];

// this executes when the play button is pressed. it enters the webpage into the play game state
// essentially a reset button
function playGame(e) {
  // disable the play button and enable the quit button
  playBtn.disabled = true;
  quitBtn.disabled = false;

  // start the game
  startGame();

  updateScreen();

  // add the listener for user keyup inputs
  // the keyUp function will initiate all the game updates; aside from quit, which resets the game
  document.addEventListener("keyup", keyUp, false);
}

// the quitGame function will clear everything and re-enable the play button
function quitGame(e) {
  // set the user Message to default
  userMessage = "Press Play to begin...";
  resetGame();
}

function startGame() {
  // set the lives and wins
  numLives = 5;
  numWins = 0;
  numGuesses = 0;
  guessedLetters = [];
  userMessage = "Guess the word by typing letters..."
  // get a random word
  myWord = getWord();
}

function resetGame() {
  numWins = 0;
  numLives = 5;
  myWord = "";
  guessedLetters = [];

  // disable the play button and enable the quit button
  playBtn.disabled = false;
  quitBtn.disabled = true;
  document.removeEventListener("keyup", keyUp, false);

  // clear the displays
  updateScreen();
}

function updateScreen() {

  if (checkWin()) {
    userWins();
  }
  else if (numLives <= 0) {
    gameOver();
  }
  else {
    //console.log("carry on");
  }




  userPrompt.textContent = userMessage;
  livesDisplay.textContent = numLives;
  winsDisplay.textContent = numWins;

  // update the word progress
  wordDisplay.textContent = updateWordProgress();
  // update the letters guessed display
  lettersGuessed.textContent = updateGuessedLetters();
}


function updateWordProgress() {
  var myText = "";

  for (var i = 0; i < myWord.length; i++) {
    if (isGuessed(myWord[i])) {
      myText += myWord[i] + " ";
    }
    else {
      myText += "_ ";
    }
  }

  return myText;
}

function checkWin() {
  var checking = [];
  var myReturn = true;
  // check the letters in myWord
  // if guessedLetters contains them all, then the user has one

  for (var i = 0; i < myWord.length; i++) {
    if (isGuessed(myWord[i])) {
      checking.push(true);
    }
    else {
      checking.push(false);
    }
  }

  for (var i = 0; i < checking.length; i++) {
    if (checking[i]) {

    }
    else {
      myReturn = false;
    }
  }

  return myReturn;
}

function userWins() {
  console.log("winner");
  userMessage = "Congratulations! Keep on going!";
  numWins++;
  // set the lives and wins
  numLives = 5;
  guessedLetters = [];
  // get a new random word
  myWord = getWord();
}

function gameOver() {
  console.log("game over");
  userMessage = "Game Over! Press Play to start again!"

  // disable the play button and enable the quit button
  playBtn.disabled = false;
  quitBtn.disabled = true;
  document.removeEventListener("keyup", keyUp, false);
}

function updateGuessedLetters() {
  var myText = "";
  for (var i = 0; i < guessedLetters.length; i++) {
    myText += guessedLetters[i] + ", ";
  }
  return myText;
}

function keyUp(e) {
  //console.log("user pressed: " + e.key );
  userGuess(e.key);
}

function userGuess(letter) {
  if (isLetter(letter) && !(isGuessed(letter))) {
    guessedLetters.push(letter);

    if (goodGuess(letter)) {
      userMessage = "Good guess, keep it up!";
    }
    else {
      userMessage = "Woops, keep trying!";
      numLives -= 1;
    }

    updateScreen();
  }
  else {
    // console.log("invalid guess");
  }
}

function goodGuess(letter) {
  var myReturn = false;

  for (var i = 0; i < myWord.length; i++) {
    if (letter == myWord[i]) {
      myReturn = true;
    }
  }

  return myReturn;
}

function isLetter(letter) {
  var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  var myReturn = false;

  for (var i = 0; i < letters.length; i++) {
    if (letter == letters[i]) {
      myReturn = true;
    }
  }

  return myReturn;
}

function isGuessed(letter) {
  var myReturn = false;

  for (var i = 0; i < guessedLetters.length; i++) {
    if (guessedLetters[i] == letter) {
      myReturn = true;
    }
  }

  return myReturn
}

function getWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
