import './sass/main.scss';

const imageHandler = () => {
  document.querySelector('.card-container__card').addEventListener('click', (e) => {
    console.log('click');
  });
};

window.onload = () => {
  console.log('hello');
  imageHandler();
};
