export const addToContainer = (cont, elem) => {
  const container = document.querySelector(`.${cont}`);
  container.append(elem);
};

export const clearContainer = (cont) => {
  document.querySelector(`.${cont}`).innerHTML = '';
};
