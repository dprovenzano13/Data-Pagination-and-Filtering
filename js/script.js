/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Initial golbal variables
const perPage = 9;
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header');
/*
 * Dynamically inserts 9 students per page.
 * It will create as many pages needed to fit the amount of students there are
 */
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
// addPagination(list);
}
/*
 * Decides how many buttons are needed based off of how many search results
 * are found.
 */
function addPagination(list) {
  const numOfPages = Math.ceil(list.length / perPage);
  linkList.innerHTML = '';
  for (let i = 1; i <= numOfPages; i++) {
    const newButton =
      `<li>
      <button id="pagButton" type="button">${i}</button>
    </li>`
    linkList.insertAdjacentHTML('beforeend', newButton);
  }
  const buttonClass = document.querySelector('#pagButton');
  buttonClass.className = 'active';
/*
 * Listens for button clicks at the bottom of the page and changes the class to
 * 'active' each time a button is clicked.
 */
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
// Added a search bar
const addSearchBar =
  `<label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`
// Dynamically inserts the search bar into the HTML file.
header.insertAdjacentHTML('beforeend', addSearchBar);
// Global variables declared after the search form is inserted to the HTML.
const searchInput = document.querySelector('.student-search');
const searchButton = document.querySelector('button');
/*
 * Creates an alert message that sits within a 'div' element and inserts
 * it into HTML file.
 */
const alertMessage = document.createElement('div');
  alertMessage.className = 'alertMessage';
  alertMessage.style.color = '#1e90ff';
  alertMessage.style.fontSize = '1em';
  alertMessage.style.margin = 'auto';
  header.insertBefore(alertMessage, searchInput);
// Changes the innerHTML of the
function addAlertMessage() {
  const message = document.querySelector('.alertMessage');
  message.innerHTML = 'NO RESULTS FOUND';
}
// Removes the alert message.
function removeAlert() {
  const message = document.querySelector('.alertMessage');
  if (message) {
    message.innerHTML = '';
  }
}
/*
 * Filters through the data.js file and pushes names into an empty array if
 * the users input matches the first and last name of the data information.
*/
function filterSearch(list) {
  const studentInput = document.querySelector('#search').value.toLowerCase();
  const searchList = [];
  for (let i = 0; i < list.length; i++) {
    let names = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`
    if(names.includes(studentInput)) {
      searchList.push(list[i]);
    }
  }
/*
 * Decides that if the searchList array is empty, it will run an alertMessage
 * If the array is not emtpy it will show the amount of found searches, show
 * how many pages are needed, and removes the alertMessage
*/
  if (searchList.length === 0) {
    addAlertMessage();
  } else {
    showPage(searchList, 1);
    addPagination(searchList);
    removeAlert();
  }
}
// Listens for the search bar button to be clicked and runs the filterSearch function
searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  filterSearch(data);
})
// Listens for the search bar input to be typed into and runs the filterSearch function
searchInput.addEventListener('keyup', (e) => {
  filterSearch(data);
})

// Call functions
showPage(data, 1);
addPagination(data);
