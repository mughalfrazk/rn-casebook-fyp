export const capitalize = (s) => {
  if (s) return s[0].toUpperCase() + s.slice(1);
  return s;
};
