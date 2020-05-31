import { roundTemp, roundWindSpeed, getTemperatureValue } from './round';

describe('round temperature value', () => {
  it('should be defined', () => {
    expect(roundTemp(12.12)).toBeDefined();
  });

  it('should return correct value', () => {
    expect(roundTemp(12.12)).toBeCloseTo(12, 0);
  });
});

describe('round wind speed', () => {
  it('should not to be null', () => {
    expect(roundWindSpeed(12.12)).not.toBeNull();
  });

  it('should be float number', () => {
    expect(`${roundWindSpeed(12.12)}`).toContain('.');
  });
});
