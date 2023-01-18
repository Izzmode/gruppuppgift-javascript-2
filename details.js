const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/cases/';
const COMMENTS_URL = ' https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = ' https://fnd22-shared.azurewebsites.net/api/statuses/';

const id = new URLSearchParams(window.location.search).get('id');

const output = document.querySelector('.output');
const cardWrapper = document.querySelector('.card-wrapper');
const form = document.querySelector('.form-wrapper-details form');
const array = [];
const comments = document.querySelector('.output .comments');

// console.log(id);

//LÄGG TILL ID SENARE
fetch('https://fnd22-shared.azurewebsites.net/api/cases/{7c271765-95cc-49eb-be2f-005d852956fc}')
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



const getInput = (e) => {
e.preventDefault();

const emailInput = form.querySelector('input[type=email]');
const emailInputValue = emailInput.value;
const commentInput = form.querySelector('#textarea-input');
const commentInputValue = commentInput.value;


if(emailInputValue.trim() === '' || commentInputValue.trim() === '') {
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