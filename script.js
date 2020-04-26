const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //creates array of dom elements
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUi();

let ticketPrice = parseInt(movieSelect.value); // can also add + inplace of parseInt( )

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//updates movie ticket count and price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = `$${selectedSeatsCount * ticketPrice}`;
}

// populate selected data after reloads browser
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// seat click event listner
movieSelect.addEventListener('change', (event) => {
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
})

// seat click event listner
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
    event.target.classList.toggle('selected');

    updateSelectedCount();
  }
})

// intial count and total of movie
updateSelectedCount();