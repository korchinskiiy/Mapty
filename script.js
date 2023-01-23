'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      //Event listener for map
      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
        console.log(mapEvent);
      });
    },
    function () {
      alert('Cannot read your geolocation!');
    }
  );
}

//Input event listener

inputType.addEventListener('change', function (e) {
  inputCadence.closest('div').classList.toggle('form__row--hidden');
  inputElevation.closest('div').classList.toggle('form__row--hidden');
});

//Form event listener

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const { lat, lng } = mapEvent.latlng;

  //Clear input fields after submitting
  inputDistance.value = '';
  inputCadence.value = '';
  inputDuration.value = '';
  inputDistance.focus();
  console.log(inputType.value);

  //Adding marker and poup
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 240,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});
