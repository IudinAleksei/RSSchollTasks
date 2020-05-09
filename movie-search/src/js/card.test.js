import { createLinkToVideoGallery } from './card';

test('should return link to videogallery', () => {
  expect(createLinkToVideoGallery('tt123456')).toBe('https://www.imdb.com/title/tt123456/videogallery/');
});
