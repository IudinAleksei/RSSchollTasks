import mapboxgl from 'mapbox-gl';
import { PAGE_ELEMENT, API_KEYS, PAGE_TEXT } from '../constants/constants';
import { convertCoordinate } from '../utils/convert';

export const createMapContainer = () => {
  const container = document.createElement('div');

  container.classList.add(PAGE_ELEMENT.map);

  return container;
};

export const createMap = (lat, lng, container) => {
  mapboxgl.accessToken = API_KEYS.mapbox;

  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v10', // hosted style id
    center: [lng, lat],
    zoom: 9,
    pitch: 0,
    attributionControl: false,
  });
  map.resize();
  new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);
};

export const createCoordinates = (lat, lng, lang = 'en') => {
  const container = document.createElement('p');

  container.classList.add(PAGE_ELEMENT.coordinates);

  const formattedLat = convertCoordinate(lat);
  const formattedLng = convertCoordinate(lng);

  container.innerText = `${PAGE_TEXT[lang].latitude}: ${formattedLat}\n ${PAGE_TEXT[lang].longitude}: ${formattedLng}`;

  return container;
};
