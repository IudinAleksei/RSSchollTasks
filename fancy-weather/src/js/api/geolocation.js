import { getLocationByIp, reverseGeocoding, forwardGeocoding } from './network';

const getGeolocation = () => {
  const geoPromise = new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('GeolocationAPI disable'));
    } else {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      const success = (position) => {
        resolve(position.coords);
      };
      const error = () => {
        reject(new Error('GeolocationAPI disable'));
      };
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  });
  return geoPromise;
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
  if (geocodeResponse.results.length < 1) {
    return 'No results';
  }
  const componentsKeys = Object.keys(geocodeResponse.results[0].components);
  const cityType = componentsKeys.find((key) => key === 'city' || key === 'town' || key === 'village');
  const city = geocodeResponse.results[0].components[cityType];

  const locationName = {
    country: geocodeResponse.results[0].components.country,
    city,
  };

  return locationName;
};

export const getUserLocation = async (lang) => {
  let coordinates;

  try {
    coordinates = await getGeolocation();
  } catch (error) {
    console.warn(error);
    coordinates = await getIpCoordinates();
  }

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
