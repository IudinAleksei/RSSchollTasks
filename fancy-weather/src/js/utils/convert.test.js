import { convertFromCelciusToFahrenheit, convertMStoMilesHour, convertCoordinate } from './convert';

describe('convert temperature', () => {
  it('should return correct value', () => {
    expect(convertFromCelciusToFahrenheit(0)).toBe(32);
  });

  it('should be greater than absolute zero temperature ', () => {
    expect(convertFromCelciusToFahrenheit(-20)).toBeGreaterThan(-459.67);
  });
});

describe('convert speed', () => {
  it('should return correct value', () => {
    expect(convertMStoMilesHour(17)).toBeCloseTo(38.03, 2);
  });

  it('should be greater than absolute zero temperature ', () => {
    expect(convertMStoMilesHour(5)).not.toBeNaN();
  });
});

describe('convert coordinate', () => {
  it('should contain degree sign', () => {
    expect(convertCoordinate(56.1101)).toContain('°');
  });

  it('should return truthy value', () => {
    expect(convertCoordinate(0)).toBeTruthy();
  });
});
