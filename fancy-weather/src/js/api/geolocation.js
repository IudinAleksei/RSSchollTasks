import { getLocationByIp, reverseGeocoding, forwardGeocoding } from './network';

function promisify(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(results, err) { // наш специальный колбэк для f
        if (err) {
          return reject(err);
        }
        // делаем resolve для всех results колбэка, если задано manyArgs
        resolve(results);
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}
/*
// использование:
f = promisify(f, true); */


const getGeolocation = async () => {
  const f1 = navigator.geolocation.getCurrentPosition;
  const fp = await promisify(f1);

  return fp;
};

const getIpCoordinates = async () => {
  const ipLocationData = await getLocationByIp();

  const coordinates = {
    latitude: ipLocationData.latitude,
    longitude: ipLocationData.longitude,
  };

  return coordinates;
};

const getLocationName = async (lat, lon, lang) => {
  const geocodeResponse = await reverseGeocoding(lat, lon, lang);
  const city = geocodeResponse.results[0].components.city
  || geocodeResponse.results[0].components.village;
  const locationName = {
    country: geocodeResponse.results[0].components.country,
    city,
  };

  return locationName;
};

export const getUserLocation = async (lang) => {
  const coordinates = await getIpCoordinates();
  const locationName = await getLocationName(coordinates.latitude, coordinates.longitude, lang);

  let state = Object.assign(coordinates, locationName);
  state = Object.assign(state, { lang });

  return state;
};

export const getSearchedLocation = async (locationName, lang) => {
  const geocodeResponse = await forwardGeocoding(locationName, lang);
  if (geocodeResponse.results.length < 1) {
    return 'No results';
  }
  const componentsKeys = Object.keys(geocodeResponse.results[0].components);
  const cityType = componentsKeys.find((key) => key === 'city' || key === 'town' || key === 'village');
  const city = geocodeResponse.results[0].components[cityType];

  const location = {
    country: geocodeResponse.results[0].components.country,
    city,
    latitude: geocodeResponse.results[0].geometry.lat,
    longitude: geocodeResponse.results[0].geometry.lng,
  };

  return location;
};
