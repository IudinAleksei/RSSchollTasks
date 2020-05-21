const API_KEYS = {
  ipinfo: '918208ef51aa8f',
  openweather: '3ca5b2ba64daf09b15dd63cd43add0d3',
  weatherbit: '0511ffdcc67b4f4fa2ecb1138b013097',
  weatherapi: '0837303365f7447b86c191757201805',
  climacell: 'hz8sTYf7yLT0jo5JVgDMmNACnYKhnlGL',
  unsplash: 'hPPxTA7RRG2h0yl4kQgn8LA4BRK288XuhzGBI8akFH4',
  flickr: '71b96ce362ccd0b4ab0a0239898653aa',
  opencagedata: 'd86a796b59cc4249bdc9815fab9f7cba',
  mapbox: 'pk.eyJ1IjoiaXVkaW5hbGVrc2VpIiwiYSI6ImNrYWN3Z2k0dTFrancyem10d2R6dHZzamwifQ.d6tuHi7UozhomnIn3SKAAA',
};

const API_REQUEST = {
  ipinfo: 'https://ipinfo.io/json?token=',
  opencagedata: 'https://api.opencagedata.com/geocode/v1/json?' + 'q=Minsk&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1&language=be',
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

/* {
  "ip": "139.28.28.97",
  "city": "Moscow",
  "region": "Moscow",
  "country": "RU",
  "loc": "55.7522,37.6156",
  "org": "AS209575 Nova Group LLC",
  "postal": "101000",
  "timezone": "Europe/Moscow"
} */

export const getLocationByIp = async () => {
  const url = API_REQUEST.ipinfo + API_KEYS.ipinfo;
  const ipLocation = await getDataFromApi(url);

  return ipLocation;
};

export const getGeocode = async () => {
};

/* {"lat":33.44,"lon":-94.04,"timezone":"America/Chicago","timezone_offset":-18000, "current":{"dt":1589962534,"sunrise":1589973148,"sunset":1590023597,"temp":291.52,"feels_like":290.75,"pressure":1012,"humidity":77,"dew_point":287.42,"uvi":10.2,"clouds":90,"visibility":16093,"wind_speed":3.04,"wind_deg":87,"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}]},"minutely":[{"dt":1589962560,"precipitation":0},{"dt":1589962620,"precipitation":0},{"dt":1589962680,"precipitation":0},{"dt":1589962740,"precipitation":0},{"dt":1589962800,"precipitation":0},{"dt":1589962860,"precipitation":0},{"dt":1589962920,"precipitation":0},{"dt":1589962980,"precipitation":0},{"dt":1589963040,"precipitation":0},{"dt":1589963100,"precipitation":0},{"dt":1589963160,"precipitation":0},{"dt":1589963220,"precipitation":0},{"dt":1589963280,"precipitation":0},{"dt":1589963340,"precipitation":0},{"dt":1589963400,"precipitation":0},{"dt":1589963460,"precipitation":0},{"dt":1589963520,"precipitation":0},{"dt":1589963580,"precipitation":0},{"dt":1589963640,"precipitation":0},{"dt":1589963700,"precipitation":0},{"dt":1589963760,"precipitation":0},{"dt":1589963820,"precipitation":0},{"dt":1589963880,"precipitation":0},{"dt":1589963940,"precipitation":0},{"dt":1589964000,"precipitation":0},{"dt":1589964060,"precipitation":0},{"dt":1589964120,"precipitation":0},{"dt":1589964180,"precipitation":0},{"dt":1589964240,"precipitation":0},{"dt":1589964300,"precipitation":0},{"dt":1589964360,"precipitation":0},{"dt":1589964420,"precipitation":0},{"dt":1589964480,"precipitation":0},{"dt":1589964540,"precipitation":0},{"dt":1589964600,"precipitation":0},{"dt":1589964660,"precipitation":0},{"dt":1589964720,"precipitation":0},{"dt":1589964780,"precipitation":0},{"dt":1589964840,"precipitation":0},{"dt":1589964900,"precipitation":0},{"dt":1589964960,"precipitation":0},{"dt":1589965020,"precipitation":0},{"dt":1589965080,"precipitation":0},{"dt":1589965140,"precipitation":0},{"dt":1589965200,"precipitation":0},{"dt":1589965260,"precipitation":0},{"dt":1589965320,"precipitation":0},{"dt":1589965380,"precipitation":0},{"dt":1589965440,"precipitation":0},{"dt":1589965500,"precipitation":0},{"dt":1589965560,"precipitation":0},{"dt":1589965620,"precipitation":0},{"dt":1589965680,"precipitation":0},{"dt":1589965740,"precipitation":0},{"dt":1589965800,"precipitation":0},{"dt":1589965860,"precipitation":0},{"dt":1589965920,"precipitation":0},{"dt":1589965980,"precipitation":0},{"dt":1589966040,"precipitation":0},{"dt":1589966100,"precipitation":0},{"dt":1589966160,"precipitation":0}]} */
