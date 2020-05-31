import PAGE_ELEMENT from './constants/constants';
import { renderWeather, renderLocation } from './dom/render';
import { getUserLocation, getSearchedLocation, getLocationName } from './api/geolocation';
import { getAllWeather } from './api/getWeather';
import { getAndInitParams, setParams } from './utils/localStorage';
import { setSelectedLanguage, setSelectedUnits } from './utils/selectors';
import messageForUser from './utils/messageForUser';
import createBackground from './dom/background';
import getKeywords from './utils/keywords';
import { unhideWelcomeLayer } from './dom/animationLayer';

const CURRENT_STATE = {
  lang: 'en',
  city: 'Moscow',
  country: 'Russia',
  latitude: '55.755814',
  longitude: '37.617635',
  timeshift: 10800,
  units: 'celcius',
};

let currentWeather;
let forecast;

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
  renderWeather(CURRENT_STATE, currentWeather, forecast);
  renderLocation(CURRENT_STATE);
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

    const weatherResponse = await getAllWeather(
      CURRENT_STATE.latitude, CURRENT_STATE.longitude, CURRENT_STATE.lang,
    );

    if (weatherResponse === 'Unable to get a response from weather API') {
      messageForUser(weatherResponse);
      return;
    }

    [CURRENT_STATE.timeshift, currentWeather, forecast] = weatherResponse;

    const state = await getLocationName(CURRENT_STATE.latitude,
      CURRENT_STATE.longitude, CURRENT_STATE.lang);

    if (state === 'Geocode API error') {
      messageForUser(state);
      return;
    }

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

        renderWeather(CURRENT_STATE, currentWeather, forecast);
      }
      return;
    }

    if (event.target.dataset.do === 'bg-change') {
      const keywords = getKeywords(CURRENT_STATE.timeshift, CURRENT_STATE.latitude);

      // возможна ошибка unsplash
      const report = await createBackground(keywords);
      return;
    }

    if (event.target.dataset.do === 'search') {
      // возможна ошибка
      const state = await getSearchedLocation(input.value, CURRENT_STATE.lang);

      setCurrentState(state);
      const keywords = getKeywords(CURRENT_STATE.timeshift, CURRENT_STATE.latitude);
      // возможна ошибка unsplash
      // const report = await createBackground(keywords);

      // console.log(report);

      const weatherResponse = await getAllWeather(
        CURRENT_STATE.latitude, CURRENT_STATE.longitude, CURRENT_STATE.lang,
      );

      if (weatherResponse === 'Unable to get a response from weather API') {
        messageForUser(weatherResponse);
        return;
      }

      [CURRENT_STATE.timeshift, currentWeather, forecast] = weatherResponse;

      renderAll();

      input.focus();
    }
  });
};

export const initStartState = async () => {
  unhideWelcomeLayer(true);

  const params = getAndInitParams();
  [CURRENT_STATE.lang, CURRENT_STATE.units] = params;
  setSelectedLanguage(CURRENT_STATE.lang);
  setSelectedUnits(CURRENT_STATE.units);

  const state = await getUserLocation(CURRENT_STATE.lang);

  if (state.message === 'Your location cannot be determined' || state === 'Geocode API error') {
    messageForUser(state);
  } else {
    setCurrentState(state);
  }

  const weatherResponse = await getAllWeather(
    CURRENT_STATE.latitude, CURRENT_STATE.longitude, CURRENT_STATE.lang,
  );

  if (weatherResponse === 'Unable to get a response from weather API') {
    messageForUser(weatherResponse);
    return;
  }

  [CURRENT_STATE.timeshift, currentWeather, forecast] = weatherResponse;

  const keywords = getKeywords(CURRENT_STATE.timeshift, CURRENT_STATE.latitude);

  // возможна ошибка unsplash
  // const report = await createBackground(keywords);

  // console.log(report);

  renderAll();
  unhideWelcomeLayer(false);
};
