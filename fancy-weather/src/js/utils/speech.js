import { PAGE_ELEMENT, SPEECH_TEXT } from '../constants/constants';

const setMicButtonOn = (on = true) => {
  const speakButton = document.querySelector(`.${PAGE_ELEMENT.micBtn}`);
  if (on) {
    speakButton.classList.remove(PAGE_ELEMENT.offMicBtn);
    return;
  }
  speakButton.classList.add(PAGE_ELEMENT.offMicBtn);
};

const getLangForRecognition = (lang) => {
  if (lang === 'be') {
    return 'be-BY';
  }
  if (lang === 'ru') {
    return 'ru-RU';
  }
  return 'en-US';
};

const createTextForSpeech = (description, lang) => {
  const currentTemp = document.querySelector(`.${PAGE_ELEMENT.currentTemperature}`);
  const currentCondition = document.querySelector(`.${PAGE_ELEMENT.currentWeatherList}`);
  const forecast = document.querySelector(`.${PAGE_ELEMENT.swiperWrapper}`);
  const descriptionArray = description.map((item) => item.description);

  const currentTempText = currentTemp.innerText;
  const conditionText = currentCondition.innerText;
  const forecastText = forecast.innerText;
  const forecastArray = forecastText.split(/(?<=\d)\s/);
  const outArray = forecastArray.map((desc, index) => `${desc}°; ${descriptionArray[index]}`);

  const startText = `${SPEECH_TEXT[lang].current} ${currentTempText}°;  ${conditionText}; ${SPEECH_TEXT[lang].forecast}\n`;
  outArray.unshift(startText);

  return outArray;
};

const setSpeakButtonActive = (active = true) => {
  const speakButton = document.querySelector(`.${PAGE_ELEMENT.speakBtn}`);
  if (active) {
    speakButton.classList.add(PAGE_ELEMENT.activeSpeakBtn);
    return;
  }
  speakButton.classList.remove(PAGE_ELEMENT.activeSpeakBtn);
};

export const initSpeechRecognition = (lang) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const grammar = '#JSGF V1.0; grammar colors; public <color> = weather | forecast | quieter | louder;';
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);

  recognition.addEventListener('audiostart', () => setMicButtonOn(true));
  recognition.addEventListener('audioend', () => setMicButtonOn(false));

  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = getLangForRecognition(lang);
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return recognition;
};

export const speakWeather = (description, lang, volume) => {
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    synth.cancel();
    return false;
  }
  const text = createTextForSpeech(description, lang);
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.addEventListener('start', () => setSpeakButtonActive(true));
  utterThis.addEventListener('end', () => setSpeakButtonActive(false));
  utterThis.lang = lang;
  utterThis.volume = volume;
  synth.speak(utterThis);
  return true;
};
