export const querySelector = (cssSelector: string): Element => {
  const elt = document.querySelector(cssSelector);
  if (elt === null) {
    throw new Error(`Cannot retrieve ${cssSelector}`);
  }
  return elt;
};
