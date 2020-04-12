import { addToContainer } from './containerFunction';

const createNavItem = (navItem = '') => {
  const elem = document.createElement('li');
  elem.classList.add('navigation-menu__list__item');
  elem.innerText = navItem;
  return elem;
};

const fillNavigation = (navList = []) => {
  navList.forEach((item) => {
    const navLink = createNavItem(item);
    addToContainer('navigation-menu__list', navLink);
  });
};

export default fillNavigation;
