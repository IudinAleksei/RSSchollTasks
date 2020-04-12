import cards from './library';
import { addToContainer, clearContainer } from './containerFunction';

const createCardWord = (text) => {
  const word = document.createElement('div');
  word.innerText = text;
  word.classList.add('card__word');
  return word;
};

const createCardImg = (src) => {
  const img = document.createElement('img');
  // img.setAttribute('width', '390px');
  // img.setAttribute('height', '260px');
  img.classList.add('card__image');
  img.setAttribute('src', src);
  img.setAttribute('alt', 'card');
  return img;
};

const createCardAudio = (src) => {
  const audio = document.createElement('audio');
  const audioSrc = document.createElement('source');
  audioSrc.setAttribute('src', src);
  audioSrc.setAttribute('type', 'audio/mp3');
  audio.setAttribute('preload', 'auto');
  // audio.setAttribute('controls', 'controls');
  audio.append(audioSrc);
  return audio;
};

const createCardButton = () => {
  const btn = document.createElement('img');
  btn.classList.add('card__button');
  btn.setAttribute('src', '../assets/icons/flip.svg');
  return btn;

};

const createCard = (card, index) => {
  const elem = document.createElement('div');
  elem.classList.add('card-container__card', 'card-container__card_hidden');
  let src = null;
  if (typeof card === 'object') {
    src = card.image;
    const audio = createCardAudio(card.audioSrc);
    const word = createCardWord(card.word);
    const btn = createCardButton();
    elem.append(audio);
    elem.append(word);
    elem.append(btn);
  } else {
    src = cards[index + 1][0].image;
  }
  const img = createCardImg(src);
  img.onload = () => elem.classList.remove('card-container__card_hidden');
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
  }, 400);
};

export default fillCardContainer;
