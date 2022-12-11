// Game const nd variales
// javascript object
let inputDir = {x: 0, y: 0};
let foodSound = new Audio('food.mp3');
let gameOversound = new Audio('gameover.mp3');
// let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
];

food = { x: 6, y: 7 };


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
//    If snake khud se tkra jae
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
        }
        
    
}

function gameEngine() {
    // Part 1; Updating snake array

    if (isCollide(snakeArr)) {
        gameOversound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Gameover press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score:" + score;

    }


    // if food is eaten increment score and genearet food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = {x:Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)*Math.random())}
    }

    // Moving the snake

    for (let i = snakeArr.length - 2; i>=0; i--) {
        
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2; Render the nake and foof
    // Display Snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
      
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
      
        board.appendChild(snakeElement);

    })

    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



// Mainlogic Start here
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    // musicSound.play();
    inputDir = { x: 0, y: 1 }  //Start the game
    // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrowdown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("Arrowleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrowright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
            
    }
})