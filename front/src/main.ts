import { Board } from "./Board";
import { Command } from "./Command";
import { Config } from "./interfaces/Config";
import "./style.scss";

const config: Config = {
  samples: 47,
  multiplicationFactor: 4,
};

const board = new Board();
board.setConfig(config);
board.draw();

const command = new Command(config);

command.onUpdate((newConfig) => {
  board.setConfig(newConfig);
  board.redraw();
});
