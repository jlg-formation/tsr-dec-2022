import { Board } from "./Board";
import "./style.scss";

const board = new Board();
board.setConfig({
  samples: 100,
  multiplicationFactor: 2,
});
board.draw();
