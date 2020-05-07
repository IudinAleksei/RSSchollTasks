const getDataFromApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = (res.ok) ? await res.json() : 'bad response';

    return data;
  } catch (err) {
    return 'connection error';
  }
};

const getMovies = async (word, page = 1) => {
  const url = `https://www.omdbapi.com/?s=${word}&page=${page}&apikey=170aef17`;

  const data = await getDataFromApi(url);

  return data;
};

const getMovieRating = async (title) => {
  const url = `https://www.omdbapi.com/?i=${title}&apikey=170aef17`;

  const data = await getDataFromApi(url);

  return data;
};

const getTranslate = async (word) => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200421T084156Z.8eb8c0246fffb61e.780bc9f73b105718a88f1ccd7658c5b3005b7921&text=${word}&lang=ru-en`;

  const data = await getDataFromApi(url);

  return data;
};

const getEnglish = async (request) => {
  const rusRegexp = /[А-яё]/g;
  const isNeedTranslate = rusRegexp.test(request);
  let engRequest = request;

  if (isNeedTranslate) {
    const yandexResponse = await getTranslate(request);
    [engRequest] = (yandexResponse.code >= 200 && yandexResponse.code < 300) ? yandexResponse.text : ['translation_error'];
  }

  return engRequest;
};

export const sendRequest = async (request, page = 1) => {
  const requestToOmdb = await getEnglish(request);
  if (requestToOmdb === 'translation_error') {
    return 'translation_error';
  }

  const data = await getMovies(requestToOmdb, page);

  return [data, requestToOmdb];
};

export const getAllMovieWithRating = async (movieList) => {
  const requestList = movieList.map(async (item) => {
    const temp = { ...item };
    const { imdbID } = item;

    const response = await getMovieRating(imdbID);

    temp.Rating = response.imdbRating;
    return temp;
  });

  const allResponse = await Promise.allSettled(requestList);
  const moviesWithRaiting = allResponse.map((item) => item.value);

  return moviesWithRaiting;
};
