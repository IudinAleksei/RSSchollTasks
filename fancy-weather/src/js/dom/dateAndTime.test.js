import { getMonthAndWeekdayName } from './dateAndTime';

describe('checking weekdays', () => {
  const day = 0;
  const date = 31;
  const month = 4;
  const numericDateArray = [day, date, month];

  it('should return month in english', () => {
    expect(getMonthAndWeekdayName(numericDateArray, 'en')).toContain('Sun');
  });

  it('should return day in russian', () => {
    expect(getMonthAndWeekdayName(numericDateArray, 'ru')).toContain('Май');
  });
});
