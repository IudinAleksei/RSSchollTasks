import { PAGE_ELEMENT, COMMANDS } from './constants/constants';
import { renderWeather, renderLocation } from './dom/render';
import { getUserLocation, getSearchedLocation, getLocationName } from './api/geolocation';
import { getAllWeather } from './api/getWeather';
import { getAndInitParams, setParams } from './utils/localStorage';
import { setSelectedLanguage, setSelectedUnits } from './utils/selectors';
import messageForUser from './utils/messageForUser';
import createBackground from './dom/background';
import getKeywords from './utils/keywords';
import { unhideWelcomeLayer } from './dom/animationLayer';
import { speakWeather, initSpeechRecognition } from './utils/speech';

const CURRENT_STATE = {
  lang: 'en',
  city: 'Moscow',
  country: 'Russia',
  latitude: '55.755814',
  longitude: '37.617635',
  timeshift: 10800,
  units: 'celcius',
  imageApiStatus: 'false',
};

let currentWeather;
let forecast;
let recognition;

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

const changeLanguageHandler = () => {
  const langSelector = document.querySelector(`.${PAGE_ELEMENT.langSelector}`);

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
};

const getVolume = () => {
  const range = document.querySelector(`.${PAGE_ELEMENT.volumeRange}`);
  const currentVolume = range.value;

  return currentVolume;
};

const changeVolume = (increase = true) => {
  const range = document.querySelector(`.${PAGE_ELEMENT.volumeRange}`);
  const STEP = 0.1;
  let volume;
  if (increase) {
    volume = +range.value + STEP;
  } else {
    volume = +range.value - STEP;
  }
  range.value = volume;

  return volume;
};

const changeBackground = async () => {
  const keywords = getKeywords(CURRENT_STATE.timeshift, CURRENT_STATE.latitude);

  const report = await createBackground(keywords);

  if (report) {
    messageForUser('');
  } else {
    messageForUser('Image API error');
  }

  return report;
};

const doSearch = async (input) => {
  const state = await getSearchedLocation(input.value, CURRENT_STATE.lang);
  if (state === 'Location search error' || state === 'No results') {
    messageForUser(state);
    return;
  }

  setCurrentState(state);

  const weatherResponse = await getAllWeather(
    CURRENT_STATE.latitude, CURRENT_STATE.longitude, CURRENT_STATE.lang,
  );

  if (weatherResponse === 'Unable to get a response from weather API') {
    messageForUser(weatherResponse);
    return;
  }
  messageForUser('');

  [CURRENT_STATE.timeshift, currentWeather, forecast] = weatherResponse;

  CURRENT_STATE.imageApiStatus = await changeBackground();

  renderAll();
};

const speechHandler = (input, rec) => {
  const inp = input;
  rec.addEventListener('result', async (event) => {
    const recognitionArray = Array.from(event.results).reverse();
    const word = recognitionArray[0][0].transcript.replace(/^\s/, '');
    // для проверяющих в консоль выводится результат распознавания
    // eslint-disable-next-line no-console
    console.log(`Recognized as: ${word}`);

    if (COMMANDS.weather.includes(word)) {
      speakWeather(forecast, CURRENT_STATE.lang, getVolume());
      return;
    }
    if (COMMANDS.louder.includes(word)) {
      changeVolume(true);
      return;
    }
    if (COMMANDS.quieter.includes(word)) {
      changeVolume(false);
      return;
    }

    if (COMMANDS.background.includes(word)) {
      CURRENT_STATE.imageApiStatus = await changeBackground();
      return;
    }

    inp.value = word;
    await doSearch(input);
  });
};

const clickHandler = () => {
  const searchContainer = document.querySelector(`.${PAGE_ELEMENT.controlContainer}`);
  const input = document.querySelector(`.${PAGE_ELEMENT.input}`);

  searchContainer.addEventListener('click', async (event) => {
    event.preventDefault();
    const clickedButton = event.target;

    if (clickedButton.dataset.do === 'speak') {
      speakWeather(forecast, CURRENT_STATE.lang, getVolume());
      return;
    }

    if (clickedButton.dataset.do === 'mic') {
      const autoContinue = () => recognition.start();
      if (clickedButton.dataset.mode === 'on') {
        clickedButton.dataset.mode = 'off';

        recognition.onend = false;
        recognition.stop();
        return;
      }

      recognition = initSpeechRecognition(CURRENT_STATE.lang);

      recognition.start();

      recognition.onend = autoContinue;

      clickedButton.dataset.mode = 'on';

      speechHandler(input, recognition);

      return;
    }

    if (clickedButton.dataset.do === 'clear') {
      input.value = '';
      input.focus();
      return;
    }

    if (clickedButton.classList.contains(PAGE_ELEMENT.temperatureBtn)) {
      if (event.target.dataset.do !== CURRENT_STATE.units) {
        const state = { units: event.target.dataset.do };

        setParams(false, event.target.dataset.do);
        setSelectedUnits(event.target.dataset.do);
        setCurrentState(state);

        renderWeather(CURRENT_STATE, currentWeather, forecast);
      }
      return;
    }

    if (clickedButton.dataset.do === 'bg-change') {
      CURRENT_STATE.imageApiStatus = await changeBackground();
      return;
    }

    if (clickedButton.dataset.do === 'search') {
      await doSearch(input);

      input.focus();
    }
  });
};

export const userEventHandler = () => {
  changeLanguageHandler();
  clickHandler();
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
  messageForUser('');

  [CURRENT_STATE.timeshift, currentWeather, forecast] = weatherResponse;

  CURRENT_STATE.imageApiStatus = await changeBackground();

  renderAll();
  unhideWelcomeLayer(false);
};
