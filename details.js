const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/cases/';
const COMMENTS_URL = ' https://fnd22-shared.azurewebsites.net/api/comments/';
const STATUSES_URL = ' https://fnd22-shared.azurewebsites.net/api/statuses/';

let id = new URLSearchParams(window.location.search).get('id');

const output = document.querySelector('.output');
const cardWrapper = document.querySelector('.card-wrapper');
const form = document.querySelector('.form-wrapper-details form');
const array = [];
const comments = document.querySelector('.output .comments');


//LÄGG TILL ID SENARE
fetch(BASE_URL + id)
.then (res => res.json())
.then (data => {

    array.push(data);
    createElement(data)
    console.log(array)
    listComments(data)

    if(data.statusId == 1) {
      document.querySelector('.status').style.color = '#ff0000'
    }
    if(data.statusId == 2) {
      document.querySelector('.status').style.color = 'yellow'
    }
    if(data.statusId == 3) {
      document.querySelector('.status').style.color = '#00ff00'
    }
})

// const getComments = () => {
//     fetch(BASE_URL)
//       .then(res => res.json())
//       .then(data => {
  
    
//         data.forEach(post => {
//           comments.push(post)
//         });
//         console.log(data)
//         // listCases()
//       })
//   }


const listComments = (data) => {
    console.log(data.comments[0].message, data.comments[0].created, data.comments[0].email);
    const getComments = data.comments

    getComments.forEach(comment => {
        // console.log(comment);
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
        let time = comment.created
        const date = new Date(time)
        const dateFormat = date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString()
        timeComments  .innerText = dateFormat

        commentDiv.appendChild(commentP);
        commentDiv.appendChild(emailComments);
        commentDiv.appendChild(timeComments);
        comments.appendChild(commentDiv);
    })
}
  

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
    let time = data.created
    const date = new Date(time)
    const dateFormat = date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString()
    timeStamp.classList.add('timeStamp');
    timeStamp.innerText = dateFormat
    // timeStamp.innerText = data.created;




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
    

    const radios = document.getElementsByName('rBtn')
    const errorArray = []

    radios.forEach(radio => {
      if(radio.checked) {
        errorArray.push(true)
      }
      else {
        errorArray.push(false)
      }
      })


    if(emailInputValue.trim() === '' || commentInputValue.trim() === '' ) {
    return false
    }
    if(!errorArray.includes(true)) {
      return false
    }

  return true
}



const createNewComment = () => {

  const emailInput = form.querySelector('input[type=email]');
  const emailInputValue = emailInput.value;
  const commentInput = form.querySelector('#textarea-input');
  const commentInputValue = commentInput.value;


  if(emailInputValue.trim() === '' || commentInputValue.trim() === '' /*|| !(document.querySelector('input[type=radio]').checked) */) {
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

  if(!validateForm()) {
    return
  }

  const newComment = {
    caseId: id,
    email: form.querySelector('input[type=email]').value,
    message: form.querySelector('#textarea-input').value
  }

  fetch(COMMENTS_URL, {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
    })

    // JSON
      .then(res => console.log(res))
      .then(() => {
        createNewComment()

        const statusValue = document.querySelector('input[name="rBtn"]:checked').value

        Number(statusValue)
        
        fetch(BASE_URL + id)
          .then (res => res.json())
          .then (() => {
      
            let newStatus = {
              id: id,
              statusId: Number(statusValue)
            }
            
      
            fetch(BASE_URL + id, {
              method: 'PUT',
              body: JSON.stringify(newStatus),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
            // JSON !!!!
              .then((res) => console.log(res))
              .then(() => {

                fetch(BASE_URL + id)
                  .then (res => res.json())
                  .then (data => {
        
                  cardWrapper.innerHTML = ''
                  createElement(data)

                  if(statusValue == 1) {
                    document.querySelector('.status').style.color = '#ff0000'
                  }
                  if(statusValue == 2) {
                    document.querySelector('.status').style.color = 'yellow'
                  }
                  if(statusValue == 3) {
                    document.querySelector('.status').style.color = '#00ff00'
                  }
                  })
              })
              })
            })

            
              
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
