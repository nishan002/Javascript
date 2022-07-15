const url = 'https://jsonplaceholder.typicode.com/posts';
let post;

let fetch_data = document.getElementById("fetchData");
let posts_list = document.querySelector('.posts-list');
//let editPost =  document.getElementById('editForm');
const title = document.getElementById('title');
const body = document.getElementById('body');
const user_id = document.getElementById('user_id');
// separate edit form
// let editTitle = document.getElementById('editTitle');
// let editBody = document.getElementById('editBody');
// let edit_user_id = document.getElementById('edit_user_id');
// let btnEdit = document.getElementById('editSubmit');



fetch_data.addEventListener('click', function(){ 
    fetch(url)
    .then(res => {
        if (!res) {
            const message = `Error ${res.status}`
            throw new Error(message)
        }
        return res.json();
    })
    .then((data) => renderData(data))
    .catch(error => console.log(error))
});


function renderData(posts){
    post = ''
    posts.forEach((item) => {
        post += `
        
        <div class="col-md-4">    
            <div class="card">
                <div class="card-body" id="card" data-id="${item.id}">
                    
                    <h3 class="card-title title"><a onclick="singlePost(${item.id})" data-toggle="modal" data-target="#exampleModalCenter">${item.title}</a></h3>
                    <p class="card-text body">${item.body}</p>
                    <p class="card-text body user_id">${item.userId}</p>
                    <a class="btn btn-primary" onclick="postEdit(${item.id})" id="edit_post">Edit</a>
                    <a class="btn btn-danger" onclick="postDelete(${item.id})" id="delete_post">Delete</a>
                </div>
            </div>
        </div>`;
        
        posts_list.innerHTML = post; 
    })
    
}



//Clearing form
function clearForm(){
    document.getElementById('title').value = ''
    document.getElementById('body').value = ''
    document.getElementById('user_id').value = ''
}


// Creating a Post

// addPostForm.addEventListener('submit', (e) => {
    //e.preventDefault();
    
    function addPost(event){
        event.preventDefault()
        let form_method = document.querySelector('form').method
        console.log(form_method)

        if (form_method == "post") {
             let posttitle = title.value;
             let postbody = body.value;
             let post_user_id = user_id.value;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    userId: post_user_id,
                    title: posttitle,
                    body: postbody,
                }),
            })
            .then(res => res.json())
            .then(data => {
                const dataArray = [];
                dataArray.push(data);
                renderData(dataArray);
                clearForm();
                $("body, html").animate({
                    scrollTop: $(document).height()
                }, 1000)
            })
        
            
            console.log(form_method)
            alert("Successfully Done")
        }
        else{
            update();
            event.preventDefault();
        }
    }
  
// });


// Deleting Post 

function postDelete(id){
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => console.log(res))
        document.querySelector(`div.card-body[data-id="${id}"]`).remove();
}


// update post

function postEdit(id) {
    // let form_method = document.querySelector('form').method
    // console.log(form_method)
    $("body, html").animate({
        scrollTop: $(document).height(0)
    }, 1000)

    fetch(`${url}/${id}`)
        .then(res => {
            if (!res) {
                const message = `Error ${res.status}`
                throw new Error(message)
            }
            return res.json();
        })
        .then(res => {
            console.log(res)
            title.value = res.title
            body.value = res.body
            user_id.value = res.userId
            let editPost = document.querySelector('form')
            editPost.setAttribute("method", "PATCH")
            document.getElementById('hiddenId').value = id
        })
        .catch(error => console.log(error));
        console.log(url)
    
}

// editPost.addEventListener('submit', (e) => {
//     e.preventDefault();
    
    function update(){
        let id = document.getElementById('hiddenId').value

        let edittitle = document.getElementById('title').value;
        let editbody = document.getElementById('body').value;
        let edituser_id = document.getElementById('user_id').value;
        console.log(edittitle)
        console.log(editbody)
        console.log(edituser_id)
        fetch(`${url}/${id}`, {

            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                userId: edituser_id,
                title: edittitle,
                body: editbody,
            })
            
        })
        .then(res => {
            if (!res) {
                const message = `Error :${res.status}`;
                throw new Error(message);
            } 
            else {
                return res.json()
            }
        })

        .then(res => {
            let imp = document.querySelector(`.card-body[data-id="${res.id}"]`)
            imp.innerHTML = `
            <h3 class="card-title title"><a onclick="singlePost(${res.id})" data-toggle="modal" data-target="#exampleModalCenter">${res.title}</a></h3>
                <p class="card-text body">${res.body}</p>
                <p class="card-text body user_id">${res.userId}</p>
                <a class="btn btn-primary" id="edit_post" onclick="postEdit(${res.id})">Edit</a>
                <a class="btn btn-danger" id="delete_post" onclick="postDelete(${res.id})">Delete</a>
                            `
            clearForm();
        })
        .catch(error => console.log(error))
        let setATT = document.querySelector('form')
        setATT.setAttribute("method", "post")
    }
// });


// Single Post
let Singlepost = document.querySelector('.modal-content');
let single;

function singlePost(num){

    fetch(`https://jsonplaceholder.typicode.com/posts/${num}`)
    .then(response => response.json())
    .then(data =>{
        
        single = `
        
        <div class="modal-header">
        <h5 class="modal-title">${data.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>${data.body}</p>
        <p>${data.userId}</p>
      </div>
       
        `;
         
        console.log(data);
        console.log(num)
        Singlepost.innerHTML = single;
    });

}