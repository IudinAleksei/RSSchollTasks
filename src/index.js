import cards from './js/library';
import fillCardContainer from './js/cardCreator';
import fillNavigation from './js/navigation';

const LINKS = ['Main Page'].concat(cards[0]);

let currentPage = 0;

const hideNavigationMenu = () => {
  document.querySelector('.navigation-menu').classList.add('navigation-menu_hidden');
  document.querySelector('.menu-button__checkbox').checked = false;
};

const menuButtonHandler = () => {
  document.querySelector('.menu-button').addEventListener('click', () => {
    if (document.querySelector('.menu-button__checkbox').checked) {
      document.querySelector('.navigation-menu').classList.remove('navigation-menu_hidden');
    } else {
      hideNavigationMenu();
    }
  });
};

const navigationMenuHandler = () => {
  document.querySelector('.navigation-menu').addEventListener('click', (e) => {
    if (e.target.classList.contains('navigation-menu__list__item')) {
      currentPage = LINKS.indexOf(e.target.innerText);
      fillCardContainer(cards[currentPage]);
      hideNavigationMenu();
    }
  });
};

window.onload = () => {
  fillNavigation(LINKS);
  fillCardContainer(cards[currentPage]);
  menuButtonHandler();
  navigationMenuHandler();
};
