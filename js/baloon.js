//контент балуна
const createCustomPopup = (hotel) => {
  const templateContent = document.querySelector('#card')
  .content
  .querySelector('.popup').cloneNode(true);

  const avatarState = templateContent.querySelector('.popup__avatar');
  if(hotel.author.avatar) {
    avatarState.src = hotel.author.avatar;
  }else {
    avatarState.remove();
  };
    
  const titleState = templateContent.querySelector('.popup__title');
  if(hotel.offer.title) {
    titleState.textContent = hotel.offer.title;
  }else {
    titleState.remove();
  };

  const adressState = templateContent.querySelector('.popup__text--address');
  if(hotel.offer.adress) {
    adressState.textContent = hotel.offer.adress;
  }else {
    adressState.remove();
  };

  const priceState = templateContent.querySelector('.popup__text--price');
  if(hotel.offer.price) {
    priceState.textContent = hotel.offer.price +'₽/ночь';
  }else {
    priceState.remove();
  };

  const typeState = templateContent.querySelector('.popup__type');
  if(hotel.offer.type) {
    typeState.textContent = hotel.offer.type;
  }else {
    typeState.remove();
  };

  const roomPronounce = () => {
    let room;
    switch (hotel.offer.rooms % 10) {
      case 2:
      case 3:
      case 4:
        room = `${hotel.offer.rooms} комнаты`;
        break;
      case 1:
        room = `${hotel.offer.rooms} комната`;
        break;
      default:
        room = `${hotel.offer.rooms} комнат`;  
    }
    return room;
  };

  const guestPronounce = () => {
    let guest;
    if (hotel.offer.guests % 10 === 1) {
      guest = `для ${hotel.offer.guests} гостя`;
    } else if (hotel.offer.guests % 10 > 1) {
      guest = `для ${hotel.offer.guests} гостей`;
    } else if (hotel.offer.guests === 0) {
      guest = `${hotel.offer.guests}`; 
    }
    return guest;
  };
    
  templateContent.querySelector('.popup__text--capacity').textContent = `${roomPronounce()} ${guestPronounce()}`;
    
  templateContent.querySelector('.popup__text--time').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;

  const wiFi = templateContent.querySelector('.popup__feature--wifi');
  wiFi.classList.add('hidden');
  if(hotel.offer.features && hotel.offer.features.includes('wifi') === true) {
    wiFi.classList.remove('hidden');
  }else {
    wiFi.remove();
  };

  const dishWasher = templateContent.querySelector('.popup__feature--dishwasher');
  dishWasher.classList.add('hidden');
  if(hotel.offer.features && hotel.offer.features.includes('dishwasher') === true) {
    dishWasher.classList.remove('hidden');
  }else {
    dishWasher.remove();
  };

  const parKing = templateContent.querySelector('.popup__feature--parking');
  parKing.classList.add('hidden');
  if(hotel.offer.features && hotel.offer.features.includes('parking') === true) {
    parKing.classList.remove('hidden');
  }else {
    parKing.remove();
  };

  const wasHer = templateContent.querySelector('.popup__feature--washer');
  wasHer.classList.add('hidden');
  if(hotel.offer.features && hotel.offer.features.includes('washer') === true) {
    wasHer.classList.remove('hidden');
  }else {
    wasHer.remove();
  };

  const eleVator = templateContent.querySelector('.popup__feature--elevator');
  eleVator.classList.add('hidden');
  if(hotel.offer.features && hotel.offer.features.includes('elevator') === true) {
    eleVator.classList.remove('hidden');
  }else {
    eleVator.remove();
  };

  const condItioner = templateContent.querySelector('.popup__feature--conditioner');
  condItioner.classList.add('hidden');
  if(hotel.offer.features && hotel.offer.features.includes('conditioner') === true) {
    condItioner.classList.remove('hidden');
  }else {
    condItioner.remove();
  };
    
  const popupDescription = templateContent.querySelector('.popup__description');
  if(hotel.offer.description) {
    popupDescription.textContent = hotel.offer.description;
  }else {
    popupDescription.remove();
  };

  const popupPhoto = templateContent.querySelector('.popup__photo');
  if('photos' in hotel.offer) {
    popupPhoto.src = hotel.offer.photos;
  }else {
   popupPhoto.remove();
  };
  
  return templateContent;
};

export {createCustomPopup};