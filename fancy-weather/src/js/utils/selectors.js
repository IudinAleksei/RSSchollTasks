import PAGE_ELEMENT from '../constants/constants';

export const setSelectedLanguage = (lang = 'en') => {
  const langSelector = document.querySelector(`.${PAGE_ELEMENT.langSelector}`);
  const langOptions = Array.from(langSelector.children);
  langOptions.forEach((option) => {
    option.removeAttribute('selected');
    if (option.value === lang) {
      option.setAttribute('selected', 'selected');
    }
  });
};

export const setSelectedUnits = (units) => {
  const temperatureBtns = document.querySelectorAll(`.${PAGE_ELEMENT.temperatureBtn}`);
  temperatureBtns.forEach((button) => {
    button.classList.remove(PAGE_ELEMENT.unactiveTemperatureBtn);
    if (button.dataset.do !== units) {
      button.classList.add(PAGE_ELEMENT.unactiveTemperatureBtn);
    }
  });
};
