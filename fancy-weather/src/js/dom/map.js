import mapboxgl from 'mapbox-gl';
import { convertCoordinate } from '../utils/convert';

const API_KEYS = {
  mapbox: 'pk.eyJ1IjoiaXVkaW5hbGVrc2VpIiwiYSI6ImNrYWN3Z2k0dTFrancyem10d2R6dHZzamwifQ.d6tuHi7UozhomnIn3SKAAA',
};

const pageElement = {
  map: 'location__map',
  coordinates: 'location__coordinates',
};

const pageText = {
  en: {
    latitude: 'latitude',
    longitude: 'longitude',
  },
  ru: {
    latitude: 'широта',
    longitude: 'долгота',
  },
  be: {
    latitude: 'шырата',
    longitude: 'даўгата',
  },
};

export const createMap = (lat, lng) => {
  const container = document.createElement('div');

  container.classList.add(pageElement.map);

  mapboxgl.accessToken = API_KEYS.mapbox;
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v10', // hosted style id
    center: [lng, lat], // starting position
    zoom: 10,
  });
  const marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);

  return container;
};

export const createCoordinates = (lat, lng, lang = 'en') => {
  const container = document.createElement('p');

  container.classList.add(pageElement.coordinates);

  const formattedLat = convertCoordinate(lat);
  const formattedLng = convertCoordinate(lng);

  container.innerText = `${pageText[lang].latitude}: ${formattedLat}\n ${pageText[lang].longitude}: ${formattedLng}`;

  return container;
};
