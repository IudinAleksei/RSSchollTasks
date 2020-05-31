import { getCurrentDate } from './date';

describe('current date test', () => {
  it('should return instance of Date', () => {
    expect(getCurrentDate(0)).toBeInstanceOf(Date);
  });

  it('should return UTC date with zero timeshift', () => {
    const utcDate = new Date(Date.now());
    expect(getCurrentDate(0)).toEqual(utcDate);
  });
});
