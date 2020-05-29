import { convertFromCelciusToFahrenheit } from './convert';

export const roundTemp = (number) => {
  const result = Math.round(number);
  return result;
};

export const roundWindSpeed = (number) => {
  const result = Math.round(number * 10) / 10;
  return result;
};


export const getTemperatureValue = (tempCelcius, units) => {
  const tempInTargetUnits = (units === 'fahrenheit') ? convertFromCelciusToFahrenheit(tempCelcius) : tempCelcius;
  const result = roundTemp(tempInTargetUnits);

  return result;
};
