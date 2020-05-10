const pageElement = {
  inputArea: 'search__input',
  keyboard: 'keyboard',
  hideKeyboard: 'keyboard_hidden',
  keyboardLine: 'keyboard__line',
};

const BUTTONS_ARRAY = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'language', 'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
];

const [SPECIAL_BUTTONS, BUTTONS_WITH_ICON] = [
  [
    'vertical_align_top', 'language', 'Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
  ],
  [
    'Backspace', 'Tab', 'CapsLock', 'Enter', 'vertical_align_top', 'language', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
  ],
];

const [ENGLISH_SIMBOLS, ENGLISH_SHIFTED_SIMBOLS, RUSSIAN_SIMBOLS, RUSSIAN_SHIFTED_SIMBOLS] = [
  [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'keyboard_backspace',
    'keyboard_tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
    'keyboard_capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'keyboard_return',
    'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'keyboard_arrow_up', 'shift',
    'language', 'ctrl', 'alt', 'space_bar', 'alt', 'keyboard_arrow_left', 'keyboard_arrow_down', 'keyboard_arrow_right', 'ctrl',
  ],
  [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'keyboard_backspace',
    'keyboard_tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'del',
    'keyboard_capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'keyboard_return',
    'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'keyboard_arrow_up', 'shift',
    'language', 'ctrl', 'alt', 'space_bar', 'alt', 'keyboard_arrow_left', 'keyboard_arrow_down', 'keyboard_arrow_right', 'ctrl',

  ],
  [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'keyboard_backspace',
    'keyboard_tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'del',
    'keyboard_capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'keyboard_return',
    'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'keyboard_arrow_up', 'shift',
    'language', 'ctrl', 'alt', 'space_bar', 'alt', 'keyboard_arrow_left', 'keyboard_arrow_down', 'keyboard_arrow_right', 'ctrl',
  ],

  [
    'ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'keyboard_backspace',
    'keyboard_tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'del',
    'keyboard_capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'keyboard_return',
    'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', 'keyboard_arrow_up', 'shift',
    'language', 'ctrl', 'alt', 'space_bar', 'alt', 'keyboard_arrow_left', 'keyboard_arrow_down', 'keyboard_arrow_right', 'ctrl',
  ],


];

let shiftEnable = false;
class Key {
  constructor(code, width = 'std', icon = false) {
    this.code = code;
    this.width = width;
    this.icon = icon;
  }

  createKey() {
    const key = document.createElement('div');
    key.classList.add('keyboard__line__key');
    if (this.width === 'wide') {
      key.classList.add('keyboard__line__key_wide');
    } else if (this.width === 'ultra-wide') {
      key.classList.add('keyboard__line__key_ultrawide');
    }
    if (this.icon) {
      key.classList.add('material');
    }
    key.id = this.code;
    return key;
  }
}

const setUpperCase = () => {
  const letter = document.querySelectorAll('.letter-button');

  letter.forEach((item) => {
    item.classList.add('letter-button_uppercase');
  });
};

const setLowerCase = () => {
  const letter = document.querySelectorAll('.letter-button');

  letter.forEach((item) => {
    item.classList.remove('letter-button_uppercase');
  });
};

const setCurCase = () => {
  const caps = document.getElementById('CapsLock');

  if (window.localStorage.getItem('caps') === 'on') {
    setUpperCase();
    caps.classList.add('keyboard__line__key_illuminated');
  } else {
    setLowerCase();
    caps.classList.remove('keyboard__line__key_illuminated');
  }
};


const toggleCase = () => {
  const letter = document.querySelectorAll('.letter-button');

  letter.forEach((item) => {
    item.classList.toggle('letter-button_uppercase');
  });
};

const generateKeyboard = () => {
  const keyboardArea = document.createElement('div');
  keyboardArea.classList.add(pageElement.keyboard, pageElement.hideKeyboard);
  document.body.append(keyboardArea);
};

const generateKeyLine = () => {
  for (let i = 0; i < 5; i += 1) {
    const line = document.createElement('div');
    line.classList.add(pageElement.keyboardLine);
    document.querySelector(`.${pageElement.keyboard}`).append(line);
  }
};

const generateKeys = () => {
  const lineArray = document.querySelectorAll(`.${pageElement.keyboardLine}`);
  let lineIndex = 0;

  BUTTONS_ARRAY.forEach((item) => {
    let width = 'std';
    let icon = false;
    if (item === 'Backspace' || item === 'ShiftLeft' || item === 'ShiftRight' || item === 'Enter' || item === 'CapsLock') {
      width = 'wide';
    } else if (item === 'Space') {
      width = 'ultra-wide';
    }
    if (BUTTONS_WITH_ICON.includes(item)) {
      icon = true;
    }
    const key = new Key(item, width, icon);

    lineArray[lineIndex].appendChild(key.createKey());
    if (item === 'Backspace' || item === 'Delete' || item === 'Enter' || item === 'ShiftRight') {
      lineIndex += 1;
    }
  });
  setCurCase();
};

const createKeysSimbols = (shifted = false) => {
  const enBtns = (shifted) ? ENGLISH_SHIFTED_SIMBOLS : ENGLISH_SIMBOLS;
  const ruBtns = (shifted) ? RUSSIAN_SHIFTED_SIMBOLS : RUSSIAN_SIMBOLS;
  const curBtns = (window.localStorage.getItem('lang') === 'en') ? enBtns : ruBtns;
  const buttons = document.querySelectorAll('.keyboard__line__key');

  buttons.forEach((item, index) => {
    const key = item;
    key.innerText = curBtns[index];
    if (/^[A-zА-яё]{1}$/.test(curBtns[index])) {
      item.classList.add('letter-button');
    }
  });
};

const setStartLangAndTabValue = () => {
  if (window.localStorage.getItem('lang') === null) {
    window.localStorage.setItem('lang', 'en');
  }

  if (window.localStorage.getItem('caps') === null) {
    window.localStorage.setItem('caps', 'off');
  }
};

const keyCombinationHandler = () => {
  document.addEventListener('keydown', (e) => {
    if (e.isTrusted === true) {
      return;
    }
    if ((e.ctrlKey && e.altKey && !e.repeat) || e.code === 'language') {
      const temp = (window.localStorage.getItem('lang') === 'en') ? 'ru' : 'en';
      window.localStorage.setItem('lang', temp);
      createKeysSimbols(shiftEnable);
    } else if (e.code === 'CapsLock') {
      const temp = (window.localStorage.getItem('caps') === 'off') ? 'on' : 'off';
      window.localStorage.setItem('caps', temp);
      setCurCase();
    }
  });
};

const getNextCaretIndex = (input, start) => {
  let result = input.value.indexOf('\n', start + 1);
  result = (result !== -1) ? result : input.value.length;
  return result;
};

const getPrevCaretIndex = (input, start) => {
  const result = input.value.lastIndexOf('\n', start - 1);
  return result;
};

const cursorControl = (shift) => {
  const input = document.querySelector(`.${pageElement.inputArea}`);
  const temp = input.selectionStart;

  input.selectionEnd = temp + shift;
  input.selectionStart = input.selectionEnd;
};

const addSimbolToTextarea = (simbol) => {
  const input = document.querySelector(`.${pageElement.inputArea}`);

  input.setRangeText(simbol, input.selectionStart, input.selectionEnd, 'end');
};

const deleteSimbol = (pos) => {
  const input = document.querySelector(`.${pageElement.inputArea}`);

  if (input.selectionStart && input.selectionStart === input.selectionEnd) {
    input.setRangeText('', input.selectionStart - 1 + pos, input.selectionEnd + pos, 'end');
  } else {
    input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
  }
};

const keyPressHandler = () => {
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.isTrusted === true) {
      return;
    }
    if (BUTTONS_ARRAY.includes(e.code)) {
      const virtualKey = document.querySelector(`#${e.code}`);
      virtualKey.classList.add('keyboard__line__key_activated');
      const input = document.querySelector(`.${pageElement.inputArea}`);
      input.focus();

      e.preventDefault();
      if (e.code === 'ArrowLeft') {
        cursorControl(-1);
      } else if (e.code === 'ArrowRight') {
        cursorControl(1);
      } else if (e.code === 'ArrowUp') {
        const endOfPrevStr = getPrevCaretIndex(input, input.selectionStart);
        const startOfPrevStr = getPrevCaretIndex(input, endOfPrevStr);
        const posInCurStr = input.selectionStart - endOfPrevStr;
        const lengthPrevStr = endOfPrevStr - startOfPrevStr;
        const posInPrevStr = (posInCurStr <= lengthPrevStr) ? posInCurStr : lengthPrevStr;
        const absPosInPrevStr = posInPrevStr + startOfPrevStr;
        input.selectionEnd = (absPosInPrevStr > 0) ? absPosInPrevStr : 0;
        input.selectionStart = input.selectionEnd;
      } else if (e.code === 'ArrowDown') {
        const endOfPrevStr = getPrevCaretIndex(input, input.selectionStart);
        const startOfNextStr = getNextCaretIndex(input, input.selectionStart - 1);
        const endOfNextStr = getNextCaretIndex(input, startOfNextStr);
        const posInCurStr = input.selectionStart - endOfPrevStr;
        const lengthNextStr = endOfNextStr - startOfNextStr;
        const posInNextStr = (posInCurStr <= lengthNextStr) ? posInCurStr : lengthNextStr;
        const absPosInNextStr = posInNextStr + startOfNextStr;
        input.selectionEnd = (absPosInNextStr >= 0) ? absPosInNextStr : 0;
        input.selectionStart = input.selectionEnd;
      }
      if (e.code === 'Backspace') {
        deleteSimbol(0);
      } else if (e.code === 'Delete') {
        deleteSimbol(1);
      } else if (e.code === 'Tab') {
        addSimbolToTextarea('\t');
      } else if (e.code === 'Space') {
        addSimbolToTextarea(' ');
      }

      if (!SPECIAL_BUTTONS.includes(e.code)) {
        addSimbolToTextarea(virtualKey.innerText);
      }
      if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !e.repeat) {
        shiftEnable = !shiftEnable;
        createKeysSimbols(shiftEnable);
        toggleCase();
      }
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' || e.isTrusted === true) {
      return;
    }
    if (BUTTONS_ARRAY.includes(e.code)) {
      e.preventDefault();
      document.querySelector(`#${e.code}`).classList.remove('keyboard__line__key_activated');
      if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !e.repeat) {
        setCurCase();
        shiftEnable = !shiftEnable;
        createKeysSimbols(shiftEnable);
      }
    }
  });
};

const emulateKeyDown = (keyCode) => {
  const event = new KeyboardEvent('keydown', {
    bubbles: true,
    code: keyCode,
  });
  document.dispatchEvent(event);
};

const emulateKeyUp = (keyCode) => {
  const event = new KeyboardEvent('keyup', {
    bubbles: true,
    code: keyCode,
  });
  document.dispatchEvent(event);
};

const virtualKeyHandler = () => {
  document.querySelector(`.${pageElement.keyboard}`).addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('keyboard__line__key')) {
      e.target.classList.add('keyboard__line__key_activated');
      emulateKeyDown(e.target.id);
    }
  });
  document.addEventListener('mouseup', (e) => {
    if (document.querySelector('.keyboard__line__key_activated') != null) {
      document.querySelector('.keyboard__line__key_activated').classList.remove('keyboard__line__key_activated');
      emulateKeyUp(e.target.id);
    }
  });
};

export const activateKeyboard = () => {
  setStartLangAndTabValue();
  generateKeyboard();
  generateKeyLine();
  generateKeys();
  createKeysSimbols();
  keyCombinationHandler();
  keyPressHandler();
  virtualKeyHandler();
};

export const toggleKeyboardVisibility = () => {
  const keyboard = document.querySelector(`.${pageElement.keyboard}`);
  keyboard.classList.toggle(pageElement.hideKeyboard);
};

window.onblur = () => {
  const activeKeys = document.querySelectorAll('.keyboard__line__key_activated');
  activeKeys.forEach((item) => {
    item.classList.remove('keyboard__line__key_activated');
  });
};
