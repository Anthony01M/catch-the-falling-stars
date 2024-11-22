const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
let score = 0;
let lives = 3;
let speed = 5;
let interval = 1000;

const livesDisplay = document.createElement('div');
livesDisplay.id = 'lives';
livesDisplay.textContent = `Lives: ${lives}`;
gameContainer.appendChild(livesDisplay);

document.addEventListener('mousemove', (e) => {
    basket.style.left = `${e.clientX - basket.offsetWidth / 2}px`;
});

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * (gameContainer.offsetWidth - 20)}px`;
    gameContainer.appendChild(star);
    moveStar(star);
}

function moveStar(star) {
    let starInterval = setInterval(() => {
        let starTop = parseInt(window.getComputedStyle(star).getPropertyValue('top'));
        let basketTop = gameContainer.offsetHeight - basket.offsetHeight;
        let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));
        let basketRight = basketLeft + basket.offsetWidth;
        let starLeft = parseInt(window.getComputedStyle(star).getPropertyValue('left'));
        let starRight = starLeft + star.offsetWidth;

        if (starTop + star.offsetHeight >= basketTop) {
            if (starLeft < basketRight && starRight > basketLeft) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                star.remove();
                clearInterval(starInterval);
                return;
            }
        }

        if (starTop >= gameContainer.offsetHeight - star.offsetHeight) {
            clearInterval(starInterval);
            star.remove();
            lives--;
            livesDisplay.textContent = `Lives: ${lives}`;
            if (lives === 0) {
                alert('Game Over');
                location.reload();
            }
            return;
        }
        star.style.top = `${starTop + speed}px`;
    }, 50);
}

setInterval(() => {
    createStar();
    if (interval > 200) interval -= 50;
    if (speed < 20) speed += 0.5;
}, interval);