const PAGE_ELEMENT = {
  currentWeather: 'weather__current',
  currentTemperature: 'weather__current__temp',
  weatherIcon: 'weather__current__icon',
  currentWeatherCondition: 'weather__current__condition',
  currentWeatherList: 'weather__current__list',
  forecastWeather: 'weather__forecast',
};

const WEATHER_CONDITION_LIST = {
  en: {
    description: '',
    feels_like: 'feels like: ',
    wind_speed: 'wind speed: ',
    humidity: 'humidity: ',
    uvi: 'UV-index: ',
  },
  ru: {
    description: '',
    feels_like: 'ощущается как: ',
    wind_speed: 'скорость ветра: ',
    humidity: 'влажность: ',
    uvi: 'УФ-индекс: ',
  },
  be: {
    description: '',
    feels_like: 'адчуваецца як: ',
    wind_speed: 'хуткасць ветру: ',
    humidity: 'вільготнасць: ',
    uvi: 'УФ-індэкс: ',
  },
};

const UNITS = {
  en: {
    description: '',
    feels_like: '°',
    wind_speed: ' m/s',
    humidity: ' %',
    uvi: '',
  },
  ru: {
    description: '',
    feels_like: '°',
    wind_speed: ' м/с',
    humidity: ' %',
    uvi: '',
  },
  be: {
    description: '',
    feels_like: '°',
    wind_speed: ' м/с',
    humidity: ' %',
    uvi: '',
  },
};

const createCurrentTemperature = (value) => {
  const temperature = document.createElement('p');

  temperature.classList.add(PAGE_ELEMENT.currentTemperature);

  temperature.innerText = Math.round(value);

  return temperature;
};

export const createWeatherIcon = (url) => {
  const icon = document.createElement('img');

  icon.classList.add(PAGE_ELEMENT.weatherIcon);

  icon.setAttribute('src', url);
  icon.setAttribute('alt', 'weather icon');

  return icon;
};

const createConditionList = (condition, lang) => {
  const elementsKey = Object.keys(WEATHER_CONDITION_LIST[lang]);
  const list = document.createElement('ul');
  const weatherDiscription = { ...condition };
  weatherDiscription.feels_like = Math.round(weatherDiscription.feels_like);
  weatherDiscription.wind_speed = Math.round(weatherDiscription.wind_speed * 10) / 10;

  list.classList.add(PAGE_ELEMENT.currentWeatherList);
  elementsKey.forEach((key) => {
    const element = document.createElement('li');
    element.innerText = `${WEATHER_CONDITION_LIST[lang][key]}${weatherDiscription[key]}${UNITS[lang][key]}`;
    list.append(element);
  });

  return list;
};

const createWeatherCondition = (condition, lang) => {
  const container = document.createElement('div');
  const list = createConditionList(condition, lang);
  const icon = createWeatherIcon(`../assets/icons/openweathermap/${condition.icon}.svg`);

  container.classList.add(PAGE_ELEMENT.currentWeatherCondition);

  container.append(icon);
  container.append(list);

  return container;
};

const createCurrentWeather = (currentWeather, lang) => {
  const current = document.createElement('div');
  const temperature = createCurrentTemperature(currentWeather.temp);
  const condition = createWeatherCondition(currentWeather, lang);

  current.classList.add(PAGE_ELEMENT.currentWeather);

  current.append(temperature);
  current.append(condition);

  return current;
};

export default createCurrentWeather;
