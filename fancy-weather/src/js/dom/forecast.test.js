import { getWeekday } from './forecast';

describe('checking weekdays', () => {
  it('should return english', () => {
    expect(getWeekday(1, 'en')).toMatch(/[A-z]+/);
  });

  it('should return russian', () => {
    expect(getWeekday(3, 'ru')).toMatch(/[А-яЁё]+/);
  });
});
