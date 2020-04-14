const pageElement = {
  startBtn: 'game-control__button',
  cards: 'card_front',
  startBtnBlock: 'game-control',
  hideStartBtnBlock: 'game-control_hidden',
};

export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomCardsSequence = (seqLen) => {
  const nums = new Set();
  while (nums.size < seqLen) {
    nums.add(getRandomInteger(0, seqLen - 1));
  }
  const seq = Array.from(nums);
  return seq;
};

const startGame = () => {
  const cardCollection = document.querySelectorAll(`.${pageElement.cards}`);
  const gameSequence = randomCardsSequence(cardCollection.length);
  
};

export const turnPageToGameMode = (mode = true) => {
  const btnBlock = document.querySelector(`.${pageElement.startBtnBlock}`);
  const btn = document.querySelector(`.${pageElement.startBtn}`);
  if (mode === true) {
    btnBlock.classList.remove(pageElement.hideStartBtnBlock);
    btn.addEventListener('click', startGame);
  } else {
    btnBlock.classList.add(pageElement.hideStartBtnBlock);
    btn.removeEventListener('click', startGame);
  }
};
