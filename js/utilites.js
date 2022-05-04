import {
  MIN_LATITUDE,
  MAX_LATITUDE,
  MIN_LONGTITUDE,
  MAX_LONGTITUDE,
  MIN_AVATAR_NUMBER,
  MAX_AVATAR_NUMBER,
  TITLES,
  TYPES,
  CHECKINS,
  CHECKOUTS,
  FEATURES,
  DESCRIPTIONS,
  PHOTOS,
  PRICES,
  ARRAY_OFFER_OBJECTS,
  ROOMS,
  GUESTS
} from './data.js';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomNumber = (a, b) => {
  const minimum = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const maximum = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  return result;
};

const getRandomDigits = () => getRandomNumber(1, 5);

function getRandomPositiveFloat (a, b, digits = getRandomDigits()) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return + result.toFixed(digits);
}

//const latitudeDecimal = Math.random().toFixed(5);
//const langtitudeDecimal = Math.random().toFixed(5);

const getLatitude = () => getRandomPositiveFloat(MIN_LATITUDE, MAX_LATITUDE);
const getLangtitude = () => getRandomPositiveFloat(MIN_LONGTITUDE, MAX_LONGTITUDE);
//const getCoordinates = () => (`${(getLatitude() - latitudeDecimal).toFixed(5)}, ${(getLangtitude() - langtitudeDecimal).toFixed(5)}`);
const getCoordinates2 = () => (`${getLatitude()}, ${getLangtitude()}`);

const getAvatar = () => {
  const randomAva = getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER);
  if (randomAva < 10) {
    return `img/avatars/user0${randomAva}.png`
  }return `img/avatars/user${randomAva}.png`
};

const getRandomTitle = () => {
  const titleIndex =  getRandomNumber(0, TITLES.length - 1);
  return TITLES[titleIndex];
};

const addService = () => ({
  autor: {
    avatar: getAvatar()
  },
  offer: {
    title: getRandomTitle(),
    adress: getCoordinates2(),
    price: PRICES[getRandomNumber(0, PRICES.length -1)],
    type: TYPES[getRandomNumber(0, TYPES.length -1)],
    rooms: ROOMS[getRandomNumber(0, ROOMS.length -1)],
    guests: GUESTS[getRandomNumber(0, GUESTS.length -1)],
    checkin: CHECKINS[getRandomNumber(0, CHECKINS.length -1)],
    checkout: CHECKOUTS[getRandomNumber(0, CHECKOUTS.length -1)],
    features: shuffleArray(FEATURES).slice(0, getRandomNumber(0, FEATURES.length)),
    description: shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(0, DESCRIPTIONS.length)),
    photos: PHOTOS[getRandomNumber(0, PHOTOS.length -1)]
  },
  location: {
    lat: getLatitude(),
    lng: getLangtitude()
  }
});

const promotions = Array.from({length: ARRAY_OFFER_OBJECTS},addService);

export {promotions};

console.log(promotions);
