import cards from './library';
import { addToContainer, clearContainer, getRandomInteger } from './container_function';

let numberLoadedImage = 0;

const pageElement = {
  container: 'card-container',
  flipContainer: 'flip-container',
  hidden: 'card-hidden',
  flip: 'card-flipper',
  card: 'card',
  cardFront: 'card_front',
  cardBack: 'card_back',
  cardImage: 'card__image',
  cardWord: 'card__word',
  cardButton: 'card__button',
  cardAudio: 'card__audio',
  categoryBacking: 'category__backing',
  categoryImgContainer: 'category__image-container',
  categoryImage: 'category__image',
  categoryWord: 'category__word',
};

const createCardWord = (text) => {
  const word = document.createElement('div');
  word.innerText = text;
  word.classList.add(pageElement.cardWord);
  return word;
};

const createCardImg = (src) => {
  const img = document.createElement('img');
  img.classList.add(pageElement.cardImage);
  img.setAttribute('src', src);
  const alt = src.match(/(?<=\/)\w+(?=\.)/);
  img.setAttribute('alt', alt);
  const event = new Event('image_loaded', { bubbles: true });
  img.onload = () => img.dispatchEvent(event);
  return img;
};

const createCardAudio = (src) => {
  const audio = document.createElement('audio');
  const audioSrc = document.createElement('source');
  audio.classList.add(pageElement.cardAudio);
  audioSrc.setAttribute('src', src);
  audioSrc.setAttribute('type', 'audio/mp3');
  audio.setAttribute('preload', 'auto');
  audio.append(audioSrc);
  return audio;
};

const createCardButton = () => {
  const btn = document.createElement('img');
  btn.classList.add(pageElement.cardButton);
  btn.setAttribute('src', '../assets/icons/flip.svg');
  return btn;
};

const createFrontSide = (card) => {
  const front = document.createElement('div');
  front.classList.add(pageElement.card, pageElement.cardFront);
  const img = createCardImg(card.image);
  const audio = createCardAudio(card.audioSrc);
  const word = createCardWord(card.word);
  const btn = createCardButton();
  word.append(btn);
  front.append(img);
  front.append(audio);
  front.append(word);
  return front;
};

const createBackSide = (card) => {
  const back = document.createElement('div');
  const backImg = createCardImg(card.image);
  const translation = createCardWord(card.translation);
  back.classList.add(pageElement.card, pageElement.cardBack);
  back.append(backImg);
  back.append(translation);
  return back;
};

const createCategoryImg = (src) => {
  const container = document.createElement('div');
  container.classList.add(pageElement.categoryImgContainer);
  const img = document.createElement('img');
  img.classList.add(pageElement.categoryImage);
  img.setAttribute('src', src);
  const alt = src.match(/(?<=\/)\w+(?=\.)/);
  img.setAttribute('alt', alt);
  const event = new Event('image_loaded', { bubbles: true });
  img.onload = () => img.dispatchEvent(event);
  container.append(img);
  return container;
};

const createCategoryWord = (text) => {
  const word = document.createElement('div');
  word.innerText = text;
  word.classList.add(pageElement.categoryWord);
  return word;
};

const createCategoryCard = (categoryName) => {
  const backing = document.createElement('div');
  backing.classList.add(pageElement.categoryBacking, pageElement.hidden);
  const categoryIndex = cards[0].indexOf(categoryName);
  const randomIndex = getRandomInteger(0, cards[0].length - 1);
  const img = createCategoryImg(cards[categoryIndex + 1][randomIndex].image);
  const title = createCategoryWord(categoryName);
  backing.append(img);
  backing.append(title);
  return backing;
};

const createCard = (card) => {
  const flipContainer = document.createElement('div');
  const flip = document.createElement('div');
  flipContainer.classList.add(pageElement.flipContainer, pageElement.hidden);
  flip.classList.add(pageElement.flip);
  const front = createFrontSide(card);
  const back = createBackSide(card);
  flip.append(front);
  flip.append(back);
  flipContainer.append(flip);
  return flipContainer;
};

const imageLoadHandler = () => {
  document.querySelector(`.${pageElement.container}`).addEventListener('image_loaded', () => {
    numberLoadedImage += 1;
    const categoryCard = document.querySelectorAll(`.${pageElement.categoryBacking}`);
    if (numberLoadedImage === categoryCard.length && categoryCard.length > 0) {
      categoryCard.forEach((item) => {
        item.classList.remove(pageElement.hidden);
      });
    }
    const flipContainer = document.querySelectorAll(`.${pageElement.flipContainer}`);
    if (numberLoadedImage === 2 * flipContainer.length && flipContainer.length > 0) {
      let i = 0;
      flipContainer[i].classList.remove(pageElement.hidden);
      i += 1;
      const timer = setInterval(() => {
        if (i >= flipContainer.length - 1) {
          clearInterval(timer);
        }
        flipContainer[i].classList.remove(pageElement.hidden);
        i += 1;
      }, 200);
    }
  });
};

const fillCardContainer = (cardList = []) => {
  numberLoadedImage = 0;
  clearContainer(pageElement.container);
  cardList.forEach((item) => {
    let card = '';
    if (typeof item === 'object') {
      card = createCard(item);
    } else if (typeof item === 'string') {
      card = createCategoryCard(item);
    }
    addToContainer(pageElement.container, card);
  });
  imageLoadHandler();
};

export default fillCardContainer;
