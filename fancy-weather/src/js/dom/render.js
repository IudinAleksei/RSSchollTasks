import createLocationDateAndTime from './dateAndTime';
import createCurrentWeather from './currentWeather';
import { createSwiper, createForecast } from './forecast';
import { createMap, createCoordinates } from './map';

const PAGE_ELEMENT = {
  weatherContainer: 'weather',
  locationContaioner: 'location',
};

export const renderWeather = (state, currentWeather, forecastWeather) => {
  const weather = document.querySelector(`.${PAGE_ELEMENT.weatherContainer}`);
  const locationDateAndTime = createLocationDateAndTime(state.country, state.city,
    state.timeshift, state.lang);
  const current = createCurrentWeather(currentWeather, state.lang, state.units);
  const forecast = createSwiper();

  weather.innerHTML = '';
  weather.append(locationDateAndTime);
  weather.append(current);
  weather.append(forecast);
  createForecast(forecastWeather, state.lang, state.units);
};

export const renderLocation = (state) => {
  const location = document.querySelector(`.${PAGE_ELEMENT.locationContaioner}`);
  const map = createMap(state.latitude, state.longitude);
  const coordinates = createCoordinates(state.latitude, state.longitude, state.lang);

  location.innerHTML = '';
  location.append(map);
  location.append(coordinates);
};
