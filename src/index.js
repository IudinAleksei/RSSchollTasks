import cards from './js/library';
import { createCard } from './js/card';

const imageHandler = () => {
  document.querySelector('.card-container__card').addEventListener('click', (e) => {
    console.log(cards);
  });
};

window.onload = () => {
  console.log('hello');
  imageHandler();
};
