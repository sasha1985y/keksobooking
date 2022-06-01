import {sendRequest} from './fetch.js';
import {createCustomPopup} from './baloon.js';

let hotels = [];
const MAX_PINS = 10;

const INITIAL_LAT = 35.68421;
const INITIAL_LNG = 139.75304;
const initialCoordinates = {lat: INITIAL_LAT, lng: INITIAL_LNG};
const addresses = document.querySelector('#address');

const Map = {
  TILE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  COPYRIGHT: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  ZOOM: 11.5
}

const map = L.map('map-canvas');

L.tileLayer(
  Map.TILE,
  {
    attribution: Map.COPYRIGHT,
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/leaflet-svg/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const mainPinMove = () => {
  mainPinMarker.on('move', evt => {
    const points = evt.target.getLatLng();
    addresses.value = `${points['lat'].toFixed(5)},${points['lng'].toFixed(5)}`;
  })
};
mainPinMove();

const addPinIcon = L.icon({
  iconUrl: './img/leaflet-svg/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const similarHotels = (hotel) => {
  const {
    location:{
      lat,
      lng
    }
  } = hotel;
  const adPins = L.marker({
    lat,
    lng, 
  },
  { 
    draggable: false,
    icon: addPinIcon,
  });

  adPins
  .addTo(map)
  .bindPopup(createCustomPopup(hotel));
  
};


const renderPins = (pins) => {
  pins.forEach((pin) => {
    similarHotels(pin);
  })
};

const onSuccess = (data) => {
  hotels = data.slice();
  
  renderPins(hotels.slice(0, MAX_PINS));
};

//попап ошибки
const onError = (error) => {
  const errorImg = document.createElement('img');
  const errorDiv = document.createElement('div');
  const errorPopup = document.createElement('span');
  errorDiv.appendChild(errorImg);
  errorImg.classList.add('error-img');
  errorImg.setAttribute('src', 'img/spot.png');
  errorImg.setAttribute('alt', 'табло ошибки');
  errorDiv.appendChild(errorPopup);
  const errorPlace = document.querySelector('.ad-form__element--submit');
  errorPlace.appendChild(errorDiv);
  errorDiv.classList.add('error-style');
  errorPopup.textContent = `${error}`;
};


map.on('load', () => {
  addresses.value = `${initialCoordinates['lat']},${initialCoordinates['lng']}`;
  sendRequest(onSuccess, onError, 'GET');
})

.setView({
  lat: INITIAL_LAT,
  lng: INITIAL_LNG,
}, Map.ZOOM);

export {INITIAL_LAT, INITIAL_LNG, mainPinMarker};