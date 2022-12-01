import Phaser, { Math } from "phaser";
import Player from "../classes/Player";
import CollisionSystem from "../classes/CollisionSystem";
import InputSystem from "../classes/InputSystem";
import createLevel1 from "../levels/initialLevel";
import Orders from "../classes/Orders";
import AudioManager from "../classes/AudioManager";

class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image("background", "./assets/sand2.png");
    this.load.image("buttons", "./assets/help.png");
    this.load.multiatlas("textures", "./assets/textures.json", "./assets/");
    this.load.multiatlas("textures2", "./assets/textures2.json", "./assets/");
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 20,
      frameHeight: 29,
    });

    this.load.audio("restaurant", "./assets/restaurant.ogg");
    this.load.audio("blender", "./assets/blender_sfx.ogg");
    this.load.audio("ready", "./assets/ready_sfx.ogg");
  }

  create() {
    this.add.image(0, 0, "background").setScale(4);
    this.add.image(550, 150, "buttons").setScale(1);

    /** @type {AudioManager} */
    this.audioManager = new AudioManager(this);

    /** @type {InputSystem} */
    this.inputSystem = new InputSystem(this.input, "Z", "X");

    /** @type {Player} */
    this.player = new Player(this.physics, this.inputSystem, 300, 200, "textures", "character_0");

    /** @type {CollisionSystem} */
    this.collisionSystem = new CollisionSystem(this.physics, this.player, this.audioManager);

    createLevel1(this, this.collisionSystem, this.audioManager);

    this.orders = new Orders(this);

    this.audioManager.playRestaurantSong();

    // this.time.events.repeat(Phaser.Timer.SECOND * 2, 10, orders.get_random, this);
  }

  update() {
    this.player.update();
    this.orders.update();
    this.collisionSystem.update(this.physics, this.orders);
  }
}

export default Game;
