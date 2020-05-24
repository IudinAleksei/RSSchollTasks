import createLocationDateAndTime from './dateAndTime';
import createCurrentWeather from './currentWeather';
import { createSwiper, createForecast } from './forecast';
import { createMap, createCoordinates } from './map';

const pageElement = {
  weatherContainer: 'weather',
  locationContaioner: 'location',
};

const assets = {
};

export const renderWeather = (country, city, timeshift, lang) => {
  const weather = document.querySelector(`.${pageElement.weatherContainer}`);
  const locationDateAndTime = createLocationDateAndTime(country, city, timeshift, lang);
  const current = createCurrentWeather();
  const forecast = createSwiper();

  weather.innerHTML = '';
  weather.append(locationDateAndTime);
  weather.append(current);
  weather.append(forecast);
  createForecast();
};

export const renderLocation = (lat, lon, lang) => {
  const location = document.querySelector(`.${pageElement.locationContaioner}`);
  const map = createMap(lat, lon);
  const coordinates = createCoordinates(lat, lon, lang);

  location.innerHTML = '';
  location.append(map);
  location.append(coordinates);
};
