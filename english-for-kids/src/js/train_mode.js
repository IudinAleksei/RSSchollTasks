/* eslint-disable import/prefer-default-export */
const pageElement = {
  menu: 'navigation-menu',
  navLink: 'navigation-menu__list__item',
  selectedNavLink: 'navigation-menu__list__item_selected',
  modeSwitcher: 'switch__checkbox',
  cardFlipper: 'card-flipper',
  cardFlipperRotated: 'card-flipper_rotated',
  rotateBtns: 'card__button',
};

export const rotateClickHandler = () => {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains(pageElement.rotateBtns)) {
      const flipper = e.target.parentElement.parentElement;
      flipper.classList.add(pageElement.cardFlipperRotated);
      setTimeout(() => {
        flipper.addEventListener('mouseleave', () => flipper.classList.remove(pageElement.cardFlipperRotated), { once: true });
      }, 10);
    }
  });
};
