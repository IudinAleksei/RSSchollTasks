import { getCurrentDate } from '../utils/date';

const PAGE_ELEMENT = {
  locationContainer: 'weather__location',
  location: 'weather__location__city',
  dateTime: 'weather__location__date',
};

const WEEKDAY_AND_MONTH = {
  en: {
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  ru: {
    month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekday: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
  },
  be: {
    month: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Травень', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
    weekday: ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'],
  },
};

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

  container.classList.add(PAGE_ELEMENT.locationContainer);
  location.classList.add(PAGE_ELEMENT.location);
  dateAndTime.classList.add(PAGE_ELEMENT.dateTime);

  location.innerText = `${city}, ${country}`;

  container.append(location);
  container.append(dateAndTime);

  return container;
};

export default createLocationDateAndTime;
