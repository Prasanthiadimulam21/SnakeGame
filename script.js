
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart");

const box = 20;
let snake, food, direction, score, gameOver;

function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

function startGame() {
    snake = [{ x: 200, y: 200 }];
    food = randomFood();
    direction = "RIGHT";
    score = 0;
    gameOver = false;
    scoreText.textContent = score;
    drawGame();
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
});

function drawGame() {
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", 115, 190);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);


    snake.forEach(function(part, index) {
        ctx.fillStyle = index === 0 ? "#39ff14" : "#8cff66";
        ctx.fillRect(part.x, part.y, box - 2, box - 2);
    });

    let head = { ...snake[0] };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height
    ) {
        gameOver = true;
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", 115, 190);
        return;
    }

    const eating = head.x === food.x && head.y === food.y;
    const body = eating ? snake : snake.slice(0, -1);

    if (body.some(part => part.x === head.x && part.y === head.y)) {
        gameOver = true;
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", 115, 190);
        return;
    }

    snake.unshift(head);

    if (eating) {
        score += 10;
        scoreText.textContent = score;
        food = randomFood();
    } else {
        snake.pop();
    }
}

let timer;

function runGame() {
    clearInterval(timer);
    timer = setInterval(drawGame, 120);
}

restartButton.addEventListener("click", function() {
    startGame();
});

startGame();
runGame();
