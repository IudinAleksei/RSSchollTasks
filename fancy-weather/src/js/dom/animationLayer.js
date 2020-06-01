import { PAGE_ELEMENT } from '../constants/constants';

export const unhideWelcomeLayer = (setVisible = true) => {
  const welcomeLayer = document.querySelector(`.${PAGE_ELEMENT.welcomeLayer}`);
  if (setVisible) {
    welcomeLayer.classList.remove(PAGE_ELEMENT.hideWelcomeLayer);
    return;
  }
  welcomeLayer.classList.add(PAGE_ELEMENT.hideWelcomeLayer);
};

export const unhideBackgroundLayer = (setVisible = true) => {
  const welcomeLayer = document.querySelector(`.${PAGE_ELEMENT.backgroundLayer}`);
  if (setVisible) {
    welcomeLayer.classList.remove(PAGE_ELEMENT.hideBackgroundLayer);
    return;
  }
  welcomeLayer.classList.add(PAGE_ELEMENT.hideBackgroundLayer);
};
