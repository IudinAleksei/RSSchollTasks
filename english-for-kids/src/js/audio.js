const pageElement = {
  audio: 'card__audio',
};

let isPlay = false;

export const playAudio = (card) => {
  const audio = card.firstElementChild.children[1];
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
