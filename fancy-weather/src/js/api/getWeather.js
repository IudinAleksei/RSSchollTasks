import { getWeather } from './network';

export const getMinMaxAverageTemp = (tempObj) => {
  const values = Object.values(tempObj);
  values.sort((a, b) => a - b);
  const tempArray = [values[0], values[values.length - 1],
    (values[0] + values[values.length - 1]) / 2];
  return tempArray;
};

const parseWeather = (weather) => {
  const parsedData = {
    feels_like: weather.feels_like,
    humidity: weather.humidity,
    temp: weather.temp,
    uvi: weather.uvi,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
    wind_deg: weather.wind_deg,
    wind_speed: weather.wind_speed,
  };
  return parsedData;
};

const parseForecast = (dailyWeather) => {
  const forecastArray = dailyWeather.map((day) => {
    const dayWeather = parseWeather(day);
    dayWeather.temp = getMinMaxAverageTemp(dayWeather.temp);
    dayWeather.feels_like = getMinMaxAverageTemp(dayWeather.feels_like);
    const forecastDate = new Date(day.dt * 1000);
    dayWeather.day = forecastDate.getUTCDay();

    return dayWeather;
  });
  return forecastArray;
};

export const getAllWeather = async (lat, lng, lang) => {
  const weatherResponse = await getWeather(lat, lng, lang);


  if (weatherResponse === 'connection error') {
    return 'Unable to get a response from weather API';
  }

  const currentWeather = parseWeather(weatherResponse.current);
  const forecast = parseForecast(weatherResponse.daily);
  forecast.shift();

  const result = [weatherResponse.timezone_offset, currentWeather, forecast];

  return result;
};
