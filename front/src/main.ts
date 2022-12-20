import { r1, samples, svgns } from "./constants";
import { computeCircleBorderPoint, getAngleFromIndex } from "./math";
import "./style.scss";

const g = document.querySelector("svg g.samples");
if (g === null) {
  throw new Error("cannot retrieve g.samples");
}
for (let i = 0; i < samples; i++) {
  const angle = getAngleFromIndex(i);
  const { x, y } = computeCircleBorderPoint(angle);
  const circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "cx", x + "");
  circle.setAttributeNS(null, "cy", y + "");
  circle.setAttributeNS(null, "r", r1 + "");
  g.appendChild(circle);
}
