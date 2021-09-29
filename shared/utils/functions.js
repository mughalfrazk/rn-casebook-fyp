export const capitalize = (s) => {
  if (s) return s[0].toUpperCase() + s.slice(1);
  return s;
};

export const isObjEmpty = (object) => {
  for (let key in object) {
    if (object[key] === "" || object[key] === null || object[key] === 0)
      return false;
  }
  return true;
};