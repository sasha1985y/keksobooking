import {promotions} from './data.js';

const template = document.querySelector('#card').content;
const templateContent = template.querySelector('.popup');
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

    const roomPronounce = () => {
      let room;
      switch (promotion.offer.rooms % 10) {
        case 0:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          room = `${promotion.offer.rooms} комнат`;
          break;
        case 2:
        case 3:
        case 4:
          room = `${promotion.offer.rooms} комнаты`;
          break;
        case 1:
          room = `${promotion.offer.rooms} комната`;
          break;  
      }
      return room;
    };

    const guestPronounce = () => {
      let guest;
      if (promotion.offer.guests % 10 === 1) {
        guest = `для ${promotion.offer.guests} гостя`;
      } else if (promotion.offer.guests % 10 > 1) {
        guest = `для ${promotion.offer.guests} гостей`;
      } else if (promotion.offer.guests === 'не для гостей') {
        guest = `${promotion.offer.guests}`; 
      }
      return guest;
    }
    
    clonedTemplateContent.querySelector('.popup__text--capacity').textContent = `${roomPronounce()} ${guestPronounce()}`;
    
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
    return fragment;
  };
  
};
export {addCardPlaceHolers};