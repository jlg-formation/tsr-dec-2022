import { configUrl } from "./constants";
import { Config } from "./interfaces/Config";

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

export const getConfigFromBackEnd = async () => {
  const response = await fetch(configUrl);
  console.log("response: ", response);
  const json = await response.json();
  return json as Config;
};
