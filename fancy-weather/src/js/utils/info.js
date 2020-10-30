// временный файл для работы информации для проверяющих, будет удален после кроссчека
const INFO_ELEMENT = {
  infoBtn: 'info-button',
  closeBtn: 'close-button',
  info: 'crosscheck-info',
  hideInfo: 'crosscheck-info_hidden',

};

const hideInfo = (hide = true) => {
  const info = document.querySelector(`.${INFO_ELEMENT.info}`);
  if (hide) {
    info.classList.add(INFO_ELEMENT.hideInfo);
    return;
  }
  info.classList.remove(INFO_ELEMENT.hideInfo);
};

const infoClickHandler = () => {
  const infoBtn = document.querySelector(`.${INFO_ELEMENT.infoBtn}`);
  const closeBtn = document.querySelector(`.${INFO_ELEMENT.closeBtn}`);

  infoBtn.onclick = () => hideInfo(false);
  closeBtn.onclick = () => hideInfo(true);
};

export default infoClickHandler;
