import { clickHandler, initStartState } from './js/control';
import { getParams } from './js/utils/localStorage';
import { startRec, doRec, sayHello } from './js/utils/speech';

window.onload = async () => {
  // startRec();
  // doRec();
  initStartState();
  clickHandler();
  // sayHello();
  // keyboardHandler();
};
