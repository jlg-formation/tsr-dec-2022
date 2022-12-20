import { Board } from "./Board";
import { Command } from "./Command";
import { Config } from "./interfaces/Config";
import "./style.scss";

const config: Config = {
  samples: 45,
  multiplicationFactor: 2,
};

const board = new Board();
board.setConfig(config);
board.draw();

const command = new Command(config);

command.onUpdate((newConfig) => {
  board.setConfig(newConfig);
  board.redraw();
});
