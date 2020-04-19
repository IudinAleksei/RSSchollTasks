import cards from './library';
import fillCardContainer from './card_creator';
import { addToContainer, clearContainer } from './container_function';

let sortAsc = true;
let sortColumn = 0;
let currentCategory = 'All category';
let difficultWords = [];

const assets = {
  arrowUp: 'assets/icons/arrow-up.svg',
  arrowBack: 'assets/icons/arrow-back.svg',
};

const pageElement = {
  container: 'card-container',
  statsTableContainer: 'table-container',
  statsTable: 'statistics-table',
  tableCell: 'statistics-table__cell',
  tableHead: 'statistics-table__head',
  tableHeadCell: 'statistics-table__head__cell',
  cellArrowUp: 'cell__arrow-up',
  cellArrowDown: 'cell__arrow-up_down',
  hideCellArrow: 'cell__arrow-up_hidden',
  statsBtnContainer: 'statistics-button-container',
  selector: 'category-selector',
  statsBtn: 'statistics-button',
  statsBtnRepeat: 'statistics-button_repeat',
  statsBtnClear: 'statistics-button_clear',
  statsMessage: 'statistics-message',
};

const CATEGORY_LIST = ['All category'].concat(cards[0]);

const STATS_TITLES = ['word', 'translation', 'category', 'sounded on training', 'correct answer', 'wrong answer', 'percent of wrong, %'];

const statsToString = (statsArray) => {
  const outString = statsArray.join(';');
  return outString;
};

const stringToStats = (str) => {
  const statsArray = str.split(';');
  return statsArray;
};

export const addCardStats = (card, soundInTrain, correct, error) => {
  const word = card.firstElementChild.children[2].innerText;
  const keyWord = `dataStats: ${word}`;
  const fromStorage = window.localStorage.getItem(keyWord);
  let toStorage = '';
  const currentStatsArray = [soundInTrain, correct, error];
  if (fromStorage === null) {
    toStorage = statsToString(currentStatsArray);
  } else {
    let statNums = stringToStats(fromStorage);
    statNums = statNums.map((item, index) => +item + currentStatsArray[index]);
    toStorage = statsToString(statNums);
  }
  window.localStorage.setItem(keyWord, toStorage);
};

const getStats = (keyWord) => {
  const fromStorage = window.localStorage.getItem(keyWord);
  const outStats = (fromStorage !== null) ? stringToStats(fromStorage) : [0, 0, 0];
  return outStats;
};

const clearStats = () => {
  window.localStorage.clear();
};

const createArrowImage = (src) => {
  const img = document.createElement('img');
  img.classList.add(pageElement.cellArrowUp, pageElement.hideCellArrow);
  img.setAttribute('src', src);
  const alt = src.match(/\w+(?=\.)/);
  img.setAttribute('alt', alt);
  return img;
};

const createTHead = () => {
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  thead.classList.add(pageElement.tableHead);
  STATS_TITLES.forEach((item) => {
    const headCell = document.createElement('th');
    const arrow = createArrowImage(assets.arrowUp);
    headCell.classList.add(pageElement.tableHeadCell);
    headCell.innerText = item;
    headCell.append(arrow);
    headRow.append(headCell);
  });
  thead.append(headRow);
  return thead;
};

const createTableRow = (wordStats) => {
  const row = document.createElement('tr');
  wordStats.forEach((item) => {
    const cell = document.createElement('td');
    cell.classList.add(pageElement.tableCell);
    cell.innerText = item;
    row.append(cell);
  });
  return row;
};

const sortFunc = (x, y, type, column) => {
  if (type) {
    if (x[column] > y[column]) return 1;
    if (x[column] < y[column]) return -1;
  }
  if (x[column] < y[column]) return 1;
  if (x[column] > y[column]) return -1;
  return 0;
};

const sortPercent = (x, y) => sortFunc(x, y, false, 6);

const sortCell = (x, y) => sortFunc(x, y, sortAsc, sortColumn);

const selectDifficultWords = (statsArray) => {
  let tempWordArray = statsArray.sort(sortPercent).slice(0, 8);
  tempWordArray = tempWordArray.filter((item) => +item[6] > 0);
  difficultWords = [];
  tempWordArray.forEach((outer) => {
    const categoryIndex = cards[0].indexOf(outer[2]) + 1;
    const difficultCard = cards[categoryIndex].find((inner) => inner.word === outer[0]);
    difficultWords.push(difficultCard);
  });
};

const fillStatsTable = () => {
  const table = document.querySelector('tbody');
  table.innerHTML = '';
  const library = cards.slice(1);
  const statsArray = [];
  library.forEach((item, index) => {
    item.forEach((inner) => {
      if (currentCategory === 'All category' || cards[0][index] === currentCategory) {
        const keyWord = `dataStats: ${inner.word}`;
        let statsNums = getStats(keyWord);
        const total = +statsNums[1] + +statsNums[2];
        const persentError = (total) ? Math.round((statsNums[2] * 1000) / total) / 10 : 0;
        statsNums = statsNums.concat([persentError]);
        const statsWord = [inner.word, inner.translation, cards[0][index]].concat(statsNums);
        statsArray.push(statsWord);
      }
    });
  });
  selectDifficultWords(statsArray);
  statsArray.sort(sortCell);
  statsArray.forEach((item) => {
    const row = createTableRow(item);
    table.append(row);
  });
};

const categorySelector = () => {
  const selector = document.createElement('select');
  selector.classList.add(pageElement.selector);
  CATEGORY_LIST.forEach((item) => {
    const option = document.createElement('option');
    option.setAttribute('value', item);
    option.innerText = item;
    selector.append(option);
  });
  return selector;
};

const createStatsButtons = () => {
  const container = document.createElement('div');
  const btnRepeat = document.createElement('button');
  const btnClear = document.createElement('button');
  const selector = categorySelector();
  container.classList.add(pageElement.statsBtnContainer);
  btnRepeat.classList.add(pageElement.statsBtn, pageElement.statsBtnRepeat);
  btnClear.classList.add(pageElement.statsBtn, pageElement.statsBtnClear);
  btnRepeat.innerText = 'Repeat difficult words';
  btnClear.innerText = 'Reset statistics';
  container.append(selector);
  container.append(btnRepeat);
  container.append(btnClear);
  return container;
};

const selectorHandler = () => {
  const selector = document.querySelector(`.${pageElement.selector}`);
  selector.addEventListener('change', () => {
    currentCategory = selector.value;
    fillStatsTable();
  });
};

const tableHeadClickHandler = () => {
  const thead = document.querySelector(`.${pageElement.tableHead}`);
  const allArrows = document.querySelectorAll(`.${pageElement.cellArrowUp}`);
  thead.addEventListener('click', (e) => {
    if (e.target.classList.contains(pageElement.tableHeadCell)) {
      const cellName = e.target.innerText;
      const cellNum = STATS_TITLES.indexOf(cellName);
      if (sortColumn === cellNum) {
        sortAsc = !sortAsc;
      }
      allArrows.forEach((item) => {
        item.classList.add(pageElement.hideCellArrow);
        if (sortAsc) {
          item.classList.remove(pageElement.cellArrowDown);
        } else {
          item.classList.add(pageElement.cellArrowDown);
        }
      });
      e.target.firstElementChild.classList.remove(pageElement.hideCellArrow);
      sortColumn = cellNum;
      fillStatsTable();
    }
  });
};

const createStatsTable = () => {
  const tableContainer = document.createElement('div');
  const table = document.createElement('table');
  const thead = createTHead();
  const tbody = document.createElement('tbody');
  tableContainer.classList.add(pageElement.statsTableContainer);
  table.classList.add(pageElement.statsTable);
  table.append(thead);
  table.append(tbody);
  tableContainer.append(table);
  return tableContainer;
};

const statsButtonsHandler = () => {
  const container = document.querySelector(`.${pageElement.statsBtnContainer}`);
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains(pageElement.statsBtnClear)) {
      clearStats();
      fillStatsTable();
    } else if (e.target.classList.contains(pageElement.statsBtnRepeat)) {
      if (difficultWords.length > 0) {
        fillCardContainer(difficultWords);
      } else {
        clearContainer(pageElement.container);
        const message = document.createElement('p');
        message.classList.add(pageElement.statsMessage);
        message.innerText = 'You didn\'t make any mistakes!';
        addToContainer(pageElement.container, message);
      }
    }
  });
};

export const fillStatsPage = () => {
  const btns = createStatsButtons();
  const table = createStatsTable();
  clearContainer(pageElement.container);
  addToContainer(pageElement.container, btns);
  addToContainer(pageElement.container, table);
  sortAsc = true;
  sortColumn = 0;
  currentCategory = 'All category';
  fillStatsTable();
  statsButtonsHandler();
  tableHeadClickHandler();
  selectorHandler();
};
