import { renderWeather, renderLocation } from './dom/render';
import { getUserLocation, getSearchedLocation, getGeolocation } from './api/geolocation';
import { getAllWeather } from './api/getWeather';
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

const setCurrentState = (state) => {
  currentState.lang = state.lang || currentState.lang;
  currentState.city = state.city || currentState.city;
  currentState.country = state.country || currentState.country;
  currentState.latitude = state.latitude || currentState.latitude;
  currentState.longitude = state.longitude || currentState.longitude;
  currentState.timeshift = state.timeshift || currentState.timeshift;
  currentState.units = state.units || currentState.units;
};

const renderAll = () => {
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
    setCurrentState(state);
    renderAll();
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
        setCurrentState(state);
        renderAll();
      }
      return;
    }

    if (event.target.dataset.do === 'bg-change') {
      return;
    }

    if (event.target.dataset.do === 'search') {
      const state = await getSearchedLocation(input.value, currentState.lang);
      setCurrentState(state);
      [currentState.timeshift] = await getAllWeather(currentState.latitude, currentState.longitude, currentState.lang);
      renderAll();

      input.focus();
    }
  });
};

export const initStartState = async () => {
  // getGeolocation();
  if (!hasSavedParams()) {
    setDefaultParams();
  }

  const params = getParams();
  [currentState.lang, currentState.units] = params;
  setSelectedLanguage(currentState.lang);
  setSelectedUnits(currentState.units);

  const state = await getUserLocation(currentState.lang);
  setCurrentState(state);
  [currentState.timeshift] = await getAllWeather(currentState.latitude, currentState.longitude, currentState.lang);
  renderAll();
};

export const keyboardHandler = (units) => {
};
