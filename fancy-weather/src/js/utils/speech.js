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

export const sayHello = () => {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance('воблачна, тэмпература паветра: 7°, Вецер 2 м/ с, вільготнасць 83%');
  utterThis.lang = 'be_BY';
  document.body.addEventListener('click', () => {
    synth.speak(utterThis);
  });
};
