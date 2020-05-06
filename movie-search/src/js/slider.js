import Swiper from 'swiper';
import createCard from './card';

const pageElement = {
  swiperWrapper: 'swiper-wrapper',
};

// swiper settings
const mySwiper = new Swiper('.swiper-container', {

  direction: 'horizontal',

  breakpoints: {

    640: {
      slidesPerView: 2,
      // spaceBetween: 20,
    },

    768: {
      slidesPerView: 3,
      // spaceBetween: 30,

    },

    1024: {
      slidesPerView: 4,
      // spaceBetween: 40,
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

// mySwiper.on('slideChange', () => {
  // const scr = JSON.stringify(mySwiper.params.slidesPerView);
  // console.log(scr);
// });
