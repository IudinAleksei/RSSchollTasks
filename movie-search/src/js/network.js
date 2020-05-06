const getDataFromApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = (res.ok) ? await res.json() : 'bad response';

    return data;
  } catch (err) {
    return 'connection error';
  }
};

export const getMovies = async (word, page) => {
  const url = `https://www.omdbapi.com/?s=${word}&page=${page}&apikey=170aef17`;

  const data = await getDataFromApi(url);

  return data;
};

export const getMovieRating = async (title) => {
  const url = `https://www.omdbapi.com/?i=${title}&apikey=170aef17`;

  const data = await getDataFromApi(url);

  return data;
};

export const getTranslate = async (word) => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200421T084156Z.8eb8c0246fffb61e.780bc9f73b105718a88f1ccd7658c5b3005b7921&text=${word}&lang=ru-en`;

  const data = await getDataFromApi(url);

  return data;
};
