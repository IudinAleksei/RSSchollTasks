const SEASONS = ['winter', 'spring', 'summer', 'autumn'];

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
    return 'night';
  }
  if (hour < 12) {
    return 'morning';
  }
  if (hour < 18) {
    return 'day';
  }

  return 'evening';
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
