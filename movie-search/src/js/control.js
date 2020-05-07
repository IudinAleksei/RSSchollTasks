import { activateKeyboard, toggleKeyboardVisibility } from './keyboard';
import { addRequestToSlider, clearSlider, doBeforeSliderEnd } from './slider';
import { getMovies, getMovieRating, getTranslate } from './network';

const pageElement = {
  searchContainer: 'search-container',
  searchButton: 'search__button',
  input: 'search__input',
  message: 'message',
  indicator: 'load-indicator',
  hideIndicator: 'load-indicator_hidden',
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

const getEnglish = async (request) => {
  const rusRegexp = /[А-яё]/g;
  const isNeedTranslate = rusRegexp.test(request);
  let engRequest = request;

  if (isNeedTranslate) {
    const yandexResponse = await getTranslate(request);
    [engRequest] = (yandexResponse.code >= 200 && yandexResponse.code < 300) ? yandexResponse.text : ['translation_error'];
  }

  return engRequest;
};

const setMessageText = (text) => {
  const message = document.querySelector(`.${pageElement.message}`);
  message.innerText = text;
};

const sendRequest = async (request) => {
  const requestToOmdb = await getEnglish(request);
  if (requestToOmdb === 'translation_error') {
    return 'translation_error';
  }
  currentSearch = requestToOmdb;
  const data = await getMovies(requestToOmdb);

  return data;
};

const getAllMovieWithRating = async (movieList) => {
  const requestList = movieList.map(async (item) => {
    const tempClone = { ...item };
    const { imdbID } = item;

    const response = await getMovieRating(imdbID);

    tempClone.Rating = response.imdbRating;
    return tempClone;
  });

  const allResponse = await Promise.allSettled(requestList);
  const moviesWithRaiting = allResponse.map((item) => item.value);

  return moviesWithRaiting;
};

const requestAndAdd = async (title, clear = false) => {
  setIndicatorVisible(true);
  const data = await sendRequest(title);
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

      currentSearch = input.value;
      await requestAndAdd(currentSearch, true);
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
