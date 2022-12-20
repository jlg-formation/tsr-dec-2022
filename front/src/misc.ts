export const querySelector = (cssSelector: string): Element => {
  const elt = document.querySelector(cssSelector);
  if (elt === null) {
    throw new Error(`Cannot retrieve ${cssSelector}`);
  }
  return elt;
};

export const sleep = (delayMs: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });
};
