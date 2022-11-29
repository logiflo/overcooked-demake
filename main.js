import Phaser, { Math } from "phaser";
import Player from "./Player";
// import Entity from "./Entity";
import CollisionSystem from "./CollisionSystem";
import InputSystem from "./InputSystem";
import createLevel1 from "./initialLevel";

/** @type {Player} */
let player;

/** @type {CollisionSystem} */
let collisionSystem;

/** @type {InputSystem} */
let inputSystem;

function preload() {
  this.load.image("background", "./assets/sand2.png");
  this.load.multiatlas(
    "textures",
    "./assets/textures.json",
    "./assets/"
  );
  this.load.spritesheet("player", "./assets/player.png", {
    frameWidth: 20,
    frameHeight: 29,
  });
}

function create() {
  this.add.image(0, 0, "background").setScale(4);

  inputSystem = new InputSystem(this.input, "Z", "X");

  player = new Player(this.physics, inputSystem, 300, 300, "player");

  collisionSystem = new CollisionSystem(this.physics, player);
  createLevel1(this, collisionSystem);
}
function update() {
  player.update();
  collisionSystem.update();
}

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
  scene: { preload, create, update },
});
