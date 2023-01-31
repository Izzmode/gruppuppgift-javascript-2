const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/cases/';
const COMMENTS_URL = ' https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = ' https://fnd22-shared.azurewebsites.net/api/statuses/';

let id = new URLSearchParams(window.location.search).get('id');

const output = document.querySelector('.output');
const cardWrapper = document.querySelector('.card-wrapper');
const form = document.querySelector('.form-wrapper-details form');
const array = [];
const comments = document.querySelector('.output .comments');


// Hämtar in datan
fetch(BASE_URL + id)
.then (res => res.json())
.then (data => {

    array.push(data);
    createElement(data)
    listComments(data)
    setStatusColor(data)
})


// LISTAR OCH SKAPAR REDAN EXISTERANDE KOMMENTARER

const listComments = (data) => {
    const getComments = data.comments

    getComments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-class');

        const commentP = document.createElement('p');
        commentP.classList.add('comment-text');
        commentP.innerText = comment.message;

        const emailComments = document.createElement('p');
        emailComments.classList.add('email_comments');
        emailComments.innerText = comment.email;

        const timeComments = document.createElement('p');
        timeComments.classList.add('time_comments');
        timeComments.innerText = editTimestamp(comment)

        commentDiv.appendChild(commentP);
        commentDiv.appendChild(emailComments);
        commentDiv.appendChild(timeComments);
        comments.appendChild(commentDiv);
    })
}

const editTimestamp = (data) => {
  let time = data.created
  const date = new Date(time)
  const dateFormat = date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString()
  return dateFormat
}

const setStatusColor = (data) => {
  if(data.statusId == 1) {
    document.querySelector('.status').style.color = '#ff0000'
  }
  if(data.statusId == 2) {
    document.querySelector('.status').style.color = '#f0cd09'
  }
  if(data.statusId == 3) {
    document.querySelector('.status').style.color = '#00ff00'
  }
}
  

//SKAPAR CASE-ELEMENTET

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
    timeStamp.innerText = editTimestamp(data)

    div.appendChild(statusText)
    div.appendChild(h1)
    div.appendChild(descriptionText)
    div.appendChild(userEmail)
    div.appendChild(timeStamp)
    cardWrapper.appendChild(div);
};


// VALIDERAR FORMULÄRET

const validateForm = () => {

  const emailInput = form.querySelector('input[type=email]');
  const emailInputValue = emailInput.value;
  const commentInput = form.querySelector('#textarea-input');
  const commentInputValue = commentInput.value;
    
  const radios = document.getElementsByName('rBtn')
  const errorArray = []
  
  if(emailInputValue.trim() === '' || commentInputValue.trim() === '' ) {
    console.log('valideringsfel')
    return false
  }
  // Kollar genom radiobuttons om ngn av dem är ifyllda
  radios.forEach(radio => {
    if(radio.checked) {
      errorArray.push(true)
    }
    else {
      errorArray.push(false)
    }
    })

  // Om error-arrayen INTE innehåller true -> valideringsfel
  if(!errorArray.includes(true)) {
    console.log('valideringsfel')
    return false
  }

  return true
}

// CREATE NEW COMMENT


const createNewComment = () => {

  const emailInput = form.querySelector('input[type=email]');
  const emailInputValue = emailInput.value;
  const commentInput = form.querySelector('#textarea-input');
  const commentInputValue = commentInput.value;

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
  timeComments.setAttribute('id', 'new-time')

  commentDiv.appendChild(commentP);
  commentDiv.appendChild(emailComments);
  commentDiv.appendChild(timeComments);
  comments.appendChild(commentDiv);

}


// KÖRS NÄR FOMRULÄRET SUBMITTAS

const getInput = (e) => {
  e.preventDefault();

    // Validering
  if(!validateForm()) {
    return
  }

  // Skapar nytt comment-objekt
  const newComment = {
    caseId: id,
    email: form.querySelector('input[type=email]').value,
    message: form.querySelector('#textarea-input').value
  }

  // Postar nya kommentaren till databasen
  fetch(COMMENTS_URL, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then(() => {
    // Skapar nytt comment-element
    createNewComment()
    // Kollar vilken status ärendet blivit tilldelat
    const statusValue = document.querySelector('input[name="rBtn"]:checked').value
  
     // Hämtar in objektet på nytt för att kunna tilldela ny status
     fetch(BASE_URL + id)
     .then (res => res.json())
     .then (() => {
      let newStatus = {
        id: id,
        statusId: Number(statusValue)
      }
      // Skickar in nya statusen till databasen
      fetch(BASE_URL + id, {
        method: 'PUT',
        body: JSON.stringify(newStatus),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
            
              .then(() => {
                // Tömmer formuläret här för nu behöver vi inte infon längre
                form.reset()
                // Hämtar objektet PÅ NYTT för varför inte..
                // ..för hur ska vi annars få ändringarna att dyka upp direkt?
                fetch(BASE_URL + id)
                  .then (res => res.json())
                  .then (data => {
                  // Tömmer case-rutan
                  cardWrapper.innerHTML = ''
                  // Skapar case-rutan igen med uppdaterat objekt
                  createElement(data)
                  // Skriver ut rätt timestamp på objektet
                  document.querySelector('#new-time').innerText = editTimestamp(data)

                  // Tilldelar färg till statusen
                  setStatusColor(data)   
                  })
              })
              })
          }) 

              
}


form.addEventListener('submit', getInput);
