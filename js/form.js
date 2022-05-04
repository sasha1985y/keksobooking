const getFormDisabled = () => {
  const form = document.querySelector('.ad-form');
  form.classList.add('ad-form--disabled');
  const fieldFormHeader = form.querySelector('.ad-form-header');
  fieldFormHeader.setAttribute('disabled', true);
  const fieldFormElements = form.querySelectorAll('.ad-form__element');
  fieldFormElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('ad-form--disabled');
  const selectMapFilters = mapFilters.querySelectorAll('.map__filter');
  selectMapFilters.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  const mapFeatures = mapFilters.querySelector('.map__features');
  mapFeatures.setAttribute('disabled', true);
}
//getFormDisabled();