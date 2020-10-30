import { userEventHandler, initStartState } from './js/control';
import infoClickHandler from './js/utils/info';

window.onload = async () => {
  initStartState();
  userEventHandler();
  infoClickHandler();
};
