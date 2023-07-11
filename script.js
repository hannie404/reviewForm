const display = document.querySelector('#displayReview');
const add = document.querySelector('#addReview');
const reviewBy = document.querySelector('.reviewBy');
const review = document.querySelector('.review');
const year = document.querySelector('.year');
const title = document.querySelector('.movieTitle');
const displayList = document.querySelector('.listDisplay');
const movieForm = document.querySelector('#movieForm');
const clear = document.querySelector('#clear');

// Declare the array for the infos to save it to the local
let reviewList = JSON.parse(localStorage.getItem('infoList')) || [];

setMovieReviews = () => {
  const formFields = {
    id: Date.now(),
    title: title.value,
    year: year.value,
    review: review.value,
    reviewBy: reviewBy.value
  }

  // Check if any of the fields are empty
  if (Object.values(formFields).some(value => value === '')) {
    alert('Please fill in all fields');
    return;
  }

  // To push the collected infos inside the array
  reviewList.push(formFields);
  localStorage.setItem('infoList', JSON.stringify(reviewList));

  // Clear form fields after successful registration
  title.value = '';
  year.value = '';
  review.value = '';
  reviewBy.value = '';
}

// Add review button
add.addEventListener('click', (e) => {
  e.preventDefault();
  setMovieReviews();
});

// Display review button
display.addEventListener('click', () => {
  reviewList = JSON.parse(localStorage.getItem('infoList')) || [];
  displayList.innerHTML = '';

  console.table(reviewList)

  if (reviewList.length === 0) {
    displayList.innerHTML = 'No reviews found';
    return;
  }

  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered');
  table.style.marginTop = '5px';

  // Create table header
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  Object.keys(reviewList[0]).forEach(key => {
    if (key === 'id') return;
    const th = document.createElement('th');
    th.textContent = key;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');
  reviewList.forEach(item => {
    const row = document.createElement('tr');
    Object.values(item).forEach(value => {
      const col = document.createElement('td');
      col.textContent = value;
      row.appendChild(col);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  displayList.appendChild(table);
});

clear.addEventListener('click', () => {
  localStorage.clear('infoList');
  displayList.innerHTML = '';
});

// async function add(first, second) {
//   return first + second;
// }

// async function multiply(first, second) {
//   return first * second;
// }

// var result = null;
// add(2, 3).then(res => {
//   multiply(res, 5).then(res => {
//     result = res;
//   });
// });

// console.log(result);