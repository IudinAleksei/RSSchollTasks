import { renderWeather, renderLocation } from './dom/render';
import { getUserLocation, getSearchedLocation } from './api/geolocation';
import { getAllWeather } from './api/network';
import {
  hasSavedParams, getParams, setDefaultParams, setParams,
} from './utils/localStorage';
import { setSelectedLanguage, setSelectedUnits } from './utils/selectors';

const pageElement = {
  controlContainer: 'control',
  input: 'search__input',
  langSelector: 'selectors__lang-selector',
  temperatureBtn: 'temp-button',
};

const currentState = {
  lang: 'en',
  city: '',
  country: '',
  latitude: '',
  longitude: '',
  timeshift: 0,
  units: 'celcius',
};

const setCurrentStateAndRender = (state) => {
  currentState.lang = state.lang || currentState.lang;
  currentState.city = state.city || currentState.city;
  currentState.country = state.country || currentState.country;
  currentState.latitude = state.latitude || currentState.latitude;
  currentState.longitude = state.longitude || currentState.longitude;
  currentState.timeshift = state.timeshift || currentState.timeshift;
  currentState.units = state.units || currentState.units;

  renderWeather(currentState.country, currentState.city,
    currentState.timeshift, currentState.lang);
  renderLocation(currentState.latitude, currentState.longitude, currentState.lang);
};

const imageLoadHandler = () => {
  const imageLoaded = 0;
};

export const clickHandler = () => {
  const searchContainer = document.querySelector(`.${pageElement.controlContainer}`);
  const langSelector = document.querySelector(`.${pageElement.langSelector}`);
  const input = document.querySelector(`.${pageElement.input}`);

  langSelector.addEventListener('change', async (event) => {
    event.preventDefault();
    const state = Object.assign(await getUserLocation(langSelector.value),
      { lang: langSelector.value });
    setParams(langSelector.value);
    setSelectedLanguage(langSelector.value);
    setCurrentStateAndRender(state);
  });

  searchContainer.addEventListener('click', async (event) => {
    event.preventDefault();

    if (event.target.dataset.do === 'clear') {
      input.value = '';
      input.focus();
      return;
    }

    if (event.target.classList.contains(pageElement.temperatureBtn)) {
      if (event.target.dataset.do !== currentState.units) {
        const state = { units: event.target.dataset.do };
        setParams(false, event.target.dataset.do);
        setSelectedUnits(event.target.dataset.do);
        setCurrentStateAndRender(state);
      }
      return;
    }

    if (event.target.dataset.do === 'bg-change') {
      return;
    }

    if (event.target.dataset.do === 'search') {
      const state = await getSearchedLocation(input.value, currentState.lang);
      setCurrentStateAndRender(state);

      input.focus();
    }
  });
};

export const initStartState = async () => {
  if (!hasSavedParams()) {
    setDefaultParams();
  }
  const params = getParams();
  [currentState.lang, currentState.units] = params;
  setSelectedLanguage(currentState.lang);
  setSelectedUnits(currentState.units);
  const state = await getUserLocation(currentState.lang);
  setCurrentStateAndRender(state);
};

export const keyboardHandler = (units) => {
};
