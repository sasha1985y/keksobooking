import {promotions} from './data.js';

const INITIAL_LAT = 35.68421;
const INITIAL_LNG = 139.75304;
const initialCoordinates = {lat: INITIAL_LAT, lng: INITIAL_LNG};
const addresses = document.querySelector('#address');

const Map = {
  TILE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  COPYRIGHT: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  ZOOM: 11.5
}

const map = L.map('map-canvas')

  .on('load', () => {
    addresses.value = `${initialCoordinates['lat']},${initialCoordinates['lng']}`;
  })

  .setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, Map.ZOOM);

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


const createCustomPopup = (hotel) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__avatar').src = hotel.autor.avatar;
  popupElement.querySelector('.popup__title').textContent = hotel.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = hotel.offer.adress;
  popupElement.querySelector('.popup__text--price').textContent = hotel.offer.price +'₽/ночь';
  popupElement.querySelector('.popup__type').textContent = hotel.offer.type;

  const roomPronounce = () => {
    let room;
    switch (hotel.offer.rooms % 10) {
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        room = `${hotel.offer.rooms} комнат`;
        break;
      case 2:
      case 3:
      case 4:
        room = `${hotel.offer.rooms} комнаты`;
        break;
      case 1:
        room = `${hotel.offer.rooms} комната`;
        break;  
    }
    return room;
  };

  const guestPronounce = () => {
    let guest;
    if (hotel.offer.guests % 10 === 1) {
      guest = `для ${hotel.offer.guests} гостя`;
    } else if (hotel.offer.guests % 10 > 1) {
      guest = `для ${hotel.offer.guests} гостей`;
    } else if (hotel.offer.guests === 'не для гостей') {
      guest = `${hotel.offer.guests}`; 
    }
    return guest;
  }

  popupElement.querySelector('.popup__text--capacity').textContent = `${roomPronounce()} ${guestPronounce()}`;
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;

  const popupWifi = (element) => element.indexOf('wifi', 0);
  const popupDishwasher = (element) => element.indexOf('dishwasher', 0);
  const popupParking = (element) => element.indexOf('parking', 0);
  const popupWasher = (element) => element.indexOf('washer', 0);
  const popupElevator = (element) => element.indexOf('elevator', 0);
  const popupConditioner = (element) => element.indexOf('conditioner', 0);

  const wiFiPopup = popupElement.querySelector('.popup__feature--wifi');
  wiFiPopup.classList.add('hidden');
  if(hotel.offer.features.map(popupWifi).indexOf(0, 0) !== -1) {wiFiPopup.classList.remove('hidden');};

  const dishWasherPopup = popupElement.querySelector('.popup__feature--dishwasher');
  dishWasherPopup.classList.add('hidden');
  if(hotel.offer.features.map(popupDishwasher).indexOf(0, 0) !== -1) {dishWasherPopup.classList.remove('hidden');};

  const parKingPopup = popupElement.querySelector('.popup__feature--parking');
  parKingPopup.classList.add('hidden');
  if(hotel.offer.features.map(popupParking).indexOf(0, 0) !== -1) {parKingPopup.classList.remove('hidden');};

  const wasHerPopup = popupElement.querySelector('.popup__feature--washer');
  wasHerPopup.classList.add('hidden');
  if(hotel.offer.features.map(popupWasher).indexOf(0, 0) !== -1) {wasHerPopup.classList.remove('hidden');};

  const eleVatorPopup = popupElement.querySelector('.popup__feature--elevator');
  eleVatorPopup.classList.add('hidden');
  if(hotel.offer.features.map(popupElevator).indexOf(0, 0) !== -1) {eleVatorPopup.classList.remove('hidden');};

  const condItionerPopup = popupElement.querySelector('.popup__feature--conditioner');
  condItionerPopup.classList.add('hidden');
  if(hotel.offer.features.map(popupConditioner).indexOf(0, 0) !== -1) {condItionerPopup.classList.remove('hidden');};

  const popupElementDescription = popupElement.querySelector('.popup__description');
  if(hotel.offer.description.length !== 0) {popupElementDescription.textContent = hotel.offer.description;};

  popupElement.querySelector('.popup__photo').src = hotel.offer.photos;
  const popupElementPhoto = popupElement.querySelector('.popup__photos');
  popupElementPhoto.classList.add('hidden');
  if(hotel.offer.photos !== '') {popupElementPhoto.classList.remove('hidden');};

  return popupElement;
};

promotions.forEach((hotel) => {
  const {
    location:{
      lat,
      lng
    }
  } = hotel;
  const adPin = L.marker({
    lat,
    lng, 
  },
  { draggable: false,
    icon: addPinIcon,
  });

  adPin
    .addTo(map)
    .bindPopup(createCustomPopup(hotel));
});


export {INITIAL_LAT, INITIAL_LNG, mainPinMarker};