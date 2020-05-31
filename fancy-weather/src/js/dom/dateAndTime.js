import { PAGE_ELEMENT, WEEKDAY_AND_MONTH } from '../constants/constants';
import { getCurrentDate } from '../utils/date';

export const getMonthAndWeekdayName = (numericDate, lang) => {
  const dateString = `${WEEKDAY_AND_MONTH[lang].weekday[numericDate[0]]} ${numericDate[1]} ${WEEKDAY_AND_MONTH[lang].month[numericDate[2]]}`;
  return dateString;
};

const getDateAndTime = (timeshift = 0, lang) => {
  const current = getCurrentDate(timeshift);
  const timeOptions = {
    timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit',
  };

  const numericDate = [current.getUTCDay(), current.getUTCDate(), current.getUTCMonth()];
  const timeString = current.toLocaleString([], timeOptions);
  const dateString = getMonthAndWeekdayName(numericDate, lang);

  const dateAndTimeString = `${dateString} ${timeString}`;

  return dateAndTimeString;
};

const createDateAndTime = (timeshift, lang = 'en') => {
  const dateAndTime = document.createElement('p');

  dateAndTime.classList.add(PAGE_ELEMENT.dateTime);

  setInterval(() => {
    const currentTime = getDateAndTime(timeshift, lang);
    dateAndTime.innerText = currentTime;
  }, 100);

  return dateAndTime;
};

const createLocationDateAndTime = (country, city, timeshift, lang) => {
  const container = document.createElement('div');
  const location = document.createElement('p');
  const dateAndTime = createDateAndTime(timeshift, lang);

  container.classList.add(PAGE_ELEMENT.currentLocationContainer);
  location.classList.add(PAGE_ELEMENT.currentLocation);
  dateAndTime.classList.add(PAGE_ELEMENT.dateTime);

  location.innerText = `${city}, ${country}`;

  container.append(location);
  container.append(dateAndTime);

  return container;
};

export default createLocationDateAndTime;
