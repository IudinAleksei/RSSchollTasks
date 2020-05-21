function promisify(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(results, err) { // наш специальный колбэк для f
        if (err) {
          return reject(err);
        }
        // делаем resolve для всех results колбэка, если задано manyArgs
        resolve(results);
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}
/*
// использование:
f = promisify(f, true); */


export const getGeolocation = async () => {
  const f1 = navigator.geolocation.getCurrentPosition;
  const fp = await promisify(f1);

  return fp;
};

export const getUserLocation = async () => {};
