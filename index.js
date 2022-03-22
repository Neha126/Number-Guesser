//Game values
let min = 1, max = 10,
    winningNum = randomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input');
message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;


//play again event listner
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})
//listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    //validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return;
    }
    //Check if won
    if (guess === winningNum) {

        gameOver(true, `${winningNum} is correct, YOU WIN`, 'green');
    }
    else {
        // wrong number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

        }
        else {
            //game continue - answer wrong
            guessInput.style.borderColor = 'red';

            //clesr input
            guessInput.value = '';
            //tell user its wrong
            setMessage(`${guess} is not correct,${guessesLeft} guesses left`, 'red');

        }

    }
});
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //set text color
    message.style.color = color;
    setMessage(msg);

    //Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//get winning number
function randomNum(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min));

}
//Set Messsage
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
