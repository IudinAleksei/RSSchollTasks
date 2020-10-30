import { API_KEYS, API_REQUEST } from '../constants/constants';

const getDataFromApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = (res.ok) ? await res.json() : 'connection error';

    return data;
  } catch (err) {
    return 'connection error';
  }
};

export const getLocationByIp = async () => {
  const url = API_REQUEST.ipgeolocation + API_KEYS.ipgeolocation;
  const ipLocation = await getDataFromApi(url);

  return ipLocation;
};

export const getWeather = async (lat, lng, lang) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&lang=${lang}&units=metric&exclude=minutely,hourly&appid=${API_KEYS.openweather}`;
  const weatherData = await getDataFromApi(url);

  return weatherData;
};

export const reverseGeocoding = async (lat, lng, lang) => {
  let url = `${API_REQUEST.yandexGeocoder}&geocode=${lng},${lat}&lang=${lang}&apikey=${API_KEYS.ymaps}`;
  if (lang === 'be') {
    url = `${API_REQUEST.opencagedata}&q=${lat}+${lng}&language=${lang}&key=${API_KEYS.opencagedata}`;
  }
  const location = await getDataFromApi(url);

  return location;
};

export const forwardGeocoding = async (locationName, lang) => {
  let url = `${API_REQUEST.yandexGeocoder}&geocode=${locationName}&lang=${lang}&apikey=${API_KEYS.ymaps}`;
  if (lang === 'be') {
    url = `${API_REQUEST.opencagedata}&q=${locationName}&language=${lang}&key=${API_KEYS.opencagedata}`;
  }

  const location = await getDataFromApi(url);

  return location;
};

export const getImage = async (keyWord) => {
  const url = `${API_REQUEST.unsplash}&query=${keyWord}&client_id=${API_KEYS.unsplash}`;
  const imageData = await getDataFromApi(url);

  return imageData;
};
