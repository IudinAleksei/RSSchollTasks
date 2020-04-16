const pageElement = {
  startBtn: 'game-control__button',
  cards: 'card_front',
  startBtnBlock: 'game-control',
  hideStartBtnBlock: 'game-control_hidden',
  audio: 'card__audio',
};

let isPlay = false;

export const playAudio = (cardNumber) => {
  const audio = document.querySelectorAll(`.${pageElement.audio}`)[cardNumber];
  if (audio === undefined || audio.tagName !== 'AUDIO') {
    console.log('audio_error');
    return false;
  }
  if (!isPlay) {
    isPlay = true;
    audio.addEventListener('ended', () => {
      isPlay = false;
      const audioEvent = new Event('audioEnded', { bubbles: false });
      document.body.dispatchEvent(audioEvent);
    });
    audio.play();
  }
  return true;
};

export const playSound = (message) => {
  const sound = document.createElement('audio');
  sound.setAttribute('src', `assets/audio/${message}.mp3`);
  if (!isPlay) {
    isPlay = true;
    sound.addEventListener('ended', () => {
      isPlay = false;
      const soundEvent = new Event('soundEnded', { bubbles: false });
      document.body.dispatchEvent(soundEvent);
    });
    sound.play();
  }
};
