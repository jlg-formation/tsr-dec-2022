import { Config } from "./interfaces/Config";
import { querySelector } from "./misc";

export class Command {
  config: Config;

  constructor(config: Config) {
    this.config = config;
    this.render();
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
