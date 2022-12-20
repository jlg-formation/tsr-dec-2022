import { step } from "./constants";
import { Config } from "./interfaces/Config";
import { getConfigFromBackEnd, querySelector, sleep } from "./misc";

export class Command {
  callback: (newConfig: any) => void = () => {};
  config: Config;
  isPlaying = false;

  constructor(config: Config) {
    this.config = config;
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
        this.config[key] = +sliderElt.value;
        this.render();
        this.callback(this.config);
      });
    }
    querySelector("div.command button.play").addEventListener("click", () => {
      console.log("click");
      this.isPlaying = !this.isPlaying;
      this.render();
      if (this.isPlaying) {
        this.play();
      }
    });
    querySelector("div.command button.back-end").addEventListener(
      "click",
      async () => {
        console.log("click back-end");
        this.config = await getConfigFromBackEnd();
        this.render();
        this.callback(this.config);
      }
    );
  }

  onUpdate(callback: (newConfig: any) => void) {
    this.callback = callback;
  }

  async play() {
    while (this.isPlaying) {
      await sleep(18);
      this.config.multiplicationFactor += step;
      if (this.config.multiplicationFactor > 100) {
        this.config.multiplicationFactor = 0;
      }
      this.config.multiplicationFactor =
        Math.round(this.config.multiplicationFactor * 100) / 100;
      this.render();
      this.callback(this.config);
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
