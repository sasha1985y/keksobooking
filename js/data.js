import {shuffleArray, getRandomNumber, getRandomPositiveFloat} from './utilites.js';

const MIN_LATITUDE = 35.60000;
const MAX_LATITUDE = 35.69000;
const MIN_LONGTITUDE = 139.70000;
const MAX_LONGTITUDE = 139.76000;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 11;
const ARRAY_OFFER_OBJECTS = 10;

const PRICES = [
 0,
 1000,
 3000,
 5000,
 10000
];

const TITLES = [
  '',
  'у нас самые низкие цены',
  'обращайтесь к нам - не пожалеете',
  'такого комфорта вы нигде не найдёте',
  'любой каприз за ваши деньги',
  'без посредников,регистрации и смс'
];

const TYPES = [
  '',
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало',
  'Отель'
];

const ROOMS = [
  1,
  2,
  3,
  100
];

const GUESTS = [
  1,
  2,
  3,
  'не для гостей'
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS =[
  'нет тараканов',
  'всегда порядок',
  'чисто',
  'тихо',
  'нет шумных соседей',
  'спальный район',
  'прекрасный вид',
  'два балкона',
  'мансарда',
  'евроремонт',
  'большая кухня'
];

const PHOTOS = [
  '',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getLatitude = () => getRandomPositiveFloat(MIN_LATITUDE, MAX_LATITUDE);
const getLangtitude = () => getRandomPositiveFloat(MIN_LONGTITUDE, MAX_LONGTITUDE);
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


export {ROOMS, GUESTS, promotions};