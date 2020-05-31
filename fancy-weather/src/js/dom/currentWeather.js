import { PAGE_ELEMENT, WEATHER_CONDITION_LIST, UNITS } from '../constants/constants';
import { getTemperatureValue, roundWindSpeed } from '../utils/round';

const createCurrentTemperature = (temp, units) => {
  const temperature = document.createElement('p');

  temperature.classList.add(PAGE_ELEMENT.currentTemperature);

  temperature.innerText = getTemperatureValue(temp, units);

  return temperature;
};

export const createWeatherIcon = (url) => {
  const icon = document.createElement('img');

  icon.classList.add(PAGE_ELEMENT.weatherIcon);

  icon.setAttribute('src', url);
  icon.setAttribute('alt', 'weather icon');

  return icon;
};

const createConditionList = (condition, lang, units) => {
  const elementsKey = Object.keys(WEATHER_CONDITION_LIST[lang]);
  const list = document.createElement('ul');
  const weatherDiscription = { ...condition };

  weatherDiscription.feels_like = getTemperatureValue(weatherDiscription.feels_like, units);
  weatherDiscription.wind_speed = roundWindSpeed(weatherDiscription.wind_speed);

  list.classList.add(PAGE_ELEMENT.currentWeatherList);
  elementsKey.forEach((key) => {
    const element = document.createElement('li');
    element.innerText = `${WEATHER_CONDITION_LIST[lang][key]}${weatherDiscription[key]}${UNITS[lang][key]}`;
    list.append(element);
  });

  return list;
};

const createWeatherCondition = (condition, lang, units) => {
  const container = document.createElement('div');
  const list = createConditionList(condition, lang, units);
  const icon = createWeatherIcon(`../assets/icons/openweathermap/${condition.icon}.svg`);

  container.classList.add(PAGE_ELEMENT.currentWeatherCondition);

  container.append(icon);
  container.append(list);

  return container;
};

const createCurrentWeather = (currentWeather, lang, units) => {
  const current = document.createElement('div');
  const temperature = createCurrentTemperature(currentWeather.temp, units);
  const condition = createWeatherCondition(currentWeather, lang, units);

  current.classList.add(PAGE_ELEMENT.currentWeather);

  current.append(temperature);
  current.append(condition);

  return current;
};

export default createCurrentWeather;
