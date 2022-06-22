

const start = document.getElementById('start');
const stop = document.getElementById('stop');

start.addEventListener('click', function(){
    function timestart(){
        document.getElementById('title').innerHTML += "Hello";
        console.log('hello world');
    }

    init = setInterval(timestart, 1000);
    console.log(int);
});

stop.addEventListener('click', function(){
    test = clearInterval(init);
    console.log(test);
})