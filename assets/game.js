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

// create the overall 'game' function
function playGame(e) {
    //console.log(e);
    debug.textContent = "Let's Play the Game!";

    // disable the play button and enable the quit button
    playBtn.disabled = true;
    quitBtn.disabled = false;
}

// the quitGame function will clear everything and re-enable the play button
function quitGame(e) {
    debug.textContent = "I quit!";
    // disable the play button and enable the quit button
    playBtn.disabled = false;
    quitBtn.disabled = true;
}
