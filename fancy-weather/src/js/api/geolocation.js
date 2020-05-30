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

// const formatLocationName = (geocodeResponse) => {
//   // _type возвращается opencagedata API
//   // eslint-disable-next-line no-underscore-dangle
//   const cityType = geocodeResponse.results[0].components._type;
//   const city = geocodeResponse.results[0].components.city || geocodeResponse.results[0].components.town
//   || geocodeResponse.results[0].components.village || geocodeResponse.results[0].components[cityType];

//   const location = {
//     country: geocodeResponse.results[0].components.country,
//     city,
//     latitude: geocodeResponse.results[0].geometry.lat,
//     longitude: geocodeResponse.results[0].geometry.lng,
//   };

//   return location;
// };


const formatLocationName = (geocodeResponse) => {
  const addressComponents = geocodeResponse.GeoObject.metaDataProperty
    .GeocoderMetaData.Address.Components;
  const coordinates = geocodeResponse.GeoObject.Point.pos.split(' ');
  const country = addressComponents[0].name;
  const city = addressComponents[addressComponents.length - 1].name;

  const location = {
    country,
    city,
    latitude: coordinates[1],
    longitude: coordinates[0],
  };

  return location;
};

export const getLocationName = async (lat, lng, lang) => {
  const geocodeResponse = await reverseGeocoding(lat, lng, lang);
  const locationList = geocodeResponse.response.GeoObjectCollection.featureMember;
  if (locationList.length < 1) {
    return 'No results';
  }

  const firstLocation = locationList[0];

  const location = formatLocationName(firstLocation);

  return location;
};

export const getUserLocation = async (lang) => {
  let coordinates;

  try {
    coordinates = await getGeolocation();
  } catch (error) {
    console.warn(error);
    coordinates = await getIpCoordinates();
  }

  const location = await getLocationName(coordinates.latitude, coordinates.longitude, lang);

  return location;
};

export const getSearchedLocation = async (locationName, lang) => {
  const geocodeResponse = await forwardGeocoding(locationName, lang);
  const locationList = geocodeResponse.response.GeoObjectCollection.featureMember;
  if (locationList.length < 1) {
    return 'No results';
  }

  const firstLocation = locationList[0];

  const location = formatLocationName(firstLocation);

  return location;
};
