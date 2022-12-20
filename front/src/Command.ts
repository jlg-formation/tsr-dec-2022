import { Config } from "./interfaces/Config";
import { querySelector } from "./misc";

export class Command {
  callback: (newConfig: any) => void = () => {};
  config: Config;

  constructor(config: Config) {
    this.config = config;
    this.render();
    this.manageActions();
  }

  manageActions() {
    const configKeys: (keyof Config)[] = ["samples", "multiplicationFactor"];
    for (const key of configKeys) {
      const sliderElt = querySelector(
        `div.command label.${key} input`
      ) as HTMLInputElement;
      sliderElt.addEventListener("input", () => {
        console.log("sliderElt.value: ", sliderElt.value);
        this.config[key] = +sliderElt.value;
        this.render();
        this.callback(this.config);
      });
    }
  }

  onUpdate(callback: (newConfig: any) => void) {
    this.callback = callback;
  }

  render() {
    const configKeys: (keyof Config)[] = ["samples", "multiplicationFactor"];
    for (const key of configKeys) {
      const elt = querySelector(`div.command label.${key} span`);
      elt.innerHTML = this.config[key] + "";
      const sliderElt = querySelector(
        `div.command label.${key} input`
      ) as HTMLInputElement;
      sliderElt.value = this.config[key] + "";
    }
  }
}
