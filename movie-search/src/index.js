import Swiper from 'swiper';
import { clickHandler } from './js/control';

// swiper settings
const mySwiper = new Swiper('.swiper-container', {

  direction: 'horizontal',
  updateOnWindowResize: true,
  setWrapperSize: 85,

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

window.onload = () => {
  clickHandler();
};
