import { Config } from "./interfaces/Config";
import { querySelector } from "./misc";

export class Command {
  config: Config;
  constructor(config: Config) {
    this.config = config;
    this.render();
  }
  render() {
    const samplesElt = querySelector("div.command label.samples span");
    samplesElt.innerHTML = this.config.samples + "";
    const multiplicationFactorElt = querySelector(
      "div.command label.multiplicationFactor span"
    );
    multiplicationFactorElt.innerHTML = this.config.multiplicationFactor + "";
  }
}
