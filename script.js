const BASE_URL = ' https://fnd22-shared.azurewebsites.net/api/cases/';
const COMMENTS_URL = ' https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = ' https://fnd22-shared.azurewebsites.net/api/statuses/';

const cases = []

const output = document.querySelector('.error-wrapper')
const addForm = document.querySelector('#add-form')


// HÄMTA CASES FRÅN API


const getCases = () => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
  
        console.log(data)
        output.innerHTML = ''

        data.forEach(post => {
          cases.push(post)
        });

        listCases()
      })
  }

getCases()
console.log(cases)


// LIST CASES - Lista upp dem i rätt ordning

const listCases = () => {
  output.innerHTML = ''

  cases.forEach(user => {
    // TBD - Lista upp dem enligt timestamp
  const caseElement = createCaseElement(user)
  output.appendChild(caseElement)
  })
}


// CREATE ELEMENT - Skapa html-kort av cases

const createCaseElement = (caseData) => {


  const card = document.createElement('a')
  card.classList.add('error-container')

  card.setAttribute('href', `details.html?id=${caseData.id}`) 


  const status = document.createElement('p')
  
  if(caseData.statusId == 1) {
    status.innerText = ' Ej påbörjad'
    status.style.color = '#ff0000'
  }
  
  if(caseData.statusId == 2) {
    status.innerText = ' Pågående'
    status.style.color = 'yellow'
  }
  
  if(caseData.statusId == 3) {
    status.innerText = ' Avklarad'
    status.style.color = '#00ff00'
  }

  const titel = document.createElement('h2')
  titel.innerText = caseData.subject

  const message = document.createElement('p')
  message.innerText = caseData.message

  const email = document.createElement('p')
  email.innerText = caseData.email

  const time = document.createElement('p')
  // time.innerText = caseData.created

  let timeStamp = caseData.created
  const date = new Date(timeStamp)
  const dateFormat = date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString()
  time.innerText = dateFormat

  card.appendChild(status)
  card.appendChild(titel)
  card.appendChild(message)
  card.appendChild(email)
  card.appendChild(time)

  return card
}


// VALIDATE ADD-FORM - Validera lägg till ärende-formuläret

const validateAddForm = e => {

  const email = document.querySelector('#email')
  const subject = document.querySelector('#subject')
  const message = document.querySelector('#message')
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const errorMessage = document.querySelector('#error-message')

  if(email.value.trim() === '' || subject.value.trim() === '' || message.value.trim() === '') {
    errorMessage.classList.remove('display-none')
    return false
  }
  
  if(!regEx.test(email.value)) {
    errorMessage.classList.remove('display-none')
    return false
  }

  errorMessage.classList.add('display-none')
  return true
}



//ADD CASE TO DATABASE 

const handleSubmit = e => {
  e.preventDefault()

  if(!validateAddForm()) {
    console.log('valideringsfel')
    return 
  }

  let newCase = {
    email: document.querySelector('#email').value,
    subject: document.querySelector('#subject').value,
    message: document.querySelector('#message').value
  }

  fetch(BASE_URL, {
  method:'POST',
  body: JSON.stringify(newCase),
  headers: {
      'Content-type': 'application/json; charset=UTF-8',
  },
  })
    .then((response) => response.json())
    .then((data) => {

      fetch(BASE_URL + data)
        .then(res => res.json())
        .then(data => {
  
          output.innerHTML = ''
          cases.unshift(data)
          console.log(data)

        listCases()
      })

    })

}


addForm.addEventListener('submit', handleSubmit)


