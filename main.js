import Phaser, { Math } from "phaser";
import Game from "./src/scenes/gameScene";
import Start from "./src/scenes/startScene";
import End from "./src/scenes/endScene";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scale: { mode: Phaser.Scale.FIT },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
  scene: [ Start, Game, End ],
});
