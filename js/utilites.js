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

const getRandomDigits = () => getRandomNumber(5, 5);

function getRandomPositiveFloat (a, b, digits = getRandomDigits()) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return + result.toFixed(digits);
};

export {shuffleArray, getRandomNumber, getRandomPositiveFloat};
