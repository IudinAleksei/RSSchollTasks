import { activateKeyboard, toggleKeyboardVisibility } from './keyboard';
import { addRequestToSlider, clearSlider } from './slider';
import { getMovies, getMovieRating, getTranslate } from './network';

const pageElement = {
  searchContainer: 'search-container',
  searchButton: 'search__button',
  input: 'search__input',
  message: 'message',
};

const getEnglish = async (request) => {
  const rusRegexp = /[А-яё]/g;
  const isNeedTranslate = rusRegexp.test(request);
  let engRequest = request;

  if (isNeedTranslate) {
    const yandexResponse = await getTranslate(request);
    [engRequest] = yandexResponse.text;
  }

  return engRequest;
};

const setMessageText = (text) => {
  const message = document.querySelector(`.${pageElement.message}`);
  message.innerText = text;
};

const sendRequest = async (request) => {
  const requestToOmdb = await getEnglish(request);
  const data = await getMovies(requestToOmdb);

  return data;
};

export const keyboardHandler = () => {
  activateKeyboard();
  const searchButton = document.querySelector(`.${pageElement.searchButton}`);
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      const searchEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        target: searchButton,
      });
      searchButton.dispatchEvent(searchEvent);
    }
  });
};

export const clickHandler = () => {
  const searchContainer = document.querySelector(`.${pageElement.searchContainer}`);
  const input = document.querySelector(`.${pageElement.input}`);

  searchContainer.addEventListener('click', async (event) => {
    // Click on clear button
    if (event.target.dataset.do === 'clear') {
      event.preventDefault();
      input.value = '';
      input.focus();
    }

    // Click on search button
    if (event.target.dataset.do === 'search') {
      event.preventDefault();
      // send request to OMDb
      const data = await sendRequest(input.value);
      clearSlider();
      addRequestToSlider(data.Search);
      setMessageText(`Search results for ${input.value}`);
      input.value = '';
      input.focus();
    }

    // Click on keyboard button
    if (event.target.dataset.do === 'keyboard') {
      event.preventDefault();
      toggleKeyboardVisibility();
      input.focus();
    }
  });
};
