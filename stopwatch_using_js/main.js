let [milliseconds,second,minute,] = [0,0,0];
let timerRef = document.querySelector('.mainTime');
let int = null;

document.getElementById('start').addEventListener('click', ()=>{
    if(int!==null){
    clearInterval(int);
    }
    int = setInterval(mainTime,10);
});

document.getElementById('stop').addEventListener('click', ()=>{
    clearInterval(int);
    });