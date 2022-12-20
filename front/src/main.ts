import { Board } from "./Board";
import { Command } from "./Command";
import { Config } from "./interfaces/Config";
import "./style.scss";

const config: Config = {
  samples: 100,
  multiplicationFactor: 2,
};

const board = new Board();
board.setConfig(config);
board.draw();

const command = new Command(config);
console.log("command: ", command);
// command.onUpdate((newConfig) => {
//   board.setConfig(newConfig);
//   board.redraw();
// });
