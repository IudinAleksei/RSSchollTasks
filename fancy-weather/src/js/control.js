const pageElement = {
};

const currentState = {
};

const imageLoadHandler = () => {
  let imageLoaded = 0;
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
    
  });
};

export const initStartState = async () => {  
};

export const keyboardHandler = () => {
  };
