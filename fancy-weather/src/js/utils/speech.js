import { PAGE_ELEMENT, SPEECH_TEXT } from '../constants/constants';

export const initSpeechRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  // const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
  const grammar = '#JSGF V1.0; grammar colors; public <color> = weather | forecast | quieter | louder;';
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();

  recognition.addEventListener('end', () => recognition.start());

  return recognition;
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

export const doRec = () => {
  recognition.onresult = (event) => {
    const color = event.results[0][0].transcript;
    diagnostic.value = color;
  };
  recognition.onend = () => {
    console.log('stop');
    recognition.start();
  };
};

export const speakWeather = (description, lang, volume) => {
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    synth.cancel();
    return false;
  }
  const text = createTextForSpeech(description, lang);
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.lang = lang;
  utterThis.volume = volume;
  synth.speak(utterThis);
  return true;
};
