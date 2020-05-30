import createLocationDateAndTime from './dateAndTime';
import createCurrentWeather from './currentWeather';
import { createSwiper, createForecast } from './forecast';
import { createMapContainer, createMap, createCoordinates } from './map';

const PAGE_ELEMENT = {
  weatherContainer: 'weather',
  hideWeatherContainer: 'weather_hidden',
  locationContaioner: 'location',
  hideLocationContaioner: 'location_hidden',
};

export const renderWeather = (state, currentWeather, forecastWeather) => {
  const weather = document.querySelector(`.${PAGE_ELEMENT.weatherContainer}`);
  const locationDateAndTime = createLocationDateAndTime(state.country, state.city,
    state.timeshift, state.lang);
  const current = createCurrentWeather(currentWeather, state.lang, state.units);
  const forecast = createSwiper();

  weather.classList.add(PAGE_ELEMENT.hideWeatherContainer);

  weather.addEventListener('transitionend', () => {
    weather.innerHTML = '';
    weather.append(locationDateAndTime);
    weather.append(current);
    weather.append(forecast);
    createForecast(forecastWeather, state.lang, state.units);
    weather.classList.remove(PAGE_ELEMENT.hideWeatherContainer);
  }, { once: true });
};

export const renderLocation = (state) => {
  const location = document.querySelector(`.${PAGE_ELEMENT.locationContaioner}`);
  const map = createMapContainer();
  const coordinates = createCoordinates(state.latitude, state.longitude, state.lang);

  location.classList.add(PAGE_ELEMENT.hideLocationContaioner);

  location.addEventListener('transitionend', () => {
    location.innerHTML = '';
    location.append(map);
    location.append(coordinates);
    createMap(state.latitude, state.longitude, map);
    location.classList.remove(PAGE_ELEMENT.hideLocationContaioner);
  }, { once: true });
};
