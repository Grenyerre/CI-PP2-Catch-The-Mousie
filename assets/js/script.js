const controlButtons = document.querySelectorAll(".control-button");
const gameState = document.getElementById("game-state");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const musicButton = document.getElementById("music-button");
const userName = document.getElementById("user-name");
const soundtrack = document.getElementById("soundtrack");
const meow = document.getElementById("meow");
const purr = document.getElementById("purr");

let catDirection;
let mouseLocation;
let eaten = 0;
let escaped = 0;
let gameImage = document.getElementById("game-image");

var instructionsBox = document.getElementById("instructions-box");
var instructionsButton = document.getElementById("instructions-button");
let closeInstructionsButton = document.getElementById("close-instructions-button");

let restartButton = document.getElementById("restart-button");

/** Modal box settings - adapted from w3schools.com */
instructionsButton.addEventListener("click", function () {
    instructionsBox.style.display = "block";
});

closeInstructionsButton.addEventListener("click", function () {
    instructionsBox.style.display = "none";
});

window.addEventListener("click", function (e) {
    if (e.target == instructionsBox) {
        instructionsBox.style.display = "none";
    }
});

/* Music & FX settings*/
musicButton.addEventListener("click", function () {
    if (soundtrack.paused) {
        soundtrack.volume = 0.2;
        soundtrack.play();
        musicButton.innerHTML = "Mute Music";
    } else {
        soundtrack.pause();
        musicButton.innerHTML = "Play Music";
    }
});

/* Reset button */
restartButton.addEventListener("click", function () {
    location.reload();
});

/* Generate random number to determine from which hole the mouse appears. */
function generateMouseLocation() {
    const computerChoice = Math.floor(Math.random() * 3);

    switch (computerChoice) {
        case 0:
            mouseLocation = 'left';
            break;
        case 1:
            mouseLocation = 'centre';
            break;
        case 2:
            mouseLocation = 'right';
            break;
    }
}


/* Take the player's chosen direction and the computer's mouse location */
/* Enter choices into checkOutcome function */
controlButtons.forEach((button => button.addEventListener("click", function () {
    catDirection = button.textContent;
    generateMouseLocation();
    checkResult(catDirection, mouseLocation);
})));

function selectGameImage(catDirection, mouseLocation) {

    if (catDirection === centre) && (mouseLocation === centre) {
        let gameImage = "assets/images/cat_centre_mouse_centre.png;;;
    } else if (catDirection === left) && (mouseLocation === left) {
        let gameImage = "assets/images/cat_left_mouse_left.png;;;
    } else if (catDirection === right) && (mouseLocation === right) {
        let gameImage = "assets/images/cat_right_mouse_right.png;;;
    } else if (catDirection === centre) && (mouseLocation === left) {
        let gameImage = "assets/images/cat_centre_mouse_left.png;;;;
    } else if (catDirection === centre) && (mouseLocation === right) {
        let gameImage = "assets/images/cat_centre_mouse_right.png;;;;
    } else if (catDirection === left) && (mouseLocation === centre) {
        let gameImage = "assets/images/cat_left_mouse_centre.png;;;
    } else if (catDirection === left) && (mouseLocation === right) {
        let gameImage = "assets/images/cat_left_mouse_centre.png;;;;
    } else if (catDirection === right) && (mouseLocation === centre) {
        let gameImage = "assets/images/cat_right_mouse_centre.png;;;;
    } else (catDirection === right) && (mouseLocation === left) {
        let gameImage = "assets/images/cat_right_mouse_left.png;;;
    }


    /* Compare player and computer choices */
    /* Determine whether the mouse escaped or was eaten */
    /* Alter game image accordingly and increment relevant score */
    function checkResult(catDirection, mouseLocation) {
        let outcome = "";

        /*let gameImage = `assets/images/cat_${catDirection}_mouse_${mouseLocation}.png`;
                    gameImage.src = gameImage; */

        function selectGameImage();

        if (catDirection === mouseLocation) {
            eaten++;
            outcome = `You pounced ${catDirection} and the mouse chose ${mouseLocation}. Yum yum!`;
            gameState.innerHTML = outcome;
            playerScore.innerHTML = eaten;
            purr.loop = false;
            purr.play();
        } else {
            escaped++;
            outcome = `You pounced ${catDirection} and mouse chose ${mouseLocation}. Better luck next time!`;
            gameState.innerHTML = outcome;
            computerScore.innerHTML = escaped;
            meow.loop = false;
            meow.play();
        }

        return outcome;
    }

    /* Check whether 5 escape attempts have been made. */
    function checkGameEnd() {
        if (escaped == 5) {
            gameState.innerHTML = `${userName} is still hungry, feed me.`;
            const userPlayImg = "assets/images/cat_still_hungry.png";
            setTimeout(endGame, 3000);
        } else if (escaped == 4 && eaten == 1 || escaped == 3 && eaten == 2 || escaped == 2 && eaten == 3) {
            gameState.innerHTML = `Well done ${userName}, you're almost full.`;
            const userPlayImg = "assets/images/cat_full.png";
            setTimeout(endGame, 3000);
        } else {
            gameState.innerHTML = `Amazing ${userName}, you have achieved satiety.`;
            const userPlayImg = "assets/images/cat_eats_mouse.png";
            setTimeout(endGame, 3000);
        }
    };

    /* Disable direction buttons when 5 mice have been released */
    function endGame() {
        document.getElementById("left").disabled = true;
        document.getElementById("centre").disabled = true;
        document.getElementById("right").disabled = true;

        gameState.innerHTML = `${userName}, if you want to play again, please press 'Restart Game'`;
    }
