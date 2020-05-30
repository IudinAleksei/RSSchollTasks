const PAGE_ELEMENT = {
  message: 'search__message',
};

const setUserMessage = (text) => {
  const messageContainer = document.querySelector(`.${PAGE_ELEMENT.message}`);

  messageContainer.innerText = text;
};

export default setUserMessage;
