/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// console.log(data);

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const perPage = 9;
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header');



function showPage(list, page = 1) {
  const startIndex = (page * perPage) - perPage;
  const endIndex = (page * perPage);
  studentList.innerHTML = '';

  for (let i = 0; i < list.length; i++) {

    if (i >= startIndex && i < endIndex) {
      const studentItem =
      `<li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
          <h3>${list[i].name.first} ${list[i].name.last}</h3>
          <span class="email">${list[i].email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${list[i].registered.date}</span>
        </div>
      </li>`;
      studentList.insertAdjacentHTML('beforeend', studentItem);
    }
  }
}
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const numOfPages = Math.ceil(list.length / perPage);
  linkList.innerHTML = '';
  for (let i = 1; i <= numOfPages; i++) {
    const newButton =
      `<li>
      <button type="button">${i}</button>
    </li>`
    linkList.insertAdjacentHTML('beforeend', newButton);
  }
  const buttonClass = document.querySelector('.link-list button');
  buttonClass.className = 'active';

  linkList.addEventListener('click', (e) => {
    const clickButton = e.target;
    if (clickButton.tagName === 'BUTTON') {
      const firstActiveButton = document.querySelector('button.active');
      firstActiveButton.classList.remove('active');
      clickButton.className = 'active';
      showPage(list, clickButton.textContent)
    }
  });
}

// Add a search bar
const addSearchBar =
  `<label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`

header.insertAdjacentHTML('beforeend', addSearchBar);

const input = document.querySelector('#search');

function filterSearch(searchInput, list) {
  const searchList = [];
    for (let i = 0; i < list.length; i++) {
      const names = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`
        if(names.includes(searchInput)) {
          searchList.push(list[i])
        }
    return searchList;
  }
}

input.addEventListener('keyup', ()=> {
  // filterSearch(input, data);
})

// Call functions
showPage(data, 1);
addPagination(data);
