const controlButtons = document.querySelectorAll(".control-button");
const gameState = document.querySelector("game-state");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const musicButton = document.getElementById("music-button");

const soundtrack = document.getElementById("soundtrack");
const meow = document.getElementById("meow");
const purr = document.getElementById("purr");

let catDirection;
let mouseLocation;
let eaten = 0;
let escaped = 0;
let gameImg = document.getElementById("game-image");

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
    if (audio.paused) {
        audio.volume = 0.2;
        audio.play();
        musicButton.innerHTML = "Mute Music & FX";
    } else {
        audio.pause();
        musicButton.innerHTML = "Play Music & FX";
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


/* Take the player's chosen direction and call the computer choice function */
controlButtons.forEach((button => button.addEventListener("click", function () {
    catDirection = button.textContent;
    generateMouseLocation();
    gameState.textContent = checkOutcome();
    checkGameEnd();
})

/* Compare player and computer choices */
/* Determine whether the mouse escaped or was eaten */
/* Alter game image accordingly and increment relevant score */
function checkOutcome(catDirection, mouseLocation) {
        let outcome = "";

        const userPlayImg = `assets/images/cat_${catDirection}_mouse_${mouseLocation}.png`;

        if (catDirection === mouseLocation) {
            eaten++;
            gameImg.src = userPlayImg;
            outcome.gameState.innerHTML = `You pounced ${catDirection} and the mouse chose ${mouseLocation}. Yum yum!`;
            playerScore.innerHTML = eaten;
            function playAudio() {
                purr.play();
            }
        } else {
            escaped++;
            gameImg.src = userPlayImg;
            outcome.gameState.innerHTML = `You pounced ${catDirection} and mouse chose ${mouseLocation}. Better luck next time!`;
            computerScore.innerHTML = escaped;
            function playAudio() {
                meow.play();
            }
        }

        return outcome;
    }

/* Check whether 5 escape attempts have been made. */
function checkGameEnd() {
        if (eaten < 2) {
            gameState.innerHTML = `I'm still hungry ${username}, feed me.`;
            const userPlayImg = "assets/images/cat_still_hungry.png";
            setTimeout(endGame, 3000);
        } else if (eaten >= 2 && eaten <= 4) {
            gameState.innerHTML = `Well done ${username}, I'm almost full.`;
            const userPlayImg = "assets/images/cat_full.png";
            setTimeout(endGame, 3000);
        } else {
            gameState.innerHTML = `Amazing ${username}, I have achieved satiety.`;
            const userPlayImg = "assets/images/cat_eats_mouse.png";
            setTimeout(endGame, 3000);
        }
    };

/* Disable direction buttons when 5 mice have been released */
function endGame() {
    document.getElementById("left").disabled = true;
    document.getElementById("centre").disabled = true;
    document.getElementById("right").disabled = true;
};
