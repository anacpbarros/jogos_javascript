let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box, //metodo floor tira o ponto flutuante
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "purple";
    context.fillRect(0, 0, 16 * box, 16 * box); // (x, y, heigth, width)
}

function criarCobrinha(){
    for (i = 0; i < snake.length; i++){
        context.fillStyle = "gray";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function comidaCobrinha(){
    context.fillStyle = "red"
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keydown', update); //keydown recebe comando do teclado e vai chamar a função update

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left"; //pode-se escrever o if simples assim
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    criarBG(); // criar background
    criarCobrinha();
    comidaCobrinha();

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

    if(snakeX != comidaCobrinha.x || snakeY != comidaCobrinha.y){
        snake.pop();
    } else {
        comidaCobrinha.x = Math.floor(Math.random() * 15 + 1) * box;
        comidaCobrinha.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    

    let novaCabeca = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(novaCabeca); //entra no lugar do primero elemento
}

let jogo = setInterval(iniciarJogo, 100); //a cada 100 milisegundos renova o jogo caso travar

