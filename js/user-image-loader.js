const FILE_TYPES = ['svg', 'jpg', 'jpeg', 'png', 'gif'];
const TIME_DELETE_ERROR = 5000;
const MAX_LENGTH_LOADING_IMAGES = 3;


const errorContainers = document.querySelectorAll('.ad-form-header, .ad-form__element--file');
const adForm = document.querySelector('.ad-form');
const avatarChooser = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('#avatar-preview');
const defaultAvatarPreview = avatarPreview.src;
const flatChooser = adForm.querySelector('#images');
const flatImageContainer = adForm.querySelector('.ad-form__photo');

const checkMatches = (element) => FILE_TYPES.some((it) => element.endsWith(it));

const showErrorMessage = (containers) => {
  const container = containers;
  const element = document.createElement('div');
  element.style.color = 'red';
  element.textContent = 'Ошибка загрузки файла';
  container.append(element);
  setTimeout(() => {
    element.remove();
  }, TIME_DELETE_ERROR);
};

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = checkMatches(fileName);

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  } else {
    showErrorMessage(errorContainers[0]);
  }
});

const createImage = () => {
  const image = document.createElement('img');
  image.style.maxWidth = '100%';
  image.style.objectFit = 'cover';
  
  return image;
};

flatImageContainer.style.display = 'flex';
flatImageContainer.style.gap = '5px';

flatChooser.addEventListener('change', () => {
  const files = Array.from(flatChooser.files);

  files.forEach((file) => {
    const fileName = file.name.toLowerCase();
    const matches = checkMatches(fileName);
    
    if (matches) {
      const image = createImage();
      image.src = URL.createObjectURL(file);
      if (flatImageContainer.children.length < MAX_LENGTH_LOADING_IMAGES) {
        flatImageContainer.append(image);
      } else {
        flatImageContainer.children[flatImageContainer.children.length - 1].remove();
        flatImageContainer.insertAdjacentElement('afterbegin', image);
      }
    } else {
      showErrorMessage(errorContainers[1]);
    }
  });
});

const resetImages = () => {
  const images = Array.from(flatImageContainer.children);
  avatarPreview.src = defaultAvatarPreview;

  if (images.length > 0) {
    images.forEach((image) => image.remove());
  }
};

export {resetImages};