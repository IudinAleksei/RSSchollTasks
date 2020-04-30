async function getMovieTitle(page) {
  const url = `https://www.omdbapi.com/?s=dream&page=${page}&apikey=9b67fc54`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}
