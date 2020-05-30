const API_KEYS = {
  ipgeolocation: 'f91d32ecc60c4fa3a481317e771bc0a5',
  openweather: '3ca5b2ba64daf09b15dd63cd43add0d3',
  unsplash: 'hPPxTA7RRG2h0yl4kQgn8LA4BRK288XuhzGBI8akFH4',
  flickr: '71b96ce362ccd0b4ab0a0239898653aa',
  opencagedata: 'd86a796b59cc4249bdc9815fab9f7cba',
  mapbox: 'pk.eyJ1IjoiaXVkaW5hbGVrc2VpIiwiYSI6ImNrYWN3Z2k0dTFrancyem10d2R6dHZzamwifQ.d6tuHi7UozhomnIn3SKAAA',
  ymaps: 'c110fa3c-57fc-4a15-ae11-02032cd4cdce',
};

const API_REQUEST = {
  ipgeolocation: 'https://api.ipgeolocation.io/ipgeo?apiKey=',
  opencagedata: 'https://api.opencagedata.com/geocode/v1/json?&pretty=1&no_annotations=1',
  yandexGeocoder: 'https://geocode-maps.yandex.ru/1.x/?format=json&kind=locality',
};

const getDataFromApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = (res.ok) ? await res.json() : 'bad response';

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

export const getImage = async (keyWords) => {

};
