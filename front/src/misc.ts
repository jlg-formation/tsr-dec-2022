import { configUrl } from "./constants";
import { Config } from "./interfaces/Config";

import typia from "typia";

export const querySelector = <T extends Element>(
  cssSelector: string,
  type?: new () => T
): T => {
  const elt = document.querySelector(cssSelector);
  if (elt === null) {
    throw new Error(`Cannot retrieve ${cssSelector}`);
  }
  if (type && !(elt instanceof type)) {
    throw new Error("Element exist but is not of type " + type);
  }
  return elt as T;
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
  typia.assert<Config>(json);
  return json as Config;
};
