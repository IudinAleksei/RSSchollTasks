import {
  clickHandler, keyboardHandler, initStartState,
} from './js/control';

window.onload = () => {
  initStartState();
  clickHandler();
  keyboardHandler();
};
