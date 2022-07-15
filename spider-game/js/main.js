//=========================================================================== 
//All variable declaration 
//===========================================================================
let spiderPosition, foodPosition, topDiff, leftDiff, run_interval, score, score_count = 0, high_score = 0, is_over=false;
let spider = document.getElementById('spider');
let food = document.getElementById('food');
let [minutes, seconds] = [2,00];
let timerRef = document.querySelector('.timer');
let init_time = null;
let game_bg = document.getElementById('game-bg');
let game_bg_height =  game_bg.style.height = window.innerHeight + "px";
let game_bg_width = game_bg.style.width = window.innerWidth + "px";

document.getElementById('score_show').innerHTML = score_count;
food.style.top = parseInt((window.innerHeight)/2) + "px";
food.style.left = parseInt((window.innerWidth)/2) + "px";

window.addEventListener('resize', function(){
    game_bg.style.height = window.innerHeight + "px";
    game_bg.style.width = window.innerWidth + "px";
});


//============================================================================
// Functionality of the game character 
//============================================================================

function init(){
    spider.style.left = "5px";
    spider.style.top = "5px";
    spider.style.position = "absolute";
    init_time = setInterval(mainTime, 1000);
    clearInterval(run_interval);
    run_interval = setInterval(moveFood, 10000);
    score_count = 0;
    document.getElementById('score_show').innerHTML = score_count;
    highScoreShow();
}

// Key movements eventlistener


window.addEventListener('keydown', (event) => {

    if(is_over == false){
        switch (event.code) {
            case 'ArrowLeft' || 'Digit4':
                moveLeft();
                break;
            case 'ArrowUp' || 'Digit8':
                moveUp();
                break;
            case 'ArrowRight' || 'Digit6':
                moveRight();
                break;
            case 'ArrowDown' || 'Digit2':
                moveDown();
                break;
        }
    }
    getFood();
});



// left move by pressing ArrowLeft
function moveLeft() {
    left = parseInt(spider.style.left);
    if(left >= 5){
        spider.style.left = parseInt(spider.style.left) - 9 + "px";
    }
    spider.style.transform = 'rotate(-90deg)';
}

// Up move by pressing ArrowUp
function moveUp() {
    tops = parseInt(spider.style.top);
    
    if(tops >= 5){
        spider.style.top = parseInt(spider.style.top) - 9 + "px";
    }
    spider.style.transform = 'rotate(360deg)';
}

// Right move by pressing ArrowRight
function moveRight() {
    right = parseInt(spider.style.left);

    if(right <= window.innerWidth - 90){
        spider.style.left = parseInt(spider.style.left) + 9 + "px";
    }
    
    spider.style.transform = 'rotate(90deg)';
}

// Down move by pressing ArrowDown
function moveDown() {
    down = parseInt(spider.style.top);

    if(down <= window.innerHeight - 90){
        spider.style.top = parseInt(spider.style.top) + 9 + "px";
    }
    
    spider.style.transform = 'rotate(180deg)';
}

// Touch and eat the food and making score count
function getFood(){
    spiderPosition = spider.getBoundingClientRect();
    foodPosition = food.getBoundingClientRect();

    topDiff = foodPosition.top - spiderPosition.top;
    leftDiff = foodPosition.left - spiderPosition.left;

    if((topDiff < 40 && topDiff > -40) && (leftDiff < 40 && leftDiff > -40) ){
        score_count +=1 ;
        document.getElementById('score_show').innerHTML = score_count;
        clearInterval(run_interval);
        run_interval = setInterval(moveFood, 10000);
        moveFood();
        highScoreShow();
        var audio = new Audio('sound-effect/crunch.wav');
        audio.play();
    }
}

window.onload = init;

//========================================================================
// Functionalities of the Food 
//========================================================================

let food_opacity = setInterval(foodOpacity, 300);

function foodOpacity() {
    food.style.opacity = (food.style.opacity == 0.3 ? 1 : 0.3);
}

function moveFood() {
    if(is_over == false){
        let maxLeft = window.innerWidth - food.width;
        let maxTop = window.innerHeight - food.height;
        let leftPos = Math.floor(Math.random() * (maxLeft + 1));
        let topPos = Math.floor(Math.random() * (maxTop + 1));

        if(leftPos < window.innerWidth - 100 && topPos < window.innerHeight - 130){
            food.style.top = topPos + "px";
            food.style.left = leftPos + "px";
        }
        else{
            food.style.top = "124px"
            food.style.left = "250px"
        }
    }
}


//============================================================
// StopWatch code....
//=============================================================


function leadingZero(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function mainTime(){
    if(minutes > 0 || seconds > 0){
        seconds -= 1;
        document.getElementById("seconds").innerHTML = leadingZero(seconds, 2);
        if(seconds < 0){
            seconds = 59;
            document.getElementById("seconds").innerHTML = leadingZero(seconds, 2);
            minutes--;
            document.getElementById("minutes").innerHTML = leadingZero(minutes, 2);
        }
    }
    else{
        clearInterval(init_time);
        [minutes, seconds] = [2,00];
        document.getElementById("minutes").innerHTML = '00';
        document.getElementById("seconds").innerHTML = '00';
        gameOver();
    }
}

//============================================================
// Score and high score show
//=============================================================

function highScoreStore(){
    score = score_count;
    high_score = localStorage.getItem("highscore");

    if(high_score !== null){
        if (score > high_score) {
            localStorage.setItem("highscore", score); 
            document.getElementById('congo&over').innerText = "Congrats!";
            document.getElementById('congo-message').innerText = "You set new high score!"  
            document.getElementById('mymodal-content').style.height = "290px";
        }
        else{ 
            localStorage.setItem("highscore", high_score);
            document.getElementById('congo&over').innerText = "Game Over!";
            document.getElementById('mymodal-content').style.height = "270px";
            document.getElementById('congo-message').innerHTML = "";
        }
    }
    else{
        localStorage.setItem("highscore", score);
    }
}

function highScoreShow(){
    highScoreStore();
    high_score = document.getElementById('high_score_show').innerHTML = localStorage.getItem("highscore");
}


//==================================================================================
// Game over function - actions after the game is over
//==================================================================================
let modal = document.getElementById('mymodal');
let modal_content = document.getElementById('mymodal-content');
let restart = document.getElementById('restart');
let modal_score = document.getElementById('modal_score');
let modal_high_score = document.getElementById('modal_high_score');

function gameOver(){
    modal.classList.add('modal-active');
    modal_content.classList.add('modal-content-active');
    modal_score.innerHTML = score;
    modal_high_score.innerHTML = high_score;
    is_over = true;
    if(is_over == true){
        clearInterval(food_opacity);
        food.style.opacity = 1;
    }
}

// Restart event 
restart.addEventListener('click', function(){
    modal.classList.remove('modal-active');
    modal_content.classList.remove('modal-content-active');
    is_over = false;
    init();
    moveFood();
    food_opacity = setInterval(foodOpacity, 300);
});



