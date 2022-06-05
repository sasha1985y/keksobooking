const DEBOUNCE_INTERVAL = 500;

const debounce = (callback, timeoutDelay = DEBOUNCE_INTERVAL) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const createCustomError = (error) => {
  const errorImg = document.createElement('img');
  const errorDiv = document.createElement('div');
  const errorPopup = document.createElement('span');
  errorDiv.appendChild(errorImg);
  errorImg.classList.add('error-img');
  errorImg.src = 'img/spot.png';
  errorImg.alt = 'табло_ошибки';
  errorDiv.appendChild(errorPopup);
  const errorPlace = document.querySelector('.ad-form__element--submit');
  errorPlace.appendChild(errorDiv);
  errorDiv.classList.add('error-style');
  errorPopup.textContent = `${error}`;
};

const isEscapeKey = (evt) => evt.key === 'Escape';


export {debounce, createCustomError, isEscapeKey};
