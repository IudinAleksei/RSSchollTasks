export const addCardStats = (word, soundInTrain, soundInGame, correct, error) => {
  const count = window.localStorage.getItem(word);
  if (count === null) {
    window.localStorage.setItem(word, 1);
  } else {
    window.localStorage.setItem(word, +count + 1);
  }
};

export const getStats = (word) => {
  const count = window.localStorage.getItem(word);
  console.log(`${word} : ${count}`);
};
