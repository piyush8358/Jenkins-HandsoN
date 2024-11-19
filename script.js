const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');

let score = 0;
let gameInterval;
let isGameRunning = false;

// Move the basket with arrow keys
document.addEventListener('keydown', (e) => {
    if (!isGameRunning) return;

    const basketRect = basket.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();

    if (e.key === 'ArrowLeft' && basketRect.left > containerRect.left) {
        basket.style.left = basket.offsetLeft - 20 + 'px';
    } else if (e.key === 'ArrowRight' && basketRect.right < containerRect.right) {
        basket.style.left = basket.offsetLeft + 20 + 'px';
    }
});

// Generate random falling balls
function createBall() {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.left = Math.random() * (gameContainer.offsetWidth - 20) + 'px';
    gameContainer.appendChild(ball);

    let fallInterval = setInterval(() => {
        const ballRect = ball.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (ballRect.bottom >= basketRect.top &&
            ballRect.left >= basketRect.left &&
            ballRect.right <= basketRect.right) {
            // Ball caught
            score++;
            scoreElement.textContent = score;
            ball.remove();
            clearInterval(fallInterval);
        } else if (ballRect.bottom >= gameContainer.offsetHeight) {
            // Ball missed
            endGame();
            clearInterval(fallInterval);
        }
    }, 30);

    // Remove ball if it's no longer visible
    ball.addEventListener('animationend', () => {
        ball.remove();
    });
}

// Start the game
function startGame() {
    if (isGameRunning) return;

    score = 0;
    scoreElement.textContent = score;
    isGameRunning = true;
    startButton.style.display = 'none';
    basket.style.left = gameContainer.offsetWidth / 2 - basket.offsetWidth / 2 + 'px';

    gameInterval = setInterval(() => {
        createBall();
    }, 1000);
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    alert('Game Over! Your score: ' + score);
    startButton.style.display = 'block';

    // Remove all remaining balls
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => ball.remove());
}

// Start button listener
startButton.addEventListener('click', startGame);
