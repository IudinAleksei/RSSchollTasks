import { addToContainer } from './container_function';

const pageElement = {
  menu: 'navigation-menu',
  hideMenu: 'navigation-menu_hidden',
  menuList: 'navigation-menu__list',
  menuBtn: 'menu-button',
  menuBtnCheck: 'menu-button__checkbox',
  navLink: 'navigation-menu__list__item',
  selectNavLink: 'navigation-menu__list__item_selected',
};

const createNavItem = (navItem = '') => {
  const elem = document.createElement('li');
  elem.classList.add(pageElement.navLink);
  elem.innerText = navItem;
  return elem;
};

export const fillNavigation = (navList = []) => {
  navList.forEach((item, index) => {
    const link = createNavItem(item);
    if (index === 0) {
      link.classList.add(pageElement.selectNavLink);
    }
    addToContainer(pageElement.menuList, link);
  });
};

const hideNavigationMenu = (event) => {
  if (!event.target.classList.contains(pageElement.menu)) {
    document.querySelector(`.${pageElement.menuBtnCheck}`).checked = false;
    const navClassList = document.querySelector(`.${pageElement.menu}`).classList;
    if (!navClassList.contains(pageElement.hideMenu)) {
      navClassList.add(pageElement.hideMenu);
    }
    document.removeEventListener('click', hideNavigationMenu);
  }
};

export const menuButtonHandler = () => {
  const btn = document.querySelector(`.${pageElement.menuBtn}`);
  const checkbox = document.querySelector(`.${pageElement.menuBtnCheck}`);
  const menu = document.querySelector(`.${pageElement.menu}`);
  btn.addEventListener('click', (e) => {
    if (checkbox.checked) {
      menu.classList.remove(pageElement.hideMenu);
      e.stopImmediatePropagation();
      document.addEventListener('click', hideNavigationMenu);
    }
  });
};
