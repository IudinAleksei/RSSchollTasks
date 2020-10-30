import getKeywords from './keywords';

describe('daytime and season keywords test', () => {
  const latitude = 55.755814;
  const timeshift = 10800;
  const SEASONS = ['winter', 'spring', 'summer', 'autumn'];
  const DAYTIME = ['night', 'morning', 'day', 'evening'];
  const array = getKeywords(timeshift, latitude).split(', ');
  const season = array[1];
  const daytime = array[0];

  it('should return one of season', () => {
    expect(SEASONS).toContain(season);
  });

  it('should return one of daytime', () => {
    expect(DAYTIME).toContain(daytime);
  });
});
