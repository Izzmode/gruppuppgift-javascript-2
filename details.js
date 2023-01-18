const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/cases/';
const COMMENTS_URL = ' https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = ' https://fnd22-shared.azurewebsites.net/api/statuses/';

const id = new URLSearchParams(window.location.search).get('id');

const output = document.querySelector('.output');
const cardWrapper = document.querySelector('.card-wrapper');

// console.log(id);

//LÄGG TILL ID SENARE
fetch('https://fnd22-shared.azurewebsites.net/api/cases/')
.then (res => res.json())
.then (data => {
    createElement(data)
    console.log(data)
})


//SKAPAR ELEMENT FRÅN API

const createElement = (data) => {
    const div = document.createElement('div');
    div.classList.add('card');

    const statusText = document.createElement('p');
    statusText.classList.add('status');
    statusText.innerText = data[3].status.statusName;

    const h1 = document.createElement('h1');
    h1.classList.add('subject');
    h1.innerText = data[3].subject;

    const descriptionText = document.createElement('p');
    descriptionText.classList.add('descriptionText');
    descriptionText.innerText = data[3].message;

    const userEmail = document.createElement('p');
    userEmail.classList.add('userEmail');
    userEmail.innerText = data[3].email;

    const timeStamp = document.createElement('p');
    timeStamp.classList.add('timeStamp');
    timeStamp.innerText = data[3].created;

    div.appendChild(statusText)
    div.appendChild(h1)
    div.appendChild(descriptionText)
    div.appendChild(userEmail)
    div.appendChild(timeStamp)
    cardWrapper.appendChild(div);

}
