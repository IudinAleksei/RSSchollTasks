/* eslint-disable import/prefer-default-export */

const pageElement = {
  searchContainer: 'search-container',
  input: 'search__input',
  message: 'message',
};

export const clickHandler = () => {
  const searchContainer = document.querySelector(`.${pageElement.searchContainer}`);
  const input = document.querySelector(`.${pageElement.input}`);
  const message = document.querySelector(`.${pageElement.message}`);

  searchContainer.addEventListener('click', (event) => {
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
      message.innerText = `Search results for ${input.value}`;
      input.focus();
    }

    // Click on keyboard button
    if (event.target.dataset.do === 'keyboard') {
      event.preventDefault();
      // show keyboard function
      input.focus();
    }
  });
};
