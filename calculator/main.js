let buttons = document.querySelectorAll('button');
let screen = document.getElementById('screen');
let screenText = [];

buttons.forEach(function(button){
    button.addEventListener('click', (e)=> {
        buttonText = e.target.innerText;

        if(buttonText == 'X'){
            buttonText = '*';
            screenText += buttonText;
            screen.value = screenText;
        }
        else if(buttonText == '÷'){
            buttonText = '/';
            screenText += buttonText;
            screen.value = screenText;
        }
        else if(buttonText == 'C'){
            screenText = '';
            screen.value = screenText;
        }
        else if(buttonText == 'clear'){
            screenText = screen.value.slice(0, -1);
            screen.value = screenText;
        }
        else if(buttonText == "="){
            try{
                screen.value = eval(screenText);
                screenText = '';
            }
            catch{
                screen.value = 'Syntax Error';
                screenText = '';
            }
        }
        else{
            screenText += buttonText;
            screen.value = screenText;
        }
    });
});