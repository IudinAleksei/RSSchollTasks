const PARAMS = {
  language: 'weatherLang',
  tempUnits: 'weatherUnits',
};

const DEFAULT_PARAMS = {
  [PARAMS.language]: 'en',
  [PARAMS.tempUnits]: 'celcius',
};

export const hasSavedParams = () => {
  const paramsArray = Object.values(PARAMS);
  const result = paramsArray.every((param) => !!window.localStorage.getItem(param));
  return result;
};

export const setDefaultParams = () => {
  const defaultArray = Object.entries(DEFAULT_PARAMS);
  defaultArray.forEach((defParam) => {
    window.localStorage.setItem(...defParam);
  });
};

export const setParams = (lang = false, units = false) => {
  if (lang) {
    window.localStorage.setItem([PARAMS.language], lang);
  }
  if (units) {
    window.localStorage.setItem([PARAMS.tempUnits], units);
  }
  return !!lang || !!units;
};

export const getParams = () => {
  const paramsArray = Object.values(PARAMS);
  const result = paramsArray.map((param) => window.localStorage.getItem(param));
  return result;
};
