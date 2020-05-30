import { getImage } from '../api/network';

const PAGE_ELEMENT = {
  bodyLayer: 'body__layer',
  hideBodyLayer: 'body__layer_hidden',
};

const setBackgroundImage = (url) => {
  const { body } = document;
  const img = new Image();
  img.addEventListener('load', () => {
    body.style.cssText = `background:  linear-gradient(rgba(8, 15, 26, 0.5), rgba(8, 15, 26, 0.5)), center / cover no-repeat url(${url})`;
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
};

export default createBackground;
