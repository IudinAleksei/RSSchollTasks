import cards from './js/library';
import fillCardContainer from './js/card_creator';
import { fillNavigation, menuButtonHandler } from './js/navigation';
import { turnPageToGameMode, mainPageToGameMode, isCorrectCard } from './js/game_mode';
import { rotateCard } from './js/train_mode';
import { playAudio } from './js/audio';
import { addCardStats, fillStatsPage } from './js/statistics';

const pageElement = {
  menu: 'navigation-menu',
  navLink: 'navigation-menu__list__item',
  selectedNavLink: 'navigation-menu__list__item_selected',
  modeSwitcher: 'switch__checkbox',
  flip: 'card-flipper',
  rotateBtns: 'card__button',
  cardImage: 'card__image',
  cardWord: 'card__word',
  categoryBacking: 'category__backing',
  smile: 'smile',
};

const LINKS = ['Main Page'].concat(cards[0]).concat(['Statistics']);
let currentPage = 0;
let isGame = false;


const initDefaultState = () => {
  isGame = false;
  currentPage = 0;
  fillNavigation(LINKS);
  fillCardContainer(cards[currentPage]);
};

const scrollToBegin = () => {
  window.scrollTo(0, 0);
};

const changeCurrentPage = (page) => {
  if (currentPage !== page) {
    currentPage = page;
    scrollToBegin();
    if (currentPage < LINKS.length - 1) {
      fillCardContainer(cards[currentPage]);
    } else {
      fillStatsPage();
    }
    const links = document.querySelectorAll(`.${pageElement.navLink}`);
    links.forEach((item) => item.classList.remove(pageElement.selectedNavLink));
    links[currentPage].classList.add(pageElement.selectedNavLink);
    turnPageToGameMode(false);
    if (currentPage === 0 && isGame) {
      mainPageToGameMode(isGame);
    } else if (currentPage < LINKS.length - 1 && isGame) {
      turnPageToGameMode(isGame);
    }
  }
};

const navigationMenuHandler = () => {
  const menu = document.querySelector(`.${pageElement.menu}`);
  menu.addEventListener('click', (e) => {
    if (e.target.classList.contains(pageElement.navLink)) {
      changeCurrentPage(LINKS.indexOf(e.target.innerText));
    }
  });
};

const switcherHandler = () => {
  const switcher = document.querySelector(`.${pageElement.modeSwitcher}`);
  switcher.addEventListener('change', () => {
    isGame = !!(switcher.checked);
    if (currentPage === 0) {
      mainPageToGameMode(isGame);
    } else if (currentPage < LINKS.length - 1) {
      turnPageToGameMode(isGame);
    }
  });
};

const gameFinishHandler = () => {
  document.body.addEventListener('gameFinish', () => {
    changeCurrentPage(0);
  });
};

const imageClickHandler = () => {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.addEventListener('click', (e) => {
    // handle click on category card on main page
    const category = e.path.find((item) => {
      if (item.tagName) {
        return item.classList.contains(pageElement.categoryBacking);
      }
      return false;
    });
    if (category) {
      const categoryName = category.children[1].innerText;
      changeCurrentPage(LINKS.indexOf(categoryName));
    }
    // handle click on card image in category page

    if (e.target.classList.contains(pageElement.cardImage)) {
      const clickedCard = e.path[2];
      if (!isGame) {
        playAudio(clickedCard);
        addCardStats(clickedCard, 1, 0, 0);
      } else {
        isCorrectCard(clickedCard);
      }
    // handle click on rotate button in category page
    } else if (e.target.classList.contains(pageElement.rotateBtns)) {
      rotateCard(e);
    }

    // handle click on smile
    if (e.target.classList.contains(pageElement.smile)) {
      changeCurrentPage(0);
    }
  });
};

window.onload = () => {
  initDefaultState();
  menuButtonHandler();
  navigationMenuHandler();
  switcherHandler();
  imageClickHandler();
  gameFinishHandler();
};
