import createLocationDateAndTime from './dateAndTime';
import createCurrentWeather from './currentWeather';
import { createSwiper, createForecast } from './forecast';
import { createMap, createCoordinates } from './map';

const PAGE_ELEMENT = {
  weatherContainer: 'weather',
  locationContaioner: 'location',
};

export const renderWeather = (country, city, timeshift, currentWeather, forecastWeather, lang) => {
  const weather = document.querySelector(`.${PAGE_ELEMENT.weatherContainer}`);
  const locationDateAndTime = createLocationDateAndTime(country, city, timeshift, lang);
  const current = createCurrentWeather(currentWeather, lang);
  const forecast = createSwiper();

  weather.innerHTML = '';
  weather.append(locationDateAndTime);
  weather.append(current);
  weather.append(forecast);
  createForecast(forecastWeather, lang);
};

export const renderLocation = (lat, lon, lang) => {
  const location = document.querySelector(`.${PAGE_ELEMENT.locationContaioner}`);
  const map = createMap(lat, lon);
  const coordinates = createCoordinates(lat, lon, lang);

  location.innerHTML = '';
  location.append(map);
  location.append(coordinates);
};
