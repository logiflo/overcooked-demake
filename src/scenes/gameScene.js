import Phaser from "phaser";
import Player from "../classes/Player";
import CollisionSystem from "../classes/CollisionSystem";
import InputSystem from "../classes/InputSystem";
import createLevel1 from "../levels/initialLevel";
import Orders from "../classes/Orders";
import AudioManager from "../classes/AudioManager";
import Score from "../classes/Score";

class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    this.add.image(300, 200, "background").setScale(2);
    this.add.image(550, 150, "buttons").setScale(1);
    this.add.sprite(40, 320, "coin").setScale(0.05).setFlipX(true);


    /** @type {AudioManager} */
    this.audioManager = new AudioManager(this);
    this.audioManager.playRestaurantSong();

    /** @type {InputSystem} */
    this.inputSystem = new InputSystem(this.input, "Z", "X");

    /** @type {Player} */
    this.player = new Player(this.physics, this.inputSystem, 300, 200, "textures", "character_0");

    /** @type {CollisionSystem} */
    this.collisionSystem = new CollisionSystem(this.physics, this.player, this.audioManager);

    createLevel1(this, this.collisionSystem, this.audioManager);

    this.score = new Score(this);

    /** @type {Orders} */
    this.orders = new Orders(this, this.audioManager, this.score);

  }

  update() {
    this.player.update();
    this.orders.update(this.scene);
    this.collisionSystem.update(this.physics, this.orders);
  }
}

export default Game;
