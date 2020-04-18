import { addToContainer, clearContainer } from './container_function';
import { playAudio, playSound } from './audio';

const assets = {
  startIcon: 'assets/icons/play.svg',
  replayIcon: 'assets/icons/replay.svg',
  failureSmile: 'assets/img/failure.png',
  successSmile: 'assets/img/success.png',
  starError: 'assets/icons/star.svg',
  starCorrect: 'assets/icons/star-win.svg',
};

const pageElement = {
  container: 'card-container',
  cards: 'card_front',
  categoryBacking: 'category__backing',
  gameCategoryBacking: 'category__backing_game',
  flip: 'card-flipper',
  checkFlip: 'card-flipper_checked',
  cardWord: 'card__word',
  hideCardWord: 'card__word_hidden',
  cardBtn: 'card__button',
  hideCardBtn: 'card__button_hidden',
  startBtn: 'game-control__button',
  repeatBtn: 'game-control__button_repeat',
  startBtnBlock: 'game-control',
  hideStartBtnBlock: 'game-control_hidden',
  btnIcon: 'game-control__button__icon',
  btnText: 'game-control__button__text',
  smile: 'smile',
  smileContainer: 'smile-container',
  score: 'score',
  hideScore: 'score_hidden',
  scoreContainer: 'score__container',
  scoreImage: 'score__image',
};

let gameSequence = [];
let gameStarted = false;
let hasWrong = false;

export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomCardsSequence = (cardCollection) => {
  const nums = new Set();
  const seqLen = cardCollection.length;
  while (nums.size < seqLen) {
    nums.add(getRandomInteger(0, seqLen - 1));
  }
  const seq = Array.from(nums);
  const randomazedCollection = seq.map((item) => cardCollection[item]);
  return randomazedCollection;
};

const createBtnContent = (repeat = false) => {
  const btn = document.querySelector(`.${pageElement.startBtn}`);
  const iconBlock = document.createElement('div');
  const icon = document.createElement('img');
  const text = document.createElement('div');
  iconBlock.classList.add(pageElement.btnIcon);
  text.classList.add(pageElement.btnText);
  btn.innerHTML = '';
  iconBlock.append(icon);
  btn.append(iconBlock);
  if (repeat) {
    btn.classList.add(pageElement.repeatBtn);
    icon.setAttribute('src', assets.replayIcon);
  } else {
    btn.classList.remove(pageElement.repeatBtn);
    icon.setAttribute('src', assets.startIcon);
    text.innerText = 'start';
    btn.append(text);
  }
};

const startAndRepeat = () => {
  if (!gameStarted) {
    gameStarted = true;
    hasWrong = false;
    const cardCollection = document.querySelectorAll(`.${pageElement.flip}`);
    gameSequence = randomCardsSequence(cardCollection);
    createBtnContent(true);
  }
  if (gameSequence.length > 0) {
    // addCardStats(cardWord, 0, 1, 0, 0);
    playAudio(gameSequence[gameSequence.length - 1]);
  }
};

const visibleStartButtonAndScore = (visible) => {
  const btnBlock = document.querySelector(`.${pageElement.startBtnBlock}`);
  const btn = document.querySelector(`.${pageElement.startBtn}`);
  const score = document.querySelector(`.${pageElement.score}`);
  if (visible) {
    btnBlock.classList.remove(pageElement.hideStartBtnBlock);
    score.classList.remove(pageElement.hideScore);
    btn.addEventListener('click', startAndRepeat);
  } else {
    btnBlock.classList.add(pageElement.hideStartBtnBlock);
    score.classList.add(pageElement.hideScore);
    btn.removeEventListener('click', startAndRepeat);
  }
};

const getNextCard = () => {
  gameSequence.pop();
  if (gameSequence.length > 0) {
    const nextCard = gameSequence[gameSequence.length - 1];
    // addCardStats(cardWord, 0, 1, 0, 0);
    playAudio(nextCard);
    document.body.addEventListener('audioEnded', () => {
      gameStarted = true;
    }, { once: true });
    return nextCard;
  }
  return 'fin';
};

const checkCorrect = (card) => {
  card.classList.add(pageElement.checkFlip);
};

const uncheckAll = () => {
  const checkedFlips = document.querySelectorAll(`.${pageElement.checkFlip}`);
  checkedFlips.forEach((item) => item.classList.remove(pageElement.checkFlip));
  clearContainer(pageElement.scoreContainer);
};

const createMarkImage = (isCorrect) => {
  const img = document.createElement('img');
  img.classList.add(pageElement.scoreImage);
  const src = (isCorrect) ? assets.starCorrect : assets.starError;
  img.setAttribute('src', src);
  const alt = src.match(/(?<=\/)\w+(?=\.)/);
  img.setAttribute('alt', alt);
  return img;
};

const addMark = (isCorrect) => {
  const mark = createMarkImage(isCorrect);
  document.querySelector(`.${pageElement.scoreContainer}`).prepend(mark);
};

const createSmileImage = (result) => {
  const container = document.createElement('div');
  container.classList.add(pageElement.smileContainer);
  const img = document.createElement('img');
  img.classList.add(pageElement.smile);
  const src = (result === 'failure') ? assets.failureSmile : assets.successSmile;
  img.setAttribute('src', src);
  const alt = src.match(/(?<=\/)\w+(?=\.)/);
  img.setAttribute('alt', alt);
  const event = new Event('image_loaded', { bubbles: true });
  img.onload = () => img.dispatchEvent(event);
  container.append(img);
  return container;
};

const drawSmile = (result) => {
  clearContainer(pageElement.container);
  const smile = createSmileImage(result);
  addToContainer(pageElement.container, smile);
};

const finGame = () => {
  const result = (hasWrong) ? 'failure' : 'success';
  visibleStartButtonAndScore(false);
  playSound(result);
  drawSmile(result);
  const finEvent = new Event('gameFinish', { bubbles: false });
  document.body.addEventListener('soundEnded', () => {
    document.body.dispatchEvent(finEvent);
  }, { once: true });
  return result;
};

export const isCorrectCard = (card) => {
  if (gameStarted) {
    if (gameSequence.includes(card)) {
      if (card === gameSequence[gameSequence.length - 1]) {
        checkCorrect(card);
        playSound('correct');
        addMark(true);
        gameStarted = false;
        // addCardStats(cardWord, 0, 0, 1, 0);
        document.body.addEventListener('soundEnded', () => {
          const nextCard = getNextCard();
          if (nextCard === 'fin') {
            finGame();
          }
        }, { once: true });
        return true;
      }
      // addCardStats(cardWord, 0, 0, 0, 1);
      hasWrong = true;
      playSound('error');
      addMark(false);
      return false;
    }
    return 'already checked';
  }
  return 'not started';
};

const unvisibleWord = (hide = true) => {
  const words = document.querySelectorAll(`.${pageElement.cardWord}`);
  const buttons = document.querySelectorAll(`.${pageElement.cardBtn}`);
  if (hide) {
    words.forEach((item) => item.classList.add(pageElement.hideCardWord));
    buttons.forEach((item) => item.classList.add(pageElement.hideCardBtn));
  } else {
    words.forEach((item) => item.classList.remove(pageElement.hideCardWord));
    buttons.forEach((item) => item.classList.remove(pageElement.hideCardBtn));
  }
};

export const turnPageToGameMode = (mode = true) => {
  uncheckAll();
  gameStarted = false;
  if (mode === true) {
    unvisibleWord(true);
    createBtnContent();
    visibleStartButtonAndScore(true);
  } else {
    unvisibleWord(false);
    visibleStartButtonAndScore(false);
  }
};

export const mainPageToGameMode = (mode = true) => {
  const categoryCard = document.querySelectorAll(`.${pageElement.categoryBacking}`);
  if (mode) {
    categoryCard.forEach((item) => item.classList.add(pageElement.gameCategoryBacking));
  } else {
    categoryCard.forEach((item) => item.classList.remove(pageElement.gameCategoryBacking));
  }
};
