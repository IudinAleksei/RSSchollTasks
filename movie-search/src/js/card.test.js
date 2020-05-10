import { createLinkToVideoGallery, createLinkToPhotoGallery, createLinkToCast } from './card';

test('should return link to videogallery', () => {
  expect(createLinkToVideoGallery('tt1104001')).toBe('https://www.imdb.com/title/tt1104001/videogallery/');
});

test('should return link to photogallery', () => {
  expect(createLinkToPhotoGallery('tt1104001')).toBe('https://www.imdb.com/title/tt1104001/mediaindex/');
});

test('should return link to cast', () => {
  expect(createLinkToCast('tt1104001')).toBe('https://www.imdb.com/title/tt1104001/fullcredits/');
});
