import { step } from "./constants";
import { Config } from "./interfaces/Config";
import { getConfigFromBackEnd, querySelector, sleep } from "./misc";

export class Command {
  callback: (newConfig: any) => void = () => {};
  #config: Config;
  set config(val: Config) {
    this.#config = val;
    this.render();
    this.callback(this.config);
  }

  get config(): Config {
    return this.#config;
  }

  #isPlaying = false;
  set isPlaying(val: boolean) {
    this.#isPlaying = val;
    this.render();
    if (this.isPlaying) {
      this.play();
    }
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  constructor(config: Config) {
    this.#config = config;
    this.render();
    this.manageActions();
  }

  manageActions() {
    const configKeys: (keyof Config)[] = ["samples", "multiplicationFactor"];
    for (const key of configKeys) {
      const sliderElt = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );
      sliderElt.addEventListener("input", () => {
        this.config = { ...this.config, [key]: +sliderElt.value };
      });
    }
    querySelector("div.command button.play").addEventListener("click", () => {
      this.isPlaying = !this.isPlaying;
    });
    querySelector("div.command button.back-end").addEventListener(
      "click",
      async () => {
        this.config = await getConfigFromBackEnd();
      }
    );
  }

  onUpdate(callback: (newConfig: any) => void) {
    this.callback = callback;
  }

  async play() {
    while (this.isPlaying) {
      await sleep(18);
      let multiplicationFactor = this.config.multiplicationFactor;
      multiplicationFactor += step;
      if (multiplicationFactor > 100) {
        multiplicationFactor = 0;
      }
      multiplicationFactor = Math.round(multiplicationFactor * 100) / 100;
      this.config = { ...this.config, multiplicationFactor };
    }
  }

  render() {
    const configKeys: (keyof Config)[] = ["samples", "multiplicationFactor"];
    for (const key of configKeys) {
      const elt = querySelector(`div.command label.${key} span`);
      elt.innerHTML = this.config[key].toFixed(2);
      const sliderElt = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );
      sliderElt.value = this.config[key] + "";
    }
    querySelector("div.command button.play").innerHTML = this.isPlaying
      ? "Stop"
      : "Play";
    const input = querySelector(
      "div.command label.multiplicationFactor input",
      HTMLInputElement
    );
    input.step = step + "";
  }
}
