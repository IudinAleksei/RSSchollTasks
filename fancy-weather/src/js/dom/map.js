import mapboxgl from 'mapbox-gl';

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

export const createMap = (lat, lon) => {
  const container = document.createElement('div');

  container.classList.add(pageElement.map);

  mapboxgl.accessToken = API_KEYS.mapbox;
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v10', // hosted style id
    center: [lon, lat], // starting position
    zoom: 10,
  });
  const marker = new mapboxgl.Marker()
    .setLngLat([lon, lat])
    .addTo(map);

  return container;
};

export const createCoordinates = (lat, lon, lang = 'en') => {
  const container = document.createElement('p');

  container.classList.add(pageElement.coordinates);

  container.innerText = `${pageText[lang].latitude}: ${lat}\n ${pageText[lang].longitude}: ${lon}`;

  return container;
};
