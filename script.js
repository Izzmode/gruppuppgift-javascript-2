const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/cases/"
const COMMENTS_URL = 'https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = 'https://fnd22-shared.azurewebsites.net/api/statuses/';

const output = document.querySelector('.error-wrapper')
const cases = [];

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
        listCases()
      })
  }

  getCases()
    console.log(cases)

  const listCases = () => {
    output.innerHTML = ''

    cases.forEach(user => {
    const caseElement = createCaseElement(user)
    output.appendChild(caseElement)
    })
  }

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
  