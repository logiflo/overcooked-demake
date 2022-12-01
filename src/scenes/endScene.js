import AudioManager from "../classes/AudioManager";

class End extends Phaser.Scene {
  constructor() {
    super("end");
  }

  init(data) {
    this.points = data.points;

  }

  preload() {
    console.log(this.points);
    this.load.image("playBtn", "./assets/playbtn.jpg");
  }

  create() {
    this.audioManager = new AudioManager(this);
    this.audioManager.playRestaurantSong();

    this.add.text(250, 100, "Your Score");
    this.add.text(250, 120, this.points);

    let startButton = this.add.image(300, 200, 'playBtn').setScale(0.2).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      console.log("pressed");
      this.scene.start("game");
    });
  }

  update() {
  }
}

export default End;
