const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Size of each square
console.log(box);
const canvasSize = canvas.width;
const rows = canvasSize / box;
const cols = canvasSize / box;

let snake = [];
snake[0] = { x: Math.floor(cols / 2) * box, y: Math.floor(rows / 2) * box };

let food = {
  x: Math.floor(Math.random() * cols) * box,
  y: Math.floor(Math.random() * rows) * box,
};

let direction;
let score = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
  else if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
  else if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
  else if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'LEFT') snakeX -= box;
  if (direction === 'UP') snakeY -= box;
  if (direction === 'RIGHT') snakeX += box;
  if (direction === 'DOWN') snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * cols) * box,
      y: Math.floor(Math.random() * rows) * box,
    };
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvasSize ||
    snakeY >= canvasSize ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);

  ctx.fillStyle = 'black';
  ctx.font = '45px Changa one';
  ctx.fillText(score, 2 * box, 1.5 * box);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

const game = setInterval(draw, 100);
