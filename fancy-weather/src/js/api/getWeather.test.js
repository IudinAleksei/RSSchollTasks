import { getMinMaxAverageTemp } from './getWeather';

describe('convert temperature', () => {
  const temperatureObject = {
    day: 9.26,
    eve: 9.26,
    max: 9.26,
    min: 8.81,
    morn: 9.26,
    night: 8.81,
  };

  const temperatureArray = getMinMaxAverageTemp(temperatureObject);

  const averageTemperature = temperatureArray[2];

  it('average should be less than max temp or equal', () => {
    expect(averageTemperature).toBeLessThanOrEqual(temperatureObject.max);
  });

  it('average should be greater than min temp or equal', () => {
    expect(averageTemperature).toBeGreaterThanOrEqual(temperatureObject.min);
  });
});
