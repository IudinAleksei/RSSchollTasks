
import {
  clickHandler, keyboardHandler, sliderUpdater, initStartState,
} from './js/control';

window.onload = () => {
  initStartState();
  clickHandler();
  keyboardHandler();
  sliderUpdater();
};
