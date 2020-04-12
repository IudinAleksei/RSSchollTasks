import { addToContainer } from './containerFunction';

const createNavItem = (navItem = '') => {
  const elem = document.createElement('li');
  elem.classList.add('navigation-menu__list__item');
  elem.innerText = navItem;
  return elem;
};

export const fillNavigation = (navList = []) => {
  navList.forEach((item) => {
    const navLink = createNavItem(item);
    addToContainer('navigation-menu__list', navLink);
  });
};

export const hideNavigationMenu = () => {
  document.querySelector('.navigation-menu').classList.add('navigation-menu_hidden');
  document.querySelector('.menu-button__checkbox').checked = false;
};

export const menuButtonHandler = () => {
  document.querySelector('.menu-button__checkbox').addEventListener('change', () => {
    if (document.querySelector('.menu-button__checkbox').checked) {
      document.querySelector('.navigation-menu').classList.remove('navigation-menu_hidden');
    } else {
      hideNavigationMenu();
    }
  });
};
