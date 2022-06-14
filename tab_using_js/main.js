
const lists = document.querySelectorAll(".list");
const tab_pane = document.querySelectorAll(".tab-pane");


for(let i=0; i<lists.length; i++){
    lists[i].onclick = function(){   
        list_active = document.querySelector(".list.active");
        tab_pane_active = document.querySelector(".tab-pane.content-active");

        if(list_active){
            list_active.classList.remove('active');
            tab_pane_active.classList.remove("content-active");
        }
        lists[i].classList.add('active');
        tab_pane[i].classList.add('content-active')
        console.log(lists[i]);
    }
    
}


// lists.forEach(function(list) {
//     list.addEventListener('click', function(){
//         list.classList.add('active');
//         console.log(list);
//     });
// });


// tab1.addEventListener('click', function(){
//     tab1.classList.add("active");
//     home.classList.add("content-active");
//     tab2.classList.remove("active");
//     profile.classList.remove("content-active");
//     tab3.classList.remove("active");
//     contact.classList.remove("content-active");
// });

// tab2.addEventListener('click', function(){
//     tab1.classList.remove("active");
//     home.classList.remove("content-active");
//     tab2.classList.add("active");
//     profile.classList.add("content-active");
//     tab3.classList.remove("active");
//     contact.classList.remove("content-active");
// });

// tab3.addEventListener('click', function(){
//     tab1.classList.remove("active");
//     home.classList.remove("content-active");
//     tab2.classList.remove("active");
//     profile.classList.remove("content-active");
//     tab3.classList.add("active");
//     contact.classList.add("content-active");
// });
