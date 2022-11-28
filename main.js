import Phaser, { Physics } from "phaser";
import Player from "./Player";

let player;
let player2;
let cursors;

function preload() {
  this.load.spritesheet('player', './assets/player.png', {frameWidth: 20, frameHeight: 29});
}

function create() {
  player = new Player(this,  300, 300, 'player');
  player2 = this.physics.add.staticGroup();
  player2.create(100, 200, 'player').refreshBody();

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player.player, player2);

}

function update() {
  player.update(cursors);
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scale: { mode: Phaser.Scale.FIT },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: { debug: true }
  },
  scene: { preload, create, update }
})
