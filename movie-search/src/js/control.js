import { activateKeyboard, toggleKeyboardVisibility } from './keyboard';
import {
  addRequestToSlider, clearSlider, reportBeforeSliderEnd, unhideSlides,
} from './slider';
import { sendRequest, getAllMovieWithRating } from './network';

const pageElement = {
  swiperContainer: 'swiper-container',
  searchContainer: 'search-container',
  searchButton: 'search__button',
  input: 'search__input',
  message: 'message',
  indicator: 'lds-dual-ring',
  hideIndicator: 'lds-dual-ring_hidden',
};

const currentState = {
  request: 'star',
  page: 1,
  moviesOnCurrentPage: 0,
  moviesPerPage: 10,
  totalPagesForRequest: 0,
  isRequestFinished: true,
};

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


const imageLoadHandler = () => {
  let posterLoaded = 0;
  const swiper = document.querySelector(`.${pageElement.swiperContainer}`);
  swiper.addEventListener('posterLoadEnd', () => {
    posterLoaded += 1;
    if (posterLoaded >= currentState.moviesOnCurrentPage) {
      unhideSlides();
    }
  });
};

const requestAndAdd = async (clear = false) => {
  setIndicatorVisible(true);
  const [data, requestToOmdb] = await sendRequest(currentState.request, currentState.page);

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

  currentState.totalPagesForRequest = Math.ceil(data.totalResults / currentState.moviesPerPage);
  currentState.moviesOnCurrentPage = data.Search.length;
  const moviesWithRaiting = await getAllMovieWithRating(data.Search);

  if (clear) {
    currentState.page = 1;
    clearSlider();
  }
  currentState.request = requestToOmdb;
  addRequestToSlider(moviesWithRaiting);
  imageLoadHandler();
  setMessageText(`Search results for ${currentState.request}`);
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
      return;
    }

    // Click on search button
    if (event.target.dataset.do === 'search') {
      event.preventDefault();

      currentState.request = input.value;
      currentState.isRequestFinished = false;
      await requestAndAdd(true);
      currentState.isRequestFinished = true;

      input.focus();
      return;
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
  await requestAndAdd(currentState.request);
};

export const sliderUpdater = () => {
  reportBeforeSliderEnd();
  document.body.addEventListener('sliderNearEnd', async () => {
    if (currentState.isRequestFinished && currentState.page < currentState.totalPagesForRequest) {
      currentState.isRequestFinished = false;
      currentState.page += 1;
      await requestAndAdd();
      currentState.isRequestFinished = true;
    }
  });
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
