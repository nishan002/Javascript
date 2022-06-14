
// Marks height weight and BMI 
const markWeight = 78;
const markHeight = 1.69;
const markBMI = markWeight / (markHeight ** 2);

// Johns height weight and BMI
const johnWeight = 92;
const johnHeight = 1.95;
const johnBMI = johnWeight / (johnHeight ** 2);

// If else statement
if(markBMI > johnBMI){
    console.log(`Marks BMI ${markBMI} is higher than John's BMI ${johnBMI}`);
}else{
    console.log(`John's BMI ${johnBMI} is higher than Mark's BMI ${markBMI}`);
}
