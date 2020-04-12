import cards from './library';
import { addToContainer, clearContainer } from './containerFunction';

const createCard = (card, index) => {
  const elem = document.createElement('div');
  elem.classList.add('card-container__card', 'card-container__card_hidden');
  const img = document.createElement('img');
  img.setAttribute('width', '390px');
  img.setAttribute('height', '260px');
  if (typeof card === 'object') {
    const audio = document.createElement('audio');
    const audioSrc = document.createElement('source');
    img.setAttribute('src', card.image);
    img.setAttribute('alt', 'card');
    audioSrc.setAttribute('src', card.audioSrc);
    audioSrc.setAttribute('type', 'audio/mp3');
    audio.setAttribute('controls', 'controls');
    audio.setAttribute('preload', 'auto');
    audio.append(audioSrc);
    elem.append(audio);
  } else {
    img.setAttribute('src', cards[index + 1][0].image);
    img.setAttribute('alt', 'card');
  }
  elem.prepend(img);
  return elem;
};

const fillCardContainer = (cardList = []) => {
  document.querySelectorAll('.card-container__card').forEach((item) => {
    item.classList.add('card-container__card_hidden');
  });
  setTimeout(() => {
    clearContainer('card-container');
    cardList.forEach((item, index) => {
      const card = createCard(item, index);
      addToContainer('card-container', card);
    });
  }, 500);
  setTimeout(() => {
    document.querySelectorAll('.card-container__card_hidden').forEach((item) => {
      item.classList.remove('card-container__card_hidden');
    });
  }, 500);
};

export default fillCardContainer;
