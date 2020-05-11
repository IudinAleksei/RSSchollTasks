const getDataFromApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = (res.ok) ? await res.json() : 'bad response';

    return data;
  } catch (err) {
    return 'connection error';
  }
};

