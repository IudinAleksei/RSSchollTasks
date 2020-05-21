import createLocationDateAndTime from './dateAndTime';
import createCurrentWeather from './currentWeather';
import { createSwiper, createForecast } from './forecast';

const pageElement = {
  weatherContainer: 'weather',
};

const assets = {
};

const renderWeather = () => {
  const weather = document.querySelector(`.${pageElement.weatherContainer}`);
  const locationDateAndTime = createLocationDateAndTime('Russia', 'Spb');
  const current = createCurrentWeather();
  const forecast = createSwiper();

  weather.append(locationDateAndTime);
  weather.append(current);
  weather.append(forecast);
  createForecast();
};

export default renderWeather;
