import { r1, svgns } from "./constants";
import { Config } from "./interfaces/Config";
import { computeCircleBorderPoint, getAngleFromIndex } from "./math";

export class Board {
  config: Config = {
    samples: 23,
    multiplicationFactor: 3,
  };

  draw() {
    const g = document.querySelector("svg g.samples");
    if (g === null) {
      throw new Error("cannot retrieve g.samples");
    }
    for (let i = 0; i < this.config.samples; i++) {
      const angle = getAngleFromIndex(i);
      const { x, y } = computeCircleBorderPoint(angle);
      const circle = document.createElementNS(svgns, "circle");
      circle.setAttributeNS(null, "cx", x + "");
      circle.setAttributeNS(null, "cy", y + "");
      circle.setAttributeNS(null, "r", r1 + "");
      g.appendChild(circle);
    }
  }

  setConfig(config: Config) {
    this.config = config;
  }
}
