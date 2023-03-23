export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => {
  if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));
  else return null;
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
