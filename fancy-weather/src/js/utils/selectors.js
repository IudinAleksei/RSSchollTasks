const pageElement = {
  langSelector: 'selectors__lang-selector',
  temperatureBtn: 'temp-button',
  unactiveTemperatureBtn: 'temp-button_unactive',
};

export const setSelectedLanguage = (lang = 'en') => {
  const langSelector = document.querySelector(`.${pageElement.langSelector}`);
  const langOptions = Array.from(langSelector.children);
  langOptions.forEach((option) => {
    option.removeAttribute('selected');
    if (option.value === lang) {
      option.setAttribute('selected', 'selected');
    }
  });
};

export const setSelectedUnits = (units) => {
  const temperatureBtns = document.querySelectorAll(`.${pageElement.temperatureBtn}`);
  temperatureBtns.forEach((button) => {
    button.classList.remove(pageElement.unactiveTemperatureBtn);
    if (button.dataset.do !== units) {
      button.classList.add(pageElement.unactiveTemperatureBtn);
    }
  });
};
