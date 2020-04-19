export const addToContainer = (cont, elem) => {
  const container = document.querySelector(`.${cont}`);
  container.append(elem);
};

export const clearContainer = (cont) => {
  document.querySelector(`.${cont}`).innerHTML = '';
};

export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
