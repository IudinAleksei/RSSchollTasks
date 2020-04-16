import cards from './library';
import { addToContainer, clearContainer } from './container_function';

const cssClass = {
  container: 'card-container',
  flip: 'card-flipper',
  card: 'card',
  cardHidden: 'card_hidden',
  cardFront: 'card_front',
  cardBack: 'card_back',
  cardWord: 'card__word',
  cardImage: 'card__image',
  cardButton: 'card__button',
  cardAudio: 'card__audio',
};

const createCardWord = (text) => {
  const word = document.createElement('div');
  word.innerText = text;
  word.classList.add(cssClass.cardWord);
  return word;
};

const createCardImg = (src) => {
  const img = document.createElement('img');
  // img.setAttribute('width', '390px');
  // img.setAttribute('height', '260px');
  img.classList.add(cssClass.cardImage);
  img.setAttribute('src', src);
  img.setAttribute('alt', 'card');
  return img;
};

const createCardAudio = (src) => {
  const audio = document.createElement('audio');
  const audioSrc = document.createElement('source');
  audio.classList.add(cssClass.cardAudio);
  audioSrc.setAttribute('src', src);
  audioSrc.setAttribute('type', 'audio/mp3');
  audio.setAttribute('preload', 'auto');
  // audio.setAttribute('controls', 'controls');
  audio.append(audioSrc);
  return audio;
};

const createCardButton = () => {
  const btn = document.createElement('img');
  btn.classList.add(cssClass.cardButton);
  btn.setAttribute('src', '../assets/icons/flip.svg');
  return btn;
};

const createCard = (card, index) => {
  const flipContainer = document.createElement('div');
  const front = document.createElement('div');
  flipContainer.classList.add(cssClass.flip);
  front.classList.add(cssClass.card, cssClass.cardFront, cssClass.cardHidden);
  if (typeof card === 'object') {
    const back = document.createElement('div');
    const img = createCardImg(card.image);
    const audio = createCardAudio(card.audioSrc);
    const word = createCardWord(card.word);
    const btn = createCardButton();
    const translation = createCardWord(card.translation);
    back.classList.add(cssClass.card, cssClass.cardBack);
    img.onload = () => front.classList.remove(cssClass.cardHidden);
    const backImg = img.cloneNode(true);
    front.append(img);
    front.append(audio);
    front.append(word);
    front.append(btn);
    back.append(backImg);
    back.append(translation);
    flipContainer.append(back);
  } else {
    const img = createCardImg(cards[index + 1][0].image);
    const title = createCardWord(card);
    img.onload = () => front.classList.remove(cssClass.cardHidden);
    front.append(img);
    front.append(title);
  }
  flipContainer.prepend(front);
  return flipContainer;
};

const fillCardContainer = (cardList = []) => {
  document.querySelectorAll(`.${cssClass.cardFront}`).forEach((item) => {
    item.classList.add(cssClass.cardFrontHidden);
  });
  setTimeout(() => {
    clearContainer(cssClass.container);
    cardList.forEach((item, index) => {
      const card = createCard(item, index);
      addToContainer(cssClass.container, card);
    });
  }, 400);
};

export default fillCardContainer;
