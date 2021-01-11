let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";

function criarBG() {
    context.fillStyle = "lightpurple";
    context.fillRect(0, 0, 16 * box, 16 * box); // (x, y, heigth, width)
}

function criarCobrinha(){
    for (i = 0; i < snake.length; i++){
        context.fillStyle = "purple";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function iniciarJogo() {
    criarBG(); // criar background
    criarCobrinha();

    let snakeX = snake[0].x; //começa na posição 0 de x e de y
    let snakeY = snake[0].y;

    if(direction == "right") {
        snakeX += box;
    }
    if(direction == "left") {
        snakeX -= box;
    }
    if(direction == "up") {
        snakeY -= box;
    }
    if(direction == "down") {
        snakeY += box;
    }

    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //entra no lugar do primero elemento
}

let jogo = setInterval(iniciarJogo, 100); //a cada 100 milisegundos renova o jogo caso travar

