import {INITIAL_LAT, INITIAL_LNG, mainPinMarker, onMapFiltersChange, map, Map} from './map.js';
import {sendRequest} from './fetch.js';
import {isEscapeKey} from './utilites.js';
import {resetImages} from './user-image-loader.js';

const MIN_BUNGALOW_PRICE = '0';
const MIN_FLAT_PRICE = '1000';
const MIN_HOTEL_PRICE = '3000';
const MIN_HOUSE_PRICE = '5000';
const MIN_PALACE_PRICE = '10000';
const REQUIRED_PRICE_MAX_VALUE = 100000;

const REQUIRED_ADDRESS_MAX_LENGTH = 18;
const REQUIRED_TITLE_MAX_LENGTH = 100;

//деактивация формы
const getFormDisabled = () => {
  const offSubmitForms = document.querySelectorAll('.ad-form, .map__filters');
  const offFieldsAndSelects = document.querySelectorAll('fieldset, .map__features, .ad-form-header, .ad-form__element, select, .map__filter');
  offSubmitForms.forEach((element) => {
    element.classList.add('ad-form--disabled'); 
  })
  offFieldsAndSelects.forEach((element) => {
    (element.disabled = !element.disabled); 
  })
};

//активация формы
const getFormAbled = () => {
  const submitForms = document.querySelectorAll('.ad-form, .map__filters');
  const onFieldsAndSelects = document.querySelectorAll('fieldset, .map__features, .ad-form-header, .ad-form__element, select, .map__filter');
  submitForms.forEach((element) => {
    element.classList.remove('ad-form--disabled'); 
  })
  onFieldsAndSelects.forEach((element) => {
    (element.disabled = !element.disabled);
  })
};

//объект типа жилища
const TypeOfHouse = {
  bungalow: MIN_BUNGALOW_PRICE,
  flat: MIN_FLAT_PRICE,
  hotel: MIN_HOTEL_PRICE,
  house: MIN_HOUSE_PRICE,
  palace: MIN_PALACE_PRICE
}

//объект соотношения числа комнат и гостей
const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const guestNumber = capacity.querySelectorAll('option');

//валидация въезда-выезда
const onTimeIntoChange = () => {
  timeOut.value = timeIn.value;
};

timeIn.addEventListener('change', onTimeIntoChange);

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeOut.addEventListener('change', onTimeOutChange);

//валидация комнат-гостей
const onTypeHouseChange = () => {
  const minPrice = TypeOfHouse[type.value];
  price.placeholder = minPrice;
  price.min = minPrice;
}

const sliderElement = adForm.querySelector('.ad-form__slider');

//начальные настройки слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: REQUIRED_PRICE_MAX_VALUE,
  },
  start: MIN_FLAT_PRICE,
  step: 1,
  connect: 'lower',

  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});


//валидация тип жилища-минимальная цена
type.addEventListener('change', () => {
  onTypeHouseChange();
  sliderElement.noUiSlider.set(parseInt(TypeOfHouse[type.value]), 10);
});

//валидация количества комнат-гостей
const validateRooms = () => {
  const roomValue = roomNumber.value;

  guestNumber.forEach((guest) => {
    const isDisabled = (NumberOfGuests[roomValue].includes(guest.value) === false);
    guest.selected = NumberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  })
};

validateRooms();

const onRoomNumberChange = () => {
  validateRooms();
};

roomNumber.addEventListener('change', onRoomNumberChange);

//валидация обязятельных полей с Pristine
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error' 
});

const requiredTitle = document.querySelector('#title');

pristine.addValidator(requiredTitle, (value) => {
  if (value.length !== REQUIRED_TITLE_MAX_LENGTH){
    return true;
  }
  return false;
}, 'Максимальная длина 100 символов', 2, false);

const requiredPrice = document.querySelector('#price');

pristine.addValidator(requiredPrice, (value) => {
  if (value !== REQUIRED_PRICE_MAX_VALUE){
    return true;
  }
  return false;
}, 'Максимальное значение — 100000', 2, false);


const requiredAddress = document.querySelector('#address');

pristine.addValidator(requiredAddress, function(value) {
  if (value.length <= REQUIRED_ADDRESS_MAX_LENGTH){
    return true;
  }
  return false;
}, 'Максимальная длина 18 символов', 2, false);

const messageSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const messageErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

//добавление-удаление сообщений об ошибке или успехе
const messageSuccess = messageSuccessTemplate.cloneNode(true);
const messageError = messageErrorTemplate.cloneNode(true);

const getSuccessMessage = () => {
  document.body.appendChild(messageSuccess);
};

const getErrorMessage = () => {
  document.body.appendChild(messageError);
};

const removeSuccessMessage = () => {
  if(messageSuccess) {
    messageSuccess.remove();
  }
};

const removeErrorMessage = () => {
  if(messageError) {
    messageError.remove();
  }
};

const submitButton = adForm.querySelector('.ad-form__submit');

//блокировка кнопок
const blockSubmitButton = () => {
  if(submitButton.disabled === false) {
    submitButton.disabled = true;
  }
};

const unBlockSubmitButton = () => {
  if(submitButton.disabled === true) {
    submitButton.disabled = false;
  }
};

//найдём-закроем открытый попап лефлета
const closeActivePopup = () => {
  const activePopup = document.querySelector('.leaflet-popup');
  if(activePopup) {
    activePopup.remove();
  }
}

const formMapFilters = document.querySelector('.map__filters');

//постпроцессы успеха-неуспеха
const onSuccess = () => {
  getSuccessMessage();
  adForm.reset();
  formMapFilters.reset();
  onMapFiltersChange();
  closeActivePopup();
  resetImages();
  mainPinMarker.setLatLng({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG
  })

  map.on('load', () => {
    addresses.value = `${initialCoordinates['lat']},${initialCoordinates['lng']}`;
    sendRequest(onSuccess, onError, 'GET');
  })
  
  .setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, Map.ZOOM);
  
  sliderElement.noUiSlider.set(MIN_FLAT_PRICE);
};

const onError = () => {
  getErrorMessage();
};

//отправка формы
const setFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      blockSubmitButton();
      sendRequest(onSuccess, onError, 'POST', new FormData(adForm));
    }
  });
};

//очистка формы
const resetButton = adForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  formMapFilters.reset();
  onMapFiltersChange();
  closeActivePopup();
  resetImages();
  mainPinMarker.setLatLng({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG
  })

  map.on('load', () => {
    addresses.value = `${initialCoordinates['lat']},${initialCoordinates['lng']}`;
    sendRequest(onSuccess, onError, 'GET');
  })
  
  .setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, Map.ZOOM);

  sliderElement.noUiSlider.set(MIN_FLAT_PRICE);
});

//очистка эскейп
const getEscapeCleaner = () => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeActivePopup();
      removeSuccessMessage();
      removeErrorMessage();
      unBlockSubmitButton();
      document.removeEventListener('keydown', evt)
    } else {
      document.removeEventListener('keydown', evt)
    }
  })
};
getEscapeCleaner();

//очистка кликом
messageSuccess.addEventListener('click', () => {
  removeSuccessMessage();
  unBlockSubmitButton();
});

messageError.addEventListener('click', () => {
  removeErrorMessage();
  unBlockSubmitButton();
});

//пробовать снова
const errorButton = messageError.querySelector('.error__button');
errorButton.addEventListener('click', () => {
  removeErrorMessage();
  unBlockSubmitButton();
});


export {getFormDisabled, getFormAbled, setFormSubmit};