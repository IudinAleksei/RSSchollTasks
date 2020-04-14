const pageElement = {
  cardContainer: 'card-container',
  imgs: 'card__image',
};

export const addToContainer = (cont, elem) => {
  const container = document.querySelector(`.${cont}`);
  container.append(elem);
};

export const clearContainer = (cont) => {
  document.querySelector(`.${cont}`).innerHTML = '';
};

export const cardClickHandler = () => {
  const cont = document.querySelector(`.${pageElement.cardContainer}`);
  cont.addEventListener('click', (e) => {
    if (e.target.classList.contains(pageElement.imgs)) {
      console.log(e.target);
    } else {
      console.log(false);
    }
  });
};
