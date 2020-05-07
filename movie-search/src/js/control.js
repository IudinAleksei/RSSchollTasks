import { activateKeyboard, toggleKeyboardVisibility } from './keyboard';
import { addRequestToSlider, clearSlider, doBeforeSliderEnd } from './slider';
import { sendRequest, getAllMovieWithRating } from './network';

const pageElement = {
  searchContainer: 'search-container',
  searchButton: 'search__button',
  input: 'search__input',
  message: 'message',
  indicator: 'lds-dual-ring',
  hideIndicator: 'lds-dual-ring_hidden',
};

let currentSearch = 'star';

const setIndicatorVisible = (isVisible = true) => {
  const indicator = document.querySelector(`.${pageElement.indicator}`);
  if (isVisible) {
    indicator.classList.remove(pageElement.hideIndicator);
    return;
  }
  indicator.classList.add(pageElement.hideIndicator);
};

const setMessageText = (text) => {
  const message = document.querySelector(`.${pageElement.message}`);
  message.innerText = text;
};

const requestAndAdd = async (title, clear = false) => {
  setIndicatorVisible(true);
  const [data, requestToOmdb] = await sendRequest(title);

  if (data === 'translation_error') {
    setMessageText('translation error');
    setIndicatorVisible(false);
    return;
  }
  if (data.Response !== 'True') {
    setMessageText(data.Error);
    setIndicatorVisible(false);
    return;
  }
  const moviesWithRaiting = await getAllMovieWithRating(data.Search);

  if (clear) {
    clearSlider();
  }
  currentSearch = requestToOmdb;
  addRequestToSlider(moviesWithRaiting);
  setMessageText(`Search results for ${currentSearch}`);
  setIndicatorVisible(false);
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

      await requestAndAdd(input.value, true);
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

export const initStartState = async () => {
  activateKeyboard();
  await requestAndAdd(currentSearch);
};

export const sliderUpdater = () => {
};

export const keyboardHandler = () => {
  const searchButton = document.querySelector(`.${pageElement.searchButton}`);

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      const searchEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        target: searchButton,
      });

      searchButton.dispatchEvent(searchEvent);
    }
  });
};
