const controlButtons = document.querySelectorAll(".control-button");
const gameState = document.querySelector("#gameState");
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');
const musicButton = document.getElementById('music-button');
const audio = document.querySelector("audio");

let catDirection;
let mouseLocation;
let eaten = 0;
let escaped = 0;
let gameImg = document.getElementById("game-image");
let modalButton = document.getElementById("modal-button");
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");
let resetButton = document.getElementById("reset-button");

/* Music & FX settings*/
musicButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.volume = 0.2;
        audio.play();
        musicButton.innerHTML = "Mute Music & FX";
    } else {
        audio.pause();
        musicButton.innerHTML = "Play Music & FX";
    }
});

/**
 * Modal box settings
 */
modalButton.addEventListener("click", () => {
    modal.style.display = "block";
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

/* Reset button */
resetButton.addEventListener("click", () => {
    location.reload();
});


/**
 * Take the player's chosen direction and call the computer choice function
 */
controlButtons.forEach(button => button.addEventListener("click", () => {
    userDirection = button.textContent;
    generateMouseLocation();
    gameState.textContent = checkOutcome();
    checkGameEnd();
}));

/**
 * Generate random number to determine from which hole the mouse appears.
 */
function generateMouseLocation() {
    const computerChoice = Math.floor(Math.random() * 3);

    switch (computerChoice) {
        case 0:
            mouseLocation = 'left';
            break;
        case 1:
            mouseLocation = 'middle';
            break;
        case 2:
            mouseLocation = 'right';
            break;
    }
}

/**
 * Check both user and cpu choices and determine if it's a goal or a save
 * change main image to reflect outcome and add result to scoreboard
 */
function checkOutcome() {

    let outcome = "";

    const userPlayImg = `assets/images/cat_${catDirection}_mouse_${mouseLocation}.png`;

    if (userDirection === cpuDirection) {
        gameImg.src = userPlayImg;
        outcome = `You pounced ${catDirection} and the mouse chose ${mouseLocation}. SAVED!`;
    } else {
        userGoals++;
        gameImg.src = userPlayImg;
        outcome = `You kicked ${catDirection} and CPU dived ${mouseLocation}. GOAL!`;
        userScore.innerHTML = userGoals;
    }
}
document.getElementById("left").disabled = true;
document.getElementById("middle").disabled = true;
document.getElementById("right").disabled = true;
return outcome;

/**
 * Check if either player or CPU have reached 5 goals
 */
function checkGameEnd() {
    if (userGoals === 5 && cpuGoals < 5) {
        gameState.innerHTML = "YOU WIN!";
        endGame();
    } else if (userGoals < 5 && cpuGoals === 5) {
        gameState.innerHTML = "COMPUTER WINS!";
        endGame();
    } else {
        setTimeout(changeKicker, 2500);
    }
}

/**
 * Disable direction buttons if either user or cpu reach 5 goals
 */
function endGame() {
    document.getElementById("left").disabled = true;
    document.getElementById("middle").disabled = true;
    document.getElementById("right").disabled = true;
}