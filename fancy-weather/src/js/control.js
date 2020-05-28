import { renderWeather, renderLocation } from './dom/render';
import { getUserLocation, getSearchedLocation, getLocationName } from './api/geolocation';
import { getAllWeather } from './api/getWeather';
import {
  hasSavedParams, getParams, setDefaultParams, setParams,
} from './utils/localStorage';
import { setSelectedLanguage, setSelectedUnits } from './utils/selectors';

const PAGE_ELEMENT = {
  controlContainer: 'control',
  input: 'search__input',
  langSelector: 'selectors__lang-selector',
  temperatureBtn: 'temp-button',
};

const CURRENT_STATE = {
  lang: 'en',
  city: '',
  country: '',
  latitude: '',
  longitude: '',
  timeshift: 0,
  units: 'celcius',
};

let currentWeather;

const setCurrentState = (state) => {
  CURRENT_STATE.lang = state.lang || CURRENT_STATE.lang;
  CURRENT_STATE.city = state.city || CURRENT_STATE.city;
  CURRENT_STATE.country = state.country || CURRENT_STATE.country;
  CURRENT_STATE.latitude = state.latitude || CURRENT_STATE.latitude;
  CURRENT_STATE.longitude = state.longitude || CURRENT_STATE.longitude;
  CURRENT_STATE.timeshift = state.timeshift || CURRENT_STATE.timeshift;
  CURRENT_STATE.units = state.units || CURRENT_STATE.units;
};

const renderAll = () => {
  renderWeather(CURRENT_STATE.country, CURRENT_STATE.city,
    CURRENT_STATE.timeshift, currentWeather, CURRENT_STATE.lang);
  renderLocation(CURRENT_STATE.latitude, CURRENT_STATE.longitude, CURRENT_STATE.lang);
};

const imageLoadHandler = () => {
  const imageLoaded = 0;
};

export const clickHandler = () => {
  const searchContainer = document.querySelector(`.${PAGE_ELEMENT.controlContainer}`);
  const langSelector = document.querySelector(`.${PAGE_ELEMENT.langSelector}`);
  const input = document.querySelector(`.${PAGE_ELEMENT.input}`);

  langSelector.addEventListener('change', async (event) => {
    event.preventDefault();
    setParams(langSelector.value);
    setSelectedLanguage(langSelector.value);
    setCurrentState({ lang: langSelector.value });
    [CURRENT_STATE.timeshift, currentWeather] = await getAllWeather(CURRENT_STATE.latitude,
      CURRENT_STATE.longitude, CURRENT_STATE.lang);
    const state = await getLocationName(CURRENT_STATE.latitude,
      CURRENT_STATE.longitude, CURRENT_STATE.lang);
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

    if (event.target.classList.contains(PAGE_ELEMENT.temperatureBtn)) {
      if (event.target.dataset.do !== CURRENT_STATE.units) {
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
      const state = await getSearchedLocation(input.value, CURRENT_STATE.lang);
      setCurrentState(state);
      [CURRENT_STATE.timeshift, currentWeather] = await getAllWeather(CURRENT_STATE.latitude,
        CURRENT_STATE.longitude, CURRENT_STATE.lang);
      renderAll();

      input.focus();
    }
  });
};

export const initStartState = async () => {
  if (!hasSavedParams()) {
    setDefaultParams();
  }

  const params = getParams();
  [CURRENT_STATE.lang, CURRENT_STATE.units] = params;
  setSelectedLanguage(CURRENT_STATE.lang);
  setSelectedUnits(CURRENT_STATE.units);

  const state = await getUserLocation(CURRENT_STATE.lang);
  setCurrentState(state);
  [CURRENT_STATE.timeshift, currentWeather] = await getAllWeather(CURRENT_STATE.latitude,
    CURRENT_STATE.longitude, CURRENT_STATE.lang);
  renderAll();
};

export const keyboardHandler = (units) => {
};
