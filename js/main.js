import './data.js';
import './utilites.js';
import {addCardPlaceHolers} from './cards.js';
import {getFormDisabled} from './form.js';
import './map.js';

const blockCard = document.getElementById('map-canvas');
blockCard.appendChild(addCardPlaceHolers());

getFormDisabled();