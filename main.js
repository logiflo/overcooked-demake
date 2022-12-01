import Phaser, { Math } from "phaser";
// import Player from "./Player";
// import Entity from "./Entity";
// import CollisionSystem from "./src/classes/CollisionSystem";
// import InputSystem from "./src/classes/InputSystem";
// import createLevel1 from "./initialLevel";
import Game from "./src/scenes/gameScene";
import Start from "./src/scenes/startScene";

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
  scene: [ Start, Game ],
});
