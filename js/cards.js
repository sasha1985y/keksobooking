import {promotions} from './utilites.js';
import {ROOMS, GUESTS} from './data.js';

const template = document.querySelector('#card').content;
const templateContent = template.querySelector('.popup');
const blockCard = document.getElementById('map-canvas');
const fragment = document.createDocumentFragment();





const addCardPlaceHolers = () => {
  for (let a = 0; a < promotions.length; a++) {
    const promotion = promotions[a];
    const clonedTemplateContent = templateContent.cloneNode(true);

    clonedTemplateContent.querySelector('.popup__avatar').src = promotion.autor.avatar;
    clonedTemplateContent.querySelector('.popup__title').textContent = promotion.offer.title;
    clonedTemplateContent.querySelector('.popup__text--address').textContent = promotion.offer.adress;
    clonedTemplateContent.querySelector('.popup__text--price').textContent = promotion.offer.price +'₽/ночь';
    clonedTemplateContent.querySelector('.popup__type').textContent = promotion.offer.type;

    const popupCapacity = clonedTemplateContent.querySelector('.popup__text--capacity');
    if(promotion.offer.rooms === ROOMS[0] && promotion.offer.guests === GUESTS[0]) {
      popupCapacity.textContent = `${ROOMS[0]} комната для ${GUESTS[0]} гостя`;
    } else if (promotion.offer.rooms === ROOMS[0] && promotion.offer.guests === GUESTS[1]) {
      popupCapacity.textContent = `${ROOMS[0]} комната для ${GUESTS[1]} гостей`;
    } else if (promotion.offer.rooms === ROOMS[0] && promotion.offer.guests === GUESTS[2]) {
      popupCapacity.textContent = `${ROOMS[0]} комната для ${GUESTS[2]} гостей`; 
    } else if (promotion.offer.rooms === ROOMS[0] && promotion.offer.guests === GUESTS[3]) {
      popupCapacity.textContent = `${ROOMS[0]} комната ${GUESTS[3]}`;
    } else if(promotion.offer.rooms === ROOMS[1] && promotion.offer.guests === GUESTS[0]) {
      popupCapacity.textContent = `${ROOMS[1]} комнаты для ${GUESTS[0]} гостя`;
    } else if (promotion.offer.rooms === ROOMS[1] && promotion.offer.guests === GUESTS[1]) {
      popupCapacity.textContent = `${ROOMS[1]} комнаты для ${GUESTS[1]} гостей`;
    } else if (promotion.offer.rooms === ROOMS[1] && promotion.offer.guests === GUESTS[2]) {
      popupCapacity.textContent = `${ROOMS[1]} комнаты для ${GUESTS[2]} гостей`; 
    } else if (promotion.offer.rooms === ROOMS[1] && promotion.offer.guests === GUESTS[3]) {
      popupCapacity.textContent = `${ROOMS[1]} комнаты ${GUESTS[3]}`;
    } else if(promotion.offer.rooms === ROOMS[2] && promotion.offer.guests === GUESTS[0]) {
      popupCapacity.textContent = `${ROOMS[2]} комнаты для ${GUESTS[0]} гостя`;
    } else if (promotion.offer.rooms === ROOMS[2] && promotion.offer.guests === GUESTS[1]) {
      popupCapacity.textContent = `${ROOMS[2]} комнаты для ${GUESTS[1]} гостей`;
    } else if (promotion.offer.rooms === ROOMS[2] && promotion.offer.guests === GUESTS[2]) {
      popupCapacity.textContent = `${ROOMS[2]} комнаты для ${GUESTS[2]} гостей`; 
    } else if (promotion.offer.rooms === ROOMS[2] && promotion.offer.guests === GUESTS[3]) {
      popupCapacity.textContent = `${ROOMS[2]} комнаты ${GUESTS[3]}`;
    } else if(promotion.offer.rooms === ROOMS[3] && promotion.offer.guests === GUESTS[0]) {
      popupCapacity.textContent = `${ROOMS[3]} комнат для ${GUESTS[0]} гостя`;
    } else if (promotion.offer.rooms === ROOMS[3] && promotion.offer.guests === GUESTS[1]) {
      popupCapacity.textContent = `${ROOMS[3]} комнат для ${GUESTS[1]} гостей`;
    } else if (promotion.offer.rooms === ROOMS[3] && promotion.offer.guests === GUESTS[2]) {
      popupCapacity.textContent = `${ROOMS[3]} комнат для ${GUESTS[2]} гостей`; 
    } else if (promotion.offer.rooms === ROOMS[3] && promotion.offer.guests === GUESTS[3]) {
      popupCapacity.textContent = `${ROOMS[3]} комнат ${GUESTS[3]}`;
    };


    clonedTemplateContent.querySelector('.popup__text--time').textContent = 'Заезд после ' + promotion.offer.checkin + ', выезд до ' + promotion.offer.checkout;
    
    const featureWifi = (element) => element.indexOf('wifi', 0);
    const featureDishwasher = (element) => element.indexOf('dishwasher', 0);
    const featureParking = (element) => element.indexOf('parking', 0);
    const featureWasher = (element) => element.indexOf('washer', 0);
    const featureElevator = (element) => element.indexOf('elevator', 0);
    const featureConditioner = (element) => element.indexOf('conditioner', 0);

    const wiFi = clonedTemplateContent.querySelector('.popup__feature--wifi');
    wiFi.classList.add('hidden');
    if(promotion.offer.features.map(featureWifi).indexOf(0, 0) !== -1) {wiFi.classList.remove('hidden');};

    const dishWasher = clonedTemplateContent.querySelector('.popup__feature--dishwasher');
    dishWasher.classList.add('hidden');
    if(promotion.offer.features.map(featureDishwasher).indexOf(0, 0) !== -1) {dishWasher.classList.remove('hidden');};

    const parKing = clonedTemplateContent.querySelector('.popup__feature--parking');
    parKing.classList.add('hidden');
    if(promotion.offer.features.map(featureParking).indexOf(0, 0) !== -1) {parKing.classList.remove('hidden');};

    const wasHer = clonedTemplateContent.querySelector('.popup__feature--washer');
    wasHer.classList.add('hidden');
    if(promotion.offer.features.map(featureWasher).indexOf(0, 0) !== -1) {wasHer.classList.remove('hidden');};

    const eleVator = clonedTemplateContent.querySelector('.popup__feature--elevator');
    eleVator.classList.add('hidden');
    if(promotion.offer.features.map(featureElevator).indexOf(0, 0) !== -1) {eleVator.classList.remove('hidden');};

    const condItioner = clonedTemplateContent.querySelector('.popup__feature--conditioner');
    condItioner.classList.add('hidden');
    if(promotion.offer.features.map(featureConditioner).indexOf(0, 0) !== -1) {condItioner.classList.remove('hidden');};
    
    const popupDescription = clonedTemplateContent.querySelector('.popup__description');
    if(promotion.offer.description.length !== 0) {popupDescription.textContent = promotion.offer.description;};

    clonedTemplateContent.querySelector('.popup__photo').src = promotion.offer.photos;
    const popupPhoto = clonedTemplateContent.querySelector('.popup__photos');
    popupPhoto.classList.add('hidden');
    if(promotion.offer.photos !== '') {popupPhoto.classList.remove('hidden');};

    fragment.appendChild(clonedTemplateContent);
    blockCard.appendChild(fragment);
    
  };
  return blockCard;
  
}
const findFeatures = (element) => element.offer.features;
console.log(addCardPlaceHolers(),promotions.map(findFeatures));