

let [milliseconds,seconds,minutes] = [0,0,0];
let timerRef = document.querySelector('.timer');
let init = null;

function mainTime(){
    milliseconds += 1;
    document.getElementById("milliseconds").innerHTML = milliseconds;
    if(milliseconds == 100){
        milliseconds = 0;
        seconds++;
        document.getElementById("seconds").innerHTML = seconds;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            document.getElementById("minutes").innerHTML = minutes;
        }
    }
    console.log(init);
}

document.getElementById('startTimer').addEventListener('click', ()=>{
    if(init !== null){
        clearInterval(init);
    }
    init = setInterval(mainTime,1);
    
});

document.getElementById('stopTimer').addEventListener('click', ()=>{
    let cls = clearInterval(init);
    console.log(cls);
});

document.getElementById('resetTimer').addEventListener('click', ()=>{
    let rst = clearInterval(init);
    console.log(rst);
    [milliseconds,seconds,minutes] = [0,0,0];
    document.getElementById("minutes").innerHTML = '00';
    document.getElementById("seconds").innerHTML = '00';
    document.getElementById("milliseconds").innerHTML = '00';
});



    