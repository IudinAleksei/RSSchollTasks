// Цельсий х 1,8 + 32 = Фаренгейт
export const convertFromCelciusToFahrenheit = (celcuis) => {
  const fahrenheit = celcuis * 1.8 + 32;
  return fahrenheit;
};

// 1609,34 метров в миле, 3600 секунд в часе
export const convertMStoMilesHour = (mS) => {
  const METERS_PER_MILE = 1609.34;
  const SECONDS_IN_HOUR = 3600;
  const milesH = (mS * SECONDS_IN_HOUR) / METERS_PER_MILE;
  return milesH;
};

export const convertCoordinate = (coordInDeg) => {
  const degrees = Math.floor(coordInDeg);
  const afterDot = Math.abs(coordInDeg % 1);

  const tempMin = afterDot * 60;
  const minutes = Math.floor(tempMin);

  const tempSec = (tempMin - minutes) * 60;
  const seconds = Math.round(tempSec);

  const formattedCoord = `${degrees}°${minutes}′${seconds}″`;

  return formattedCoord;
};
