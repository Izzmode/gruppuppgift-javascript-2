const BASE_URL = ' https://fnd22-shared.azurewebsites.net/api/cases/';
const COMMENTS_URL = ' https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = ' https://fnd22-shared.azurewebsites.net/api/statuses/';

const cases = []

const output = document.querySelector('.error-wrapper')


// HÄMTA CASES FRÅN API


const getCases = () => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
  
        console.log(data)
        output.innerHTML = ''

        data.forEach(user => {
          cases.push(user)
          output.appendChild(createCaseElement(user))
        });
      })
  }

getCases()
console.log(cases)



// LIST CASES - Lista upp dem i rätt ordning



// CREATE ELEMENT - Skapa html-kort av cases

const createCaseElement = (caseData) => {


  const card = document.createElement('div')
  card.classList.add('error-container')

  const titel = document.createElement('h2')
  titel.innerText = caseData.subject

  const message = document.createElement('p')
  message.innerText = caseData.message

  card.appendChild(titel)
  card.appendChild(message)

  return card
}


// VALIDATE ADD-FORM - Validera lägg till ärende-formuläret

// ADD CASE TO DATABASE - Lägger till ett nytt ärende till apit


// TILL DETAILS.JS

// FETCH CASE BY ID - URL Query

// CREATE ELEMENT - skapar html-element med all info från caset

// VALIDATE COMMMENT-FORM

// UPDATE CASE IN DATABASE - Uppdaterar caset med kommentar

// UPDATE STATUS IN DATABASE - Ändrar 0,1,2 i statusen, skickar till databasen





// EVENT LISTENERS

// ADD-FORM SUBMIT (validatefunktionen körs + create Element + Add to Database)

// OPEN CASE (tar en till details-sidan som visar specifics)




// DETAILS.JS

// COMMENT-FORM SUBMIT (validate-funktion + crate Element + uppdatera databasen)

// STATUS CHANGE-FORM (uppdate status-funktion, hämtar infon på nytt från databasen (fetch / create element))
