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
var wordList = ["potato", "tomato", "pizza", "carrots", "pie", "fudge", "coke", "ghost"];

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

function setVariableDefaults() {
  numLives = 5;
  numWins = 0;
  numGuesses = 0;
  guessedLetters = [];
}

function startGame() {
  // set the lives and wins
  setVariableDefaults();
  userMessage = "Guess the word by typing letters..."
  // get a random word
  myWord = getWord();
}

function resetGame() {
  setVariableDefaults();

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
  var keyCode = e.keyCode;
  // keyCode map
  switch(keyCode) {
    case 65:
    userGuess("a");
    break;
    case 66:
    userGuess("b");
    break;
    case 67:
    userGuess("c");
    break;
    case 68:
    userGuess("d");
    break;
    case 69:
    userGuess("e");
    break;
    case 70:
    userGuess("f");
    break;
    case 71:
    userGuess("g");
    break;
    case 72:
    userGuess("h");
    break;
    case 73:
    userGuess("i");
    break;
    case 74:
    userGuess("j");
    break;
    case 75:
    userGuess("k");
    break;
    case 76:
    userGuess("l");
    break;
    case 77:
    userGuess("m");
    break;
    case 78:
    userGuess("n");
    break;
    case 79:
    userGuess("o");
    break;
    case 80:
    userGuess("p");
    break;
    case 81:
    userGuess("q");
    break;
    case 82:
    userGuess("r");
    break;
    case 83:
    userGuess("s");
    break;
    case 84:
    userGuess("t");
    break;
    case 85:
    userGuess("u");
    break;
    case 86:
    userGuess("v");
    break;
    case 87:
    userGuess("w");
    break;
    case 88:
    userGuess("x");
    break;
    case 89:
    userGuess("y");
    break;
    case 90:
    userGuess("z");
    break;

    default:
    // not a letter guess; do nothing
  }
}

function userGuess(letter) {
  if (!(isGuessed(letter))) {
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
