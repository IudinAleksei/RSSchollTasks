import Swiper from 'swiper';
import { createWeatherIcon } from './currentWeather';

const pageElement = {
  swiperContainer: 'swiper-container',
  swiperWrapper: 'swiper-wrapper',
  slide: 'swiper-slide',
  swiperButton: 'swiper-button',
  hideSwiperButton: 'swiper-button-hidden',
  forecastNext: 'swiper-button-next',
  forecastPrev: 'swiper-button-prev',
};

export const createSwiper = () => {
  const swiper = document.createElement('div');
  const wrapper = document.createElement('div');
  const arrowNext = document.createElement('div');
  const arrowPrev = document.createElement('div');

  swiper.classList.add(pageElement.swiperContainer);
  wrapper.classList.add(pageElement.swiperWrapper);
  arrowNext.classList.add(pageElement.forecastNext,
    pageElement.swiperButton, pageElement.hideSwiperButton);
  arrowPrev.classList.add(pageElement.forecastPrev,
    pageElement.swiperButton, pageElement.hideSwiperButton);

  swiper.append(arrowPrev);
  swiper.append(wrapper);
  swiper.append(arrowNext);

  return swiper;
};

const createForecastCard = (weekday, tempValue) => {
  const container = document.createElement('div');
  const day = document.createElement('p');
  const temperature = document.createElement('p');
  const icon = createWeatherIcon('../assets/icons/openweathermap/01n.svg');

  container.classList.add(pageElement.slide);

  day.innerText = weekday;
  temperature.innerText = tempValue;

  container.append(day);
  container.append(temperature);
  container.append(icon);

  return container;
};

const forecastArray = [['friday', 7], ['saturday', 10], ['sunday', 8], ['monday', 12], ['tuesday', 10]];

export const createForecast = () => {
  const mySwiper = new Swiper(`.${pageElement.swiperContainer}`, {

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
      nextEl: `.${pageElement.forecastNext}`,
      prevEl: `.${pageElement.forecastPrev}`,
      hideOnClick: true,
    },
  });
  mySwiper.removeAllSlides();
  const cardArray = forecastArray.map((item) => createForecastCard(...item));
  mySwiper.appendSlide(cardArray);
  mySwiper.update();
};
