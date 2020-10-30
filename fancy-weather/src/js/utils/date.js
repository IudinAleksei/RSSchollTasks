import { SEASONS, DAYTIME } from '../constants/constants';

export const getCurrentDate = (timeshift) => {
  const utcTime = Date.now();

  const current = new Date();
  current.setTime(utcTime + timeshift * 1000);

  return current;
};

export const getDaytime = (timeshift) => {
  const currentTime = getCurrentDate(timeshift);
  const hour = currentTime.getUTCHours();
  if (hour < 6) {
    return DAYTIME[0];
  }
  if (hour < 12) {
    return DAYTIME[1];
  }
  if (hour < 18) {
    return DAYTIME[2];
  }

  return DAYTIME[3];
};

const seasonShift = (month, lat) => {
  let monthShift;
  if (lat > 0) {
    const northMonthShift = 1;
    monthShift = northMonthShift;
  } else {
    const southMonthShift = 7;
    monthShift = southMonthShift;
  }

  const shiftedMonth = (month + monthShift) % 12;

  return shiftedMonth;
};

export const getSeason = (timeshift, lat) => {
  const currentTime = getCurrentDate(timeshift);
  const month = currentTime.getUTCMonth();
  const shiftedMonth = seasonShift(month, lat);

  if (shiftedMonth < 3) {
    return SEASONS[0];
  }
  if (shiftedMonth < 6) {
    return SEASONS[1];
  }
  if (shiftedMonth < 9) {
    return SEASONS[2];
  }

  return SEASONS[3];
};
