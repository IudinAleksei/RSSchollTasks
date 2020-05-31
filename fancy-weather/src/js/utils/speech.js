import { PAGE_ELEMENT, SPEECH_TEXT } from '../constants/constants';

// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;';
const recognition = new webkitSpeechRecognition();
const speechRecognitionList = new webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
// recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector('.search__input');
const bg = document.querySelector('html');

export const startRec = () => {
  recognition.start();
  console.log('Ready to receive a color command.');
  // document.body.addEventListener('click', () => {
  // });
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
