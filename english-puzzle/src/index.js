import { userEventHandler, initStartState } from './js/control';

window.onload = async () => {
  initStartState();
  userEventHandler();
};
