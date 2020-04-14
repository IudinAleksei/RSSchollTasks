const pageElement = {
  startBtn: 'game-control__button',
  cards: 'card_front',
  startBtnBlock: 'game-control',
  hideStartBtnBlock: 'game-control_hidden',
  audio: 'card__audio',
};

let isPlay = false;

const playAudio = (cardNumber) => {
  const audio = document.querySelectorAll(`.${pageElement.audio}`)[cardNumber];
  if (!isPlay) {
    isPlay = true;
    audio.addEventListener('ended', () => { isPlay = false; });
    audio.play();
  }
};

export default playAudio;
