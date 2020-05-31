import Swiper from 'swiper';
import { PAGE_ELEMENT, FULL_WEEKDAY } from '../constants/constants';
import { createWeatherIcon } from './currentWeather';
import { getTemperatureValue } from '../utils/round';

export const getWeekday = (numericDay, lang) => {
  const weekdayString = `${FULL_WEEKDAY[lang].weekday[numericDay]}`;
  return weekdayString;
};

export const createSwiper = () => {
  const container = document.createElement('div');
  const swiper = document.createElement('div');
  const wrapper = document.createElement('div');
  const arrowNext = document.createElement('div');
  const arrowPrev = document.createElement('div');

  container.classList.add(PAGE_ELEMENT.forecastContainer);
  swiper.classList.add(PAGE_ELEMENT.swiperContainer);
  wrapper.classList.add(PAGE_ELEMENT.swiperWrapper);
  arrowNext.classList.add(PAGE_ELEMENT.forecastNext,
    PAGE_ELEMENT.swiperButton, PAGE_ELEMENT.hideSwiperButton);
  arrowPrev.classList.add(PAGE_ELEMENT.forecastPrev,
    PAGE_ELEMENT.swiperButton, PAGE_ELEMENT.hideSwiperButton);

  container.append(arrowPrev);
  swiper.append(wrapper);
  container.append(arrowNext);
  container.append(swiper);

  return container;
};

const createForecastCard = (condition, lang, units) => {
  const container = document.createElement('div');
  const day = document.createElement('p');
  const condContainer = document.createElement('div');
  const temperature = document.createElement('p');
  const icon = createWeatherIcon(`../assets/icons/openweathermap/${condition.icon}.svg`);

  container.classList.add(PAGE_ELEMENT.slide);
  day.classList.add(PAGE_ELEMENT.forecastWeekday);
  condContainer.classList.add(PAGE_ELEMENT.forecastCondition);
  temperature.classList.add(PAGE_ELEMENT.forecastTemperature);
  icon.classList.add(PAGE_ELEMENT.forecastIcon);

  day.innerText = getWeekday(condition.day, lang);
  const averageTemp = getTemperatureValue(condition.temp[2], units);
  temperature.innerText = `${averageTemp}`;

  condContainer.append(temperature);
  condContainer.append(icon);
  container.append(day);
  container.append(condContainer);

  return container;
};


export const createForecast = (forecastWeather, lang, units) => {
  const mySwiper = new Swiper(`.${PAGE_ELEMENT.swiperContainer}`, {

    direction: 'horizontal',
    centerInsufficientSlides: true,
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
      960: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: `.${PAGE_ELEMENT.forecastNext}`,
      prevEl: `.${PAGE_ELEMENT.forecastPrev}`,
      hideOnClick: true,
    },
  });
  const cardArray = forecastWeather.map(
    (dayWeather) => createForecastCard(dayWeather, lang, units),
  );
  mySwiper.appendSlide(cardArray);
  mySwiper.update();
};
