import cards from './js/library';
import { fillCardContainer, imageLoadHandler } from './js/card_creator';
import { fillNavigation, menuButtonHandler } from './js/navigation';
import { turnPageToGameMode, isCorrectCard, getNextCard } from './js/game_mode';
import { rotateCard } from './js/train_mode';
import { playAudio, playSound } from './js/audio';
import { addCardStats, getStats } from './js/statistics';

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

const changeCurrentPage = (page) => {
  if (currentPage !== page) {
    currentPage = page;
    fillCardContainer(cards[currentPage]);
    const links = document.querySelectorAll(`.${pageElement.navLink}`);
    links.forEach((item) => item.classList.remove(pageElement.selectedNavLink));
    links[currentPage].classList.add(pageElement.selectedNavLink);
    turnPageToGameMode(false);
    if (currentPage !== 0 && isGame) {
      turnPageToGameMode(isGame);
    }
  }
};

const getCardNumber = (img) => {
  const cardList = Array.from(document.querySelectorAll(`.${pageElement.flip}`));
  const card = img.parentElement.parentElement;
  const number = cardList.indexOf(card);
  return number;
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
    if (switcher.checked) {
      isGame = true;
      if (currentPage !== 0) {
        turnPageToGameMode(isGame);
      }
    } else {
      isGame = false;
      turnPageToGameMode(isGame);
    }
  });
};

const imageClickHandler = () => {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.addEventListener('click', (e) => {
    // handle click on category card on main page
    const catBacking = e.path.find((item) => {
      if (item.tagName) {
        return item.classList.contains(pageElement.categoryBacking);
      }
      return false;
    });
    if (catBacking) {
      const categoryName = catBacking.children[1].innerText;
      changeCurrentPage(LINKS.indexOf(categoryName));
    }
    // handle click on card image in category page
    const cardNumber = getCardNumber(e.target);
    if (e.target.classList.contains(pageElement.cardImage)) {
      if (!isGame) {
        // const cardWord = e.target.nextElementSibling.nextElementSibling.innerText;
        playAudio(cardNumber);
        // addCardStats(cardWord, 1, 0, 0, 0);
      } else if (isCorrectCard(cardNumber)) {
        playSound('correct');
        document.body.addEventListener('soundEnded', () => {
          const nextCard = getNextCard();
          if (typeof nextCard === 'string') {
            changeCurrentPage(0);
          }
        }, { once: true });
      } else {
        playSound('error');
      }
    // handle click on rotate button in category page
    } else if (e.target.classList.contains(pageElement.rotateBtns)) {
      rotateCard(e);
    }
  });
};

window.onload = () => {
  initDefaultState();
  menuButtonHandler();
  navigationMenuHandler();
  switcherHandler();
  imageClickHandler();
  imageLoadHandler();
};
