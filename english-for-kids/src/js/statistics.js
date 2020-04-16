const statsToString = (...x) => {
  const outString = x.join(';');
  return outString;
};

const stringToStats = (str) => {
  let statsArray = str.split(';');
  statsArray = statsArray.map((item) => +item);
  return statsArray;
};

export const addCardStats = (word, soundInTrain, soundInGame, correct, error) => {
  const fromStorage = window.localStorage.getItem(word);
  let toStorage = '';
  if (fromStorage === null) {
    toStorage = statsToString(soundInTrain, soundInGame, correct, error);
  } else {
    const currentStatsArray = [soundInTrain, soundInGame, correct, error];
    let statNums = stringToStats(fromStorage);
    statNums = statNums.map((item, index) => item + currentStatsArray[index]);
    toStorage = statsToString(...statNums);
  }
  window.localStorage.setItem(word, toStorage);
};

export const getStats = (word) => {
  const fromStorage = window.localStorage.getItem(word);
  const outStats = [word].concat(stringToStats(fromStorage));
  return outStats;
};

export const clearStats = () => {
  window.localStorage.clear();
};
