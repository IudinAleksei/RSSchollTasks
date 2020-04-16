import { playAudio, playSound } from './audio';

const assets = {
  startIcon: 'assets/icons/play.svg',
  replayIcon: 'assets/icons/replay.svg',
};

const pageElement = {
  cards: 'card_front',
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
};

let gameSequence = [];
let gameStarted = false;
let hasWrong = false;

export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomCardsSequence = (seqLen) => {
  const nums = new Set();
  while (nums.size < seqLen) {
    nums.add(getRandomInteger(0, seqLen - 1));
  }
  const seq = Array.from(nums);
  return seq;
};

export const isCorrectCard = (cardNumber) => {
  if (cardNumber === gameSequence[gameSequence.length - 1]) {
    // addCardStats(cardWord, 0, 0, 1, 0);
    return true;
  }
  // addCardStats(cardWord, 0, 0, 0, 1);
  hasWrong = true;
  return false;
};

export const getNextCard = () => {
  gameSequence.pop();
  if (gameSequence.length > 0) {
    const nextCard = gameSequence[gameSequence.length - 1];
    // addCardStats(cardWord, 0, 1, 0, 0);
    playAudio(nextCard);
    return nextCard;
  }
  if (hasWrong) {
    playSound('failure');
    return 'failure';
  }
  playSound('success');
  return 'success';
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
    // text.innerText = '';
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
    const cardCollection = document.querySelectorAll(`.${pageElement.cards}`);
    gameSequence = randomCardsSequence(cardCollection.length);
    createBtnContent(true);
  }
  if (gameSequence.length > 0) {
    // addCardStats(cardWord, 0, 1, 0, 0);
    playAudio(gameSequence[gameSequence.length - 1]);
  }
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
  const btnBlock = document.querySelector(`.${pageElement.startBtnBlock}`);
  const btn = document.querySelector(`.${pageElement.startBtn}`);
  gameStarted = false;
  if (mode === true) {
    btnBlock.classList.remove(pageElement.hideStartBtnBlock);
    unvisibleWord(true);
    createBtnContent();
    btn.addEventListener('click', startAndRepeat);
  } else {
    unvisibleWord(false);
    btnBlock.classList.add(pageElement.hideStartBtnBlock);
    btn.removeEventListener('click', startAndRepeat);
  }
};
