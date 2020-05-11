# MovieSearch

| Deadline         | Folder name | Branch name |
| ---------------- | ----------- | ----------- |
| 26.04.2020 23:59 | movie-search    | movie-search    |


**MovieSearch** - одностраничное приложение, отображающее информацию о фильмах по запросу пользователя.  
Для получения информации используется OMDb RESTful API.

## Структура приложения 
- поле поиска
- карточки с информацией о фильмах

## Макет приложения:

![screenshot](images/movie-search.png)

**Demo** https://movie-search-rss.netlify.com/


## Ключевые навыки

- использование RESTful API
- работа с асинхронными запросами
- реализация поиска

## Материалы
- [OMDb API](http://www.omdbapi.com/)
- [Yandex.Translate API](https://tech.yandex.com/translate/)
- [Swiper API](https://swiperjs.com/api/)
- [How to build a movie search app](https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/)

## Примеры использования API
- Получаем OMDb API Key    
`http://www.omdbapi.com/apikey.aspx`
- Поисковый запрос по ключевому слову "dream"  
`https://www.omdbapi.com/?s=dream&apikey=9b67fc54`
- Получаем рейтинг IMDb по imdbID из предыдущего запроса  
`https://www.omdbapi.com/?i=tt0180093&apikey=9b67fc54`
- Получаем Yandex.Translate API key  
`https://translate.yandex.com/developers/keys`
- Перевод слова "мечта"  
`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=мечта&lang=ru-en`

<details> 
  <summary>Примеры асинхронных запросов</summary>

  <p></p>

  JS-код для получения названия фильма (название выводится в консоль)

  - при помощи fetch

 ``` javascript 
  function getMovieTitle() {
  const url = 'https://www.omdbapi.com/?s=dream&apikey=9b67fc54';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.Search[0].Title)
    });
  }
``` 
  - при помощи async/await

 ``` javascript 
  async function getMovieTitle() {
    const url = 'https://www.omdbapi.com/?s=dream&apikey=9b67fc54';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.Search[0].Title);
  }
``` 

</details> 

### Документ для вопросов
- документ для вопросов, связанных с выполнением задания: [ссылка](https://docs.google.com/spreadsheets/d/1QQ4dz0sTOB-DePFiIXL8ZXoUWsZvWW3uvwnkqpUigk4/edit#gid=0)
