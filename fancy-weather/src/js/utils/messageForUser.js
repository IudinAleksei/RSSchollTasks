import { PAGE_ELEMENT } from '../constants/constants';

const setUserMessage = (text) => {
  const messageContainer = document.querySelector(`.${PAGE_ELEMENT.message}`);

  messageContainer.innerText = text;
};

export default setUserMessage;
