
let modal = document.getElementById('mymodal');
let modal_content = document.getElementById('mymodal-content');

button.addEventListener('click', function(){
    modal.classList.add('modal-active');
    modal_content.classList.add('modal-content-active');
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('modal-active');
        modal_content.classList.remove('modal-content-active');
        alert('hello');
    }
}

const close = document.getElementById('close');
close.addEventListener('click', function(){
    modal.classList.remove('modal-active');
    modal_content.classList.remove('modal-content-active');
});



// Popup the modal by clicking button
// const button = document.getElementById('button');

// button.addEventListener('click', function(){
//     let modal = document.getElementById('modal');
//     let modal_content = document.getElementById('modal-content');

//     if(modal.style.display != 'block'){
//         modal.style.display = 'block';
//         modal_content.style.transform = 'translate(0, 30vh)';
//         modal_content.style.transition = 'all 3s';
//         modal_content.style.display = 'block';
//     }
//     else{
//         modal.style.display = 'none';
//         modal.style.paddingTop = '0px';
//         modal_content.style.transition = 'all 3s';
//         modal_content.style.transform = 'translate(0, 0)';
//         modal_content.style.display = 'none';
//     }

//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = 'none';
//             modal.style.paddingTop = '0px';
//             //modal.style.transition = 'all 3s';
//             modal.style.transform = 'none';
//             modal_content.style.display = 'none';
//         }
//     }
// });

// //closing the modal using cancel button
// const close = document.getElementById('close');
// close.addEventListener('click', function(){
//     let modal = document.getElementById('modal');
//     let modal_content = document.getElementById('modal-content');

//     if(modal.style.display != 'none'){
//         modal.style.display = 'none';
//         modal.style.paddingTop = '0px';
//         //modal.style.transition = 'all 3s';
//         modal.style.transform = 'none';
//         modal_content.style.display = 'none';
//     }
//     else{
//         modal.style.display = 'block';
//         modal.style.paddingTop = '100px';
//         //modal.style.transition = 'all 2s';
//         modal.style.transform = 'scale(1.2)';
//         modal_content.style.display = 'block';
//     }
// });

