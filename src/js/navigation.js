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
    document.querySelector('.navigation-menu').tabIndex = -1;
  });
};

const hideNavigationMenu = (event) => {
  if (!event.target.classList.contains('navigation-menu')) {
    document.querySelector('.menu-button__checkbox').checked = false;
    const navClassList = document.querySelector('.navigation-menu').classList;
    if (!navClassList.contains('navigation-menu_hidden')) {
      navClassList.add('navigation-menu_hidden');
    }
    document.removeEventListener('click', hideNavigationMenu);
  }
};

export const menuButtonHandler = () => {
  const btn = document.querySelector('.menu-button');
  const checkbox = document.querySelector('.menu-button__checkbox');
  const menu = document.querySelector('.navigation-menu');
  btn.addEventListener('click', (e) => {
    if (checkbox.checked) {
      menu.classList.remove('navigation-menu_hidden');
      e.stopImmediatePropagation();
      document.addEventListener('click', hideNavigationMenu);
    }
  });
};
