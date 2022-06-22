
const buttons = document.querySelectorAll('table button');
const reset = document.getElementById('reset');
const winning_line = document.querySelectorAll('.straight-line');
let gameData = [];
let winner = 0;

buttons.forEach(function(button){

    button.addEventListener('click',function startGame(){

        if(gameData.length % 2 == 0 ){
            let gameTurn = 'X';
            gameData.push(gameTurn);
            p1 = button.innerHTML = gameTurn;
            console.log(p1);
            button.disabled = true;
            
            if(gameData.length !== 9){
                checkWinner();
            }
            else{
                if(!checkWinner()){
                    alert('The match is Draw');
                }
            }
        }
        else{
            let gameTurn = 'O';
            gameData.push(gameTurn);
            p2 = button.innerHTML = gameTurn;
            console.log(p2);
            button.disabled = true;
            if(gameData.length !== 9){
                checkWinner();
            }
            else{
                alert('Draw');
            }
        }
    });


});




// This function will be called by every turn of the game to check winner
function checkWinner(){

    // Checking for Player X winning situations
    if( buttons[0].innerHTML === 'X' && buttons[1].innerHTML === 'X' && buttons[2].innerHTML === 'X'){
        winning_line[0].classList.add("straight-line-active-X");
        gameOver();
        winner = 1;
        console.log('winner');
        return true;
    }
    else if(buttons[3].innerHTML === 'X' && buttons[4].innerHTML === 'X' && buttons[5].innerHTML === 'X'){
        winning_line[3].classList.add("straight-line-active-X");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[6].innerHTML === 'X' && buttons[7].innerHTML === 'X' && buttons[8].innerHTML === 'X'){
        winning_line[4].classList.add("straight-line-active-X");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[0].innerHTML === 'X' && buttons[3].innerHTML === 'X' && buttons[6].innerHTML === 'X'){
        winning_line[0].classList.add("straight-line-active-Y");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[1].innerHTML === 'X' && buttons[4].innerHTML === 'X' && buttons[7].innerHTML === 'X'){
        winning_line[1].classList.add("straight-line-active-Y");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[2].innerHTML === 'X' && buttons[5].innerHTML === 'X' && buttons[8].innerHTML === 'X'){
        winning_line[2].classList.add("straight-line-active-Y");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[0].innerHTML === 'X' && buttons[4].innerHTML === 'X' && buttons[8].innerHTML === 'X'){
        winning_line[0].classList.add("straight-line-active-Cross-Right");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[2].innerHTML === 'X' && buttons[4].innerHTML === 'X' && buttons[6].innerHTML === 'X'){
        winning_line[2].classList.add("straight-line-active-Cross-Left");
        gameOver();
        console.log('winner');
        return true;
    }


    // Checking for Player O winning situations
    else if( buttons[0].innerHTML === 'O' && buttons[1].innerHTML === 'O' && buttons[2].innerHTML === 'O'){
        winning_line[0].classList.add("straight-line-active-X");
        gameOver();
        winner = 2;
        console.log('winner');
        return true;
    }
    else if(buttons[3].innerHTML === 'O' && buttons[4].innerHTML === 'O' && buttons[5].innerHTML === 'O'){
        winning_line[3].classList.add("straight-line-active-X");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[6].innerHTML === 'O' && buttons[7].innerHTML === 'O' && buttons[8].innerHTML === 'O'){
        winning_line[4].classList.add("straight-line-active-X");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[0].innerHTML === 'O' && buttons[3].innerHTML === 'O' && buttons[6].innerHTML === 'O'){
        winning_line[0].classList.add("straight-line-active-Y");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[1].innerHTML === 'O' && buttons[4].innerHTML === 'O' && buttons[7].innerHTML === 'O'){
        winning_line[1].classList.add("straight-line-active-Y");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[2].innerHTML === 'O' && buttons[5].innerHTML === 'O' && buttons[8].innerHTML === 'O'){
        winning_line[2].classList.add("straight-line-active-Y");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[0].innerHTML === 'O' && buttons[4].innerHTML === 'O' && buttons[8].innerHTML === 'O'){
        winning_line[0].classList.add("straight-line-active-Cross-Right");
        gameOver();
        console.log('winner');
        return true;
    }
    else if(buttons[2].innerHTML === 'O' && buttons[4].innerHTML === 'O' && buttons[6].innerHTML === 'O'){
        winning_line[2].classList.add("straight-line-active-Cross-Left");
        gameOver();
        console.log('winner');
        return true;
    }
    else{
        return false;
    }

}

// All buttons are blocked while game is over
function gameOver(){
    buttons.forEach(function(button){
        button.disabled = true;
    });
}

// Reset game 
reset.addEventListener('click', ()=>{
    buttons.forEach(function(button){
        gameData = [];
        button.innerHTML = '';
        button.disabled = false;
    });
    
    winning_line.forEach(function(line){
        line.classList.remove('straight-line-active-X');
        line.classList.remove('straight-line-active-Y');
        line.classList.remove('straight-line-active-Cross-Right');
        line.classList.remove('straight-line-active-Cross-Left');
    });
    
});
