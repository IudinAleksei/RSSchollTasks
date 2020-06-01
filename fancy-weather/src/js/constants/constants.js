export const API_KEYS = {
  ipgeolocation: 'f91d32ecc60c4fa3a481317e771bc0a5',
  openweather: '3ca5b2ba64daf09b15dd63cd43add0d3',
  unsplash: 'hPPxTA7RRG2h0yl4kQgn8LA4BRK288XuhzGBI8akFH4',
  flickr: '71b96ce362ccd0b4ab0a0239898653aa',
  opencagedata: 'd86a796b59cc4249bdc9815fab9f7cba',
  mapbox: 'pk.eyJ1IjoiaXVkaW5hbGVrc2VpIiwiYSI6ImNrYWN3Z2k0dTFrancyem10d2R6dHZzamwifQ.d6tuHi7UozhomnIn3SKAAA',
  ymaps: 'c110fa3c-57fc-4a15-ae11-02032cd4cdce',
};

export const API_REQUEST = {
  ipgeolocation: 'https://api.ipgeolocation.io/ipgeo?apiKey=',
  opencagedata: 'https://api.opencagedata.com/geocode/v1/json?&pretty=1&no_annotations=1',
  yandexGeocoder: 'https://geocode-maps.yandex.ru/1.x/?format=json&kind=locality',
  unsplash: 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1',
};

export const PAGE_ELEMENT = {
  welcomeLayer: 'welcome',
  hideWelcomeLayer: 'welcome_hidden',
  backgroundLayer: 'background-change',
  hideBackgroundLayer: 'background-change_hidden',
  currentWeather: 'weather__current',
  currentTemperature: 'weather__current__temp',
  weatherIcon: 'weather__current__icon',
  currentWeatherCondition: 'weather__current__condition',
  currentWeatherList: 'weather__current__list',
  forecastWeather: 'weather__forecast',
  currentLocationContainer: 'weather__location',
  currentLocation: 'weather__location__city',
  dateTime: 'weather__location__date',
  forecastContainer: 'forecast-container',
  swiperContainer: 'swiper-container',
  swiperWrapper: 'swiper-wrapper',
  slide: 'swiper-slide',
  swiperButton: 'swiper-button',
  hideSwiperButton: 'swiper-button-hidden',
  forecastNext: 'swiper-button-next',
  forecastPrev: 'swiper-button-prev',
  forecastCondition: 'forecast__condition',
  forecastTemperature: 'forecast__condition__temp',
  forecastIcon: 'forecast__condition__icon',
  forecastWeekday: 'forecast__day',
  map: 'location__map',
  coordinates: 'location__coordinates',
  weatherContainer: 'weather',
  hideWeatherContainer: 'weather_hidden',
  locationContaioner: 'location',
  hideLocationContaioner: 'location_hidden',
  message: 'search__message',
  langSelector: 'selectors__lang-selector',
  temperatureBtn: 'temp-button',
  unactiveTemperatureBtn: 'temp-button_unactive',
  controlContainer: 'control',
  input: 'search__input',
  speakBtn: 'speak-button',
  activeSpeakBtn: 'speak-button_active',
  volumeRange: 'audio__volume',
  micBtn: 'mic-button',
  offMicBtn: 'mic-button_off',
  disableMicBtn: 'mic-button_disabled',
  activeMicBtn: 'mic-button_active',
};

export const WEATHER_CONDITION_LIST = {
  en: {
    description: '',
    feels_like: 'feels like: ',
    wind_speed: 'wind speed: ',
    humidity: 'humidity: ',
    uvi: 'UV-index: ',
  },
  ru: {
    description: '',
    feels_like: 'ощущается как: ',
    wind_speed: 'скорость ветра: ',
    humidity: 'влажность: ',
    uvi: 'УФ-индекс: ',
  },
  be: {
    description: '',
    feels_like: 'адчуваецца як: ',
    wind_speed: 'хуткасць ветру: ',
    humidity: 'вільготнасць: ',
    uvi: 'УФ-індэкс: ',
  },
};

export const UNITS = {
  en: {
    description: '',
    feels_like: '°',
    wind_speed: ' m/s',
    humidity: ' %',
    uvi: '',
  },
  ru: {
    description: '',
    feels_like: '°',
    wind_speed: ' м/с',
    humidity: ' %',
    uvi: '',
  },
  be: {
    description: '',
    feels_like: '°',
    wind_speed: ' м/с',
    humidity: ' %',
    uvi: '',
  },
};

export const WEEKDAY_AND_MONTH = {
  en: {
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  ru: {
    month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekday: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
  },
  be: {
    month: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Травень', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
    weekday: ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'],
  },
};

export const FULL_WEEKDAY = {
  en: {
    weekday: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  ru: {
    weekday: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  },
  be: {
    weekday: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Асяроддзе', 'Чацвер', 'Пятніца', 'Субота'],
  },
};

export const PAGE_TEXT = {
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

export const SEASONS = ['winter', 'spring', 'summer', 'autumn'];

export const DAYTIME = ['night', 'morning', 'day', 'evening'];

export const PARAMS = {
  language: 'weatherLang',
  tempUnits: 'weatherUnits',
};

export const DEFAULT_PARAMS = {
  [PARAMS.language]: 'en',
  [PARAMS.tempUnits]: 'celcius',
};

export const SPEECH_TEXT = {
  en: {
    current: 'The current air temperature is',
    forecast: 'In the coming days it is expected',
  },
  ru: {
    current: 'В данный момент температура воздуха',
    forecast: 'В ближайшие дни ожидается',
  },
  be: {
    current: 'У дадзены момант тэмпература паветра',
    forecast: 'У бліжэйшыя дні чакаецца',
  },
};

export const COMMANDS = {
  weather: ['weather', 'forecast', 'погода', 'прогноз'],
  louder: ['louder', 'громче'],
  quieter: ['quieter', 'тише'],
  background: ['background', 'фон'],
};

export default PAGE_ELEMENT;
