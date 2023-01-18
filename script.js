const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/cases"

const cases = [];

const getCases = async () => {
    const res = await fetch(BASE_URL)
    const cases = await res.json()
  
    console.log(cases)
  
    cases.forEach(post => {
  
    })
  }
  getCases()