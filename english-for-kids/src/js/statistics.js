import cards from './library';
import { addToContainer, clearContainer } from './container_function';

let sortAsc = true;
let sortColumn = 0;
let currentCategory = 'All category';
let difficultWords = [];

const pageElement = {
  container: 'card-container',
  statsTableContainer: 'table-container',
  statsTable: 'statistics-table',
  tableCell: 'statistics-table__cell',
  tableHead: 'statistics-table__head',
  tableHeadCell: 'statistics-table__head__cell',
  statsBtnContainer: 'statistics-button-container',
  selector: 'category-selector',
  statsBtn: 'statistics-button',
  statsBtnRepeat: 'statistics-button_repeat',
  statsBtnClear: 'statistics-button_clear',
};

const CATEGORY_LIST = ['All category'].concat(cards[0]);

const STATS_TITLES = ['word', 'translation', 'category', 'sounded on training', 'correct answered', 'wrong answered', 'percent of wrong, %'];

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

const createTHead = () => {
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  thead.classList.add(pageElement.tableHead);
  STATS_TITLES.forEach((item) => {
    const headCell = document.createElement('th');
    headCell.classList.add(pageElement.tableHeadCell);
    headCell.innerText = item;
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

const sortCell = (x, y) => {
  if (sortAsc) {
    if (x[sortColumn] > y[sortColumn]) return 1;
    if (x[sortColumn] < y[sortColumn]) return -1;
  }
  if (x[sortColumn] < y[sortColumn]) return 1;
  if (x[sortColumn] > y[sortColumn]) return -1;
  return 0;
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
        const persentError = (total) ? (statsNums[2] * 100) / total : 0;
        statsNums = statsNums.concat([persentError]);
        const statsWord = [inner.word, inner.translation, cards[0][index]].concat(statsNums);
        statsArray.push(statsWord);
      }
    });
  });
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
  thead.addEventListener('click', (e) => {
    if (e.target.classList.contains(pageElement.tableHeadCell)) {
      const cellName = e.target.innerText;
      const cellNum = STATS_TITLES.indexOf(cellName);
      if (sortColumn === cellNum) {
        sortAsc = !sortAsc;
      }
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
      console.log('lalala');
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
