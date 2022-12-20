import { r1, svgns } from "./constants";
import { Config } from "./interfaces/Config";
import { Point } from "./interfaces/Point";
import { computeCircleBorderPoint, getAngleFromIndex } from "./math";

export class Board {
  config: Config = {
    samples: 23,
    multiplicationFactor: 3,
  };

  draw() {
    this.drawSamples();
    this.drawLines();
  }

  drawLine(i: number, j: number) {
    const angle1 = getAngleFromIndex(i, this.config.samples);
    const p1 = computeCircleBorderPoint(angle1);
    const angle2 = getAngleFromIndex(j, this.config.samples);
    const p2 = computeCircleBorderPoint(angle2);
    this.drawLineBetweenPoints(p1, p2);
  }

  drawLineBetweenPoints(p1: Point, p2: Point) {
    const g = document.querySelector("svg g.lines");
    if (g === null) {
      throw new Error("cannot retrieve g.lines");
    }
    const line = document.createElementNS(svgns, "line");
    line.setAttributeNS(null, "x1", p1.x + "");
    line.setAttributeNS(null, "y1", p1.y + "");
    line.setAttributeNS(null, "x2", p2.x + "");
    line.setAttributeNS(null, "y2", p2.y + "");
    g.appendChild(line);
  }

  drawLines() {
    for (let i = 0; i < this.config.samples; i++) {
      const j = i * this.config.multiplicationFactor;
      this.drawLine(i, j);
    }
  }

  drawSamples() {
    const g = document.querySelector("svg g.samples");
    if (g === null) {
      throw new Error("cannot retrieve g.samples");
    }
    console.log("this.config.samples: ", this.config.samples);
    for (let i = 0; i < this.config.samples; i++) {
      const angle = getAngleFromIndex(i, this.config.samples);
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
