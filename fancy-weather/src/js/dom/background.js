import PAGE_ELEMENT from '../constants/constants';
import { getImage } from '../api/network';
import { unhideBackgroundLayer } from './animationLayer';

const setBackgroundImage = (url) => {
  const { body } = document;
  const bgLayer = document.querySelector(`.${PAGE_ELEMENT.backgroundLayer}`);
  const img = new Image();
  img.addEventListener('load', () => {
    bgLayer.style.cssText = `background:  linear-gradient(rgba(8, 15, 26, 0.5), rgba(8, 15, 26, 0.5)), center / cover no-repeat url(${url})`;
    unhideBackgroundLayer(true);
    bgLayer.addEventListener('transitionend', () => {
      body.style.cssText = `background:  linear-gradient(rgba(8, 15, 26, 0.5), rgba(8, 15, 26, 0.5)), center / cover no-repeat url(${url})`;
      unhideBackgroundLayer(false);
    }, { once: true });
  }, false);
  img.src = url;
};

const getUrlFromResponse = (response) => {
  const url = response.urls.full;

  return url;
};

const createBackground = async (keyWord) => {
  // согласно требованию ТЗ для проверки корректности запрос фонового изображения
  // выводяться ключевые слова для поиска на unsplash
  console.log(`Keywords for background search: ${keyWord}`);
  const imageResponse = await getImage(keyWord);
  const url = getUrlFromResponse(imageResponse);

  setBackgroundImage(url);
  return 'success';
};

export default createBackground;
