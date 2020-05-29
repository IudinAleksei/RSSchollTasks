import Swiper from 'swiper';
import { createWeatherIcon } from './currentWeather';

const PAGE_ELEMENT = {
  swiperContainer: 'swiper-container',
  swiperWrapper: 'swiper-wrapper',
  slide: 'swiper-slide',
  swiperButton: 'swiper-button',
  hideSwiperButton: 'swiper-button-hidden',
  forecastNext: 'swiper-button-next',
  forecastPrev: 'swiper-button-prev',
};

const WEATHER_CONDITION_LIST = {
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

const UNITS = {
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

const FULL_WEEKDAY = {
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

export const getWeekday = (numericDay, lang) => {
  const weekdayString = `${FULL_WEEKDAY[lang].weekday[numericDay]}`;
  return weekdayString;
};

export const createSwiper = () => {
  const swiper = document.createElement('div');
  const wrapper = document.createElement('div');
  const arrowNext = document.createElement('div');
  const arrowPrev = document.createElement('div');

  swiper.classList.add(PAGE_ELEMENT.swiperContainer);
  wrapper.classList.add(PAGE_ELEMENT.swiperWrapper);
  arrowNext.classList.add(PAGE_ELEMENT.forecastNext,
    PAGE_ELEMENT.swiperButton, PAGE_ELEMENT.hideSwiperButton);
  arrowPrev.classList.add(PAGE_ELEMENT.forecastPrev,
    PAGE_ELEMENT.swiperButton, PAGE_ELEMENT.hideSwiperButton);

  swiper.append(arrowPrev);
  swiper.append(wrapper);
  swiper.append(arrowNext);

  return swiper;
};

const createForecastCard = (condition, lang) => {
  const container = document.createElement('div');
  const day = document.createElement('p');
  const temperature = document.createElement('p');
  const icon = createWeatherIcon(`../assets/icons/openweathermap/${condition.icon}.svg`);

  container.classList.add(PAGE_ELEMENT.slide);

  day.innerText = getWeekday(condition.day, lang);
  temperature.innerText = `${condition.temp[2]}`;

  container.append(day);
  container.append(temperature);
  container.append(icon);

  return container;
};


export const createForecast = (forecastWeather, lang) => {
  const mySwiper = new Swiper(`.${PAGE_ELEMENT.swiperContainer}`, {

    direction: 'horizontal',
    centerInsufficientSlides: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: `.${PAGE_ELEMENT.forecastNext}`,
      prevEl: `.${PAGE_ELEMENT.forecastPrev}`,
      hideOnClick: true,
    },
  });
  // mySwiper.removeAllSlides();
  const cardArray = forecastWeather.map((dayWeather) => createForecastCard(dayWeather, lang));
  mySwiper.appendSlide(cardArray);
  mySwiper.update();
};
