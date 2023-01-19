const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/cases/';
const COMMENTS_URL = ' https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = ' https://fnd22-shared.azurewebsites.net/api/statuses/';

let id = new URLSearchParams(window.location.search).get('id');

const output = document.querySelector('.output');
const cardWrapper = document.querySelector('.card-wrapper');
const form = document.querySelector('.form-wrapper-details form');
const array = [];
const comments = document.querySelector('.output .comments');

// console.log(id);

//LÄGG TILL ID SENARE
fetch(BASE_URL + id)
.then (res => res.json())
.then (data => {

    array.push(data);
    createElement(data)
    console.log(array)
})


//SKAPAR ELEMENT FRÅN API

const createElement = (data) => {
    const div = document.createElement('div');
    div.classList.add('card');

    const statusText = document.createElement('p');
    statusText.classList.add('status');
    statusText.innerText = data.status.statusName;

    const h1 = document.createElement('h1');
    h1.classList.add('subject');
    h1.innerText = data.subject;

    const descriptionText = document.createElement('p');
    descriptionText.classList.add('descriptionText');
    descriptionText.innerText = data.message;

    const userEmail = document.createElement('p');
    userEmail.classList.add('userEmail');
    userEmail.innerText = data.email;

    const timeStamp = document.createElement('p');
    timeStamp.classList.add('timeStamp');
    timeStamp.innerText = data.created;

    div.appendChild(statusText)
    div.appendChild(h1)
    div.appendChild(descriptionText)
    div.appendChild(userEmail)
    div.appendChild(timeStamp)
    cardWrapper.appendChild(div);
};


const validateForm = () => {

    const emailInput = form.querySelector('input[type=email]');
    const emailInputValue = emailInput.value;
    const commentInput = form.querySelector('#textarea-input');
    const commentInputValue = commentInput.value;
    

    if(emailInputValue.trim() === '' || commentInputValue.trim() === '' ||!(document.querySelector('input[type=radio]').checked)) {
    console.log('NEJ');
    return false
  }

  return true
}



const createNewComment = () => {

  const emailInput = form.querySelector('input[type=email]');
  const emailInputValue = emailInput.value;
  const commentInput = form.querySelector('#textarea-input');
  const commentInputValue = commentInput.value;


  if(emailInputValue.trim() === '' || commentInputValue.trim() === '' || !(document.querySelector('input[type=radio]').checked)) {
    console.log(emailInputValue);
    return
  }
  else{
    
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-class');

    const commentP = document.createElement('p');
    commentP.classList.add('comment-text');
    commentP.innerText = commentInputValue;

    const emailComments = document.createElement('p');
    emailComments.classList.add('email_comments');
    emailComments.innerText = emailInputValue;

    const timeComments = document.createElement('p');
    timeComments.classList.add('time_comments');

    commentDiv.appendChild(commentP);
    commentDiv.appendChild(emailComments);
    commentDiv.appendChild(timeComments);
    comments.appendChild(commentDiv);
}
}


const getInput = (e) => {
    e.preventDefault();

    console.log('1')
if(!validateForm()) {
    console.log(2)
    return
}

    const newComment = {
        caseId: id,
        email: form.querySelector('input[type=email]').value,
        message: form.querySelector('#textarea-input').value
    }

    console.log(newComment)
    // createNewComment()

    fetch(COMMENTS_URL, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
    },
})
        .then(res => console.log(res))
        .then(createNewComment())
        
    }
    // )

// }


form.addEventListener('submit', getInput);




// const createCommentElement = () => {

//     const commentDiv = document.createElement('div');
//     commentDiv.classList.add('comment-class');

//     const commentP = document.createElement('p');
//     commentP.classList.add('comment-text');

//     commentDiv.appendChild(commentP);
//     comments.appendChild(commentDiv);


// }

// createCommentElement();
