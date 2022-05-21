import {INITIAL_LAT, INITIAL_LNG, mainPinMarker} from './map.js';

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

const getFormAbled = () => {
  const onSubmitForms = document.querySelectorAll('.ad-form, .map__filters');
  const onFieldsAndSelects = document.querySelectorAll('fieldset, .map__features, .ad-form-header, .ad-form__element, select, .map__filter');
  onSubmitForms.forEach((element) => {
    element.classList.remove('ad-form--disabled'); 
  })
  onFieldsAndSelects.forEach((element) => {
    (element.disabled = !element.disabled);
  })
};

const TimeCheckOut = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00'
}

const TypeOfHouse = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
}

const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const formTime = adForm.querySelector('.ad-form__element--time');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const guestNumber = capacity.querySelectorAll('option');

const onTimeIntoChange = () => {
  const timeInto = TimeCheckOut[timeIn.value];
  timeOut.value = timeInto;
};

formTime.addEventListener('change', onTimeIntoChange);

const onTypeHouseChange = () => {
  const minPrice = TypeOfHouse[type.value];
  price.placeholder = minPrice;
  price.min = minPrice;
}

const sliderElement = adForm.querySelector('.ad-form__slider');

const INITIAL_STATEMENT = `${TypeOfHouse.flat}`;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: INITIAL_STATEMENT,
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

type.addEventListener('change', () => {
  if (type.value === 'bungalow') {
    onTypeHouseChange();
    sliderElement.noUiSlider.set(0);
  }else if (type.value ==='flat') {
    onTypeHouseChange();
    sliderElement.noUiSlider.set(1000);
  }else if (type.value ==='hotel') {
    onTypeHouseChange();
    sliderElement.noUiSlider.set(3000);
  }else if (type.value ==='house') {
    onTypeHouseChange();
    sliderElement.noUiSlider.set(5000);
  }else if (type.value ==='palace') {
    onTypeHouseChange();
    sliderElement.noUiSlider.set(10000);
  }
});

const validateRooms = () => {
  const roomValue = roomNumber.value;

  guestNumber.forEach((guest) => {
    const isDisabled = (NumberOfGuests[roomValue].indexOf(guest.value) === -1);
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

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error' 
});

const requiredTitle = document.querySelector('#title');

pristine.addValidator(requiredTitle, function(value) {
  if (value.length !== 101){
    return true;
  }
  return false;
}, 'Максимальная длина 100 символов', 2, false);

const requiredPrice = document.querySelector('#price');

pristine.addValidator(requiredPrice, function(value) {
  if (value !== 100000){
    return true;
  }
  return false;
}, 'Максимальное значение — 100000', 2, false);


const requiredAddress = document.querySelector('#address');

pristine.addValidator(requiredAddress, function(value) {
  if (value.length !== 19){
    return true;
  }
  return false;
}, 'Максимальная длина 18 символов', 18, false);

adForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  } else {
    return true;
  }
  adForm.removeEventListener('submit', evt, false);
});

const resetButton = adForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  mainPinMarker.setLatLng({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG
  })
  sliderElement.noUiSlider.set(1000);
  resetButton.removeEventListener('click', evt, false);
});

export {getFormDisabled, getFormAbled};