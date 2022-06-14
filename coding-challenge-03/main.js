'use strict'

// function

function calcTip(bill){

    if(bill >= 50 && bill <= 300){
        const tip = bill * .15;
        return tip;
    }
    else{
        const tip = bill * .2;
        return tip;
    }
}

// Array
const bills = [125, 555, 44]
const tips = [];
const total = [];

// For loop 
for(let i=0; i<=bills.length-1; i++){
    tips[i] = calcTip(bills[i]);
    total[i] = bills[i]+calcTip(bills[i]);
}

// const tips = [ calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2]) ];
// const total = [ bills[0]+calcTip(bills[0]), bills[1]+calcTip(bills[1]), bills[2]+calcTip(bills[2])];
console.log(bills, tips, total);