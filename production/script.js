const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
player.innerHTML = '✈️';
const scoreDisplay = document.getElementById('score');

let playerScore = 0;
let playerPosition = 175;
const playerSpeed = 10;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= playerSpeed;
    } else if (e.key === 'ArrowRight' && playerPosition < 350) {
        playerPosition += playerSpeed;
    }
    player.style.left = playerPosition + 'px';

    if (e.key === ' ') {
        fireBullet();
    }
});

function fireBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = (playerPosition + 20) + 'px';
    bullet.style.bottom = '60px';
    gameContainer.appendChild(bullet);

    let bulletInterval = setInterval(() => {
        let bulletPosition = parseInt(bullet.style.bottom);
        if (bulletPosition > 500) {
            bullet.remove();
            clearInterval(bulletInterval);
        } else {
            bullet.style.bottom = (bulletPosition + 10) + 'px';
            checkCollision(bullet, bulletInterval);
        }
    }, 20);
}

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.innerHTML = '✈️';
    enemy.style.left = Math.floor(Math.random() * 360) + 'px';
    enemy.style.top = '0px';
    gameContainer.appendChild(enemy);

    let enemyInterval = setInterval(() => {
        let enemyPosition = parseInt(enemy.style.top);
        if (enemyPosition > 450) {
            if (checkPlayerCollision(enemy)) {
                alert('Game Over! Your score: ' + playerScore);
                clearInterval(enemyInterval);
                gameContainer.innerHTML = '<div id="player"></div>'; // Reset
            } else {
                enemy.remove();
                clearInterval(enemyInterval);
            }
        } else {
            enemy.style.top = (enemyPosition + 5) + 'px';
        }
    }, 50);
}

function checkCollision(bullet, bulletInterval) {
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        const bulletRect = bullet.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        if (
            bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left &&
            bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top
        ) {
            bullet.remove();
            enemy.remove();
            clearInterval(bulletInterval);
            playerScore++;
            scoreDisplay.textContent = playerScore;
        }
    });
}

function checkPlayerCollision(enemy) {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    return (
        playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top
    );
}

setInterval(createEnemy, 2000);
