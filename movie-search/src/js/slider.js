import Swiper from 'swiper';
import createCard from './card';

const pageElement = {
  swiperWrapper: 'swiper-wrapper',
};

// swiper settings
const mySwiper = new Swiper('.swiper-container', {

  direction: 'horizontal',
  centerInsufficientSlides: true,

  breakpoints: {

    640: {
      slidesPerView: 2,
    },

    1024: {
      slidesPerView: 3,

    },

    1440: {
      slidesPerView: 4,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    hideOnClick: true,
  },

  pagination: {
    el: '.swiper-pagination',
  },
});

export const addRequestToSlider = (movieArray) => {
  const cardArray = movieArray.map((item) => createCard(item));
  mySwiper.appendSlide(cardArray);
  mySwiper.update();
};

export const clearSlider = () => {
  mySwiper.removeAllSlides();
  mySwiper.update();
};

export const doBeforeSliderEnd = (func, args) => {
  mySwiper.on('slideChange', async () => {
    const currentSwiperSize = mySwiper.params.slidesPerView;
    const currentSlide = mySwiper.activeIndex;
    const currentSlidesNum = mySwiper.slides.length;
    if (currentSlidesNum - currentSlide < 2 * currentSwiperSize) {
      await func(args);
    }
  });
};
