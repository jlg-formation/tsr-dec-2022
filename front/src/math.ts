import { c0, r0 } from "./constants";
import { Point } from "./interfaces/Point";

export const getAngleFromIndex = (i: number, samples: number) =>
  (i * 2 * Math.PI) / samples;
export const computeCircleBorderPoint = (angle: number): Point => {
  return {
    x: c0.x + r0 * Math.cos(angle),
    y: c0.y + r0 * Math.sin(angle),
  };
};
