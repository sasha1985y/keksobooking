const Urls = {
  GET: 'https://25.javascript.pages.academy/keksobooking/data',
  POST: 'https://25.javascript.pages.academy/keksobooking'
};

const sendRequest = (onSuccess, onError, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body,
    },
  ).then((response) => response.json())
  .then((data) => {
    onSuccess(data)
  })  
  .catch((error) => {
    onError(error);
  });
};

export {sendRequest};