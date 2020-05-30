import { getDaytime, getSeason } from './date';

const getKeywords = (timeshift, lat) => {
  const dayTime = getDaytime(timeshift);
  const season = getSeason(timeshift, lat);

  const keywords = `${dayTime}, ${season}, nature`;

  return keywords;
};

export default getKeywords;
