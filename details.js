const BASE_URL = ' https://fnd22-shared.azurewebsites.net/api/cases/';
const COMMENTS_URL = ' https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = ' https://fnd22-shared.azurewebsites.net/api/statuses/';

const id = new URLSearchParams(window.location.search).get('id');

// console.log(id);

//LÄGG TILL ID SENARE
fetch(BASE_URL)
.then (res => res.json())
.then (data => console.log(data))

const createElement = () => {
    const div = document.querySelector('')
}