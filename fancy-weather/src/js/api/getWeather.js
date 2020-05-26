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

/*
clouds: 20
dew_point: 7.84
dt: 1590437542
feels_like: 7.71
humidity: 93
pressure: 1027
sunrise: 1590366816
sunset: 1590427777
temp: 8.91
uvi: 5.61
visibility: 10000
weather: Array(1)
  0:
    description: "fog"
    icon: "50n"
    id: 741
    main: "Fog"
    __proto__: Object
  length: 1
  __proto__: Array(0)
wind_deg: 0
wind_speed: 1
__proto__: Object
*/

const parseForecast = (dailyWeather) => {
  const forecastArray = dailyWeather.map((day) => {
    const dayWeather = parseWeather(day);
    dayWeather.temp = getMinMaxAverageTemp(dayWeather.temp);
    dayWeather.feels_like = getMinMaxAverageTemp(dayWeather.feels_like);

    return dayWeather;
  });
  return forecastArray;
};

export const getAllWeather = async (lat, lon, lang) => {
  const weatherResponse = await getWeather(lat, lon, lang);
  const currentWeather = parseWeather(weatherResponse.current);
  const forecast = parseForecast(weatherResponse.daily);
  const result = [weatherResponse.timezone_offset, currentWeather, forecast];

  return result;
};
