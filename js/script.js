/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
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
// addPagination(list);
}

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

header.insertAdjacentHTML('beforeend', addSearchBar);

const searchInput = document.querySelector('.student-search');
const searchButton = document.querySelector('button');

function alertMessage() {
  const message =
  `<div class="message">
      <h3>No results found</h3>
  </div>`
  header.insertBefore(searchInput, div)
  const div = document.querySelector('.message');
  div.style.color = 'grey';
  div.style.fontSize = '2em';
}

function filterSearch(list) {
  const studentInput = document.querySelector('#search').value.toLowerCase();
  const searchList = [];
  for (let i = 0; i < list.length; i++) {
    let names = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`
    if(names.includes(studentInput)) {
      searchList.push(list[i]);
    }
  }
  if (searchList.length === 0) {
    alertMessage();
    // document.querySelector('#search').value = '';
  } else {
    showPage(searchList, 1);

    // addPagination(searchList);
  }
  // showPage(searchList, 1)
}

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(filterSearch(data));
})
searchInput.addEventListener('keyup', (e) => {
  // e.preventDefault();
  filterSearch(data);
})

// Call functions
showPage(data, 1);
addPagination(data);
