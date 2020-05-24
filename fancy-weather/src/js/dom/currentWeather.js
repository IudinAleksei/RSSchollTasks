const pageElement = {
  currentWeather: 'weather__current',
  currentTemperature: 'weather__current__temp',
  weatherIcon: 'weather__current__icon',
  currentWeatherCondition: 'weather__current__condition',
  currentWeatherList: 'weather__current__list',
  forecastWeather: 'weather__forecast',
};

const createCurrentTemperature = (value) => {
  const temperature = document.createElement('p');

  temperature.classList.add(pageElement.currentTemperature);

  temperature.innerText = value;

  return temperature;
};

export const createWeatherIcon = (url) => {
  const icon = document.createElement('img');

  icon.classList.add(pageElement.weatherIcon);

  icon.setAttribute('src', url);
  icon.setAttribute('alt', 'weather icon');

  return icon;
};

const createWeatherCondition = (condition) => {
  const container = document.createElement('div');
  const list = document.createElement('ul');
  const icon = createWeatherIcon('../assets/icons/openweathermap/01n.svg');

  container.classList.add(pageElement.currentWeatherCondition);
  list.classList.add(pageElement.currentWeatherList);

  condition.forEach((item) => {
    const element = document.createElement('li');
    element.innerText = item;
    list.append(element);
  });

  container.append(icon);
  container.append(list);

  return container;
};

const cond = ['overcast', 'Feels like: 7°', 'Wind: 2 m/s', 'Humidity: 83%'];

// eslint-disable-next-line import/prefer-default-export
const createCurrentWeather = () => {
  const current = document.createElement('div');
  const temperature = createCurrentTemperature('14');
  const condition = createWeatherCondition(cond);

  current.classList.add(pageElement.currentWeather);

  current.append(temperature);
  current.append(condition);

  return current;
};

export default createCurrentWeather;
