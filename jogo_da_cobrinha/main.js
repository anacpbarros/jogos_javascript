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
let msg_alerta = '<div class="alert-box">' +
'<p> <img src="img/cobra.jpg" Game Over </p>' +
'<input style="padding:5px 10px;" type="button" value="OK" onclick="iniciarJogo();">' +
'</div>';

function criarBG() {
    context.fillStyle = "#087103";
    context.fillRect(0, 0, 16 * box, 16 * box); // (x, y, heigth, width)
}

/*function criarCabeca(){
    context.beginPath();
    var cabeca = new Image();
    cabeca.src = 'img/cabeca.png';

    cabeca.onload = function() {
        var pattern = context.createPattern(cabeca);
        context.fillStyle = pattern;
        context.drawImage(snake[0].x, snake[0].y, box, box);
    } 
} */ 

function criarCobrinha(){
    for (i = 1; i < snake.length; i++){
    var cabeca = new Image();
    cabeca.src = 'img/cabeca.png';
    
    cabeca.onload = function() {
        var pattern = context.createPattern(cabeca);
        context.fillStyle = pattern;
        context.drawImage(snake[0].x, snake[0].y, box, box);
    } 

    
        context.fillStyle = "#25EE1A";
        context.fillRect(snake[i].x, snake[i].y, box - 1, box - 1);
    }
}

function comidaCobrinha(){
    var maca = new Image();
    maca.src = 'img/maca.png';
    
    maca.onload = function() {
        var ptrn = context.createPattern(maca, 'repeat');
        context.fillStyle = ptrn;
        context.drawImage(maca, comida.x, comida.y, box, box); //utilizei drawImage ao inves de fillRect
    }
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

    for (i = 1; i <snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            //alert('Game Over :(');
        document.write(msg_alerta);
        }
    }

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

    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let novaCabeca = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(novaCabeca); //entra no lugar do primero elemento
}

let jogo = setInterval(iniciarJogo, 100); //a cada 100 milisegundos renova o jogo caso travar

