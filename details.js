const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/cases/';
const COMMENTS_URL = ' https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = ' https://fnd22-shared.azurewebsites.net/api/statuses/';

const id = new URLSearchParams(window.location.search).get('id');

const output = document.querySelector('.output')

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
    statusText.innerText = data.subject;

    const h1 = document.createElement('h1')
    h1.classList.add('subject')

    const descriptionText = document.createElement('p');
    descriptionText.classList.add('descriptionText');

    const userEmail = document.createElement('p');
    userEmail.classList.add('userEmail');

    const timeStamp = document.createElement('p');
    timeStamp.classList.add('timeStamp');

    div.appendChild(statusText)
    div.appendChild(h1)
    div.appendChild(descriptionText)
    div.appendChild(userEmail)
    div.appendChild(timeStamp)
    output.appendChild(div);

}
