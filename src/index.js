import cards from './js/library';
import fillCardContainer from './js/cardCreator';
import { fillNavigation, menuButtonHandler } from './js/navigation';
import { turnPageToGameMode, isCorrectCard, getNextCard } from './js/gameMode';
import { playAudio, playSound } from './js/audio';
import { addCardStats, getStats } from './js/statistics';



const pageElement = {
  menu: 'navigation-menu',
  navLink: 'navigation-menu__list__item',
  selectedNavLink: 'navigation-menu__list__item_selected',
  modeSwitcher: 'switch__checkbox',
  cardFlipper: 'card-flipper',
};

const LINKS = ['Main Page'].concat(cards[0]);

let currentPage = 0;
let isGame = false;


const initDefaultState = () => {
  document.querySelector(`.${pageElement.navLink}`).classList.add(pageElement.selectedNavLink);
  isGame = false;
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
  const cardList = Array.from(document.querySelectorAll(`.${pageElement.cardFlipper}`));
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
    if (e.target.classList.contains('card__image')) {
      const nextTag = e.target.nextElementSibling;
      const cardNumber = getCardNumber(e.target);
      if (currentPage === 0) {
        changeCurrentPage(LINKS.indexOf(nextTag.innerText));
      } else if (isGame) {
        if (isCorrectCard(cardNumber)) {
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
      } else {
        playAudio(cardNumber);
        const wrd = nextTag.nextElementSibling.innerText;
        addCardStats(wrd, 1);
        getStats(wrd);
      }
    }
  });
};

window.onload = () => {
  fillNavigation(LINKS);
  fillCardContainer(cards[currentPage]);
  menuButtonHandler();
  navigationMenuHandler();
  switcherHandler();
  imageClickHandler();
  initDefaultState();
  // cardClickHandler();
};
