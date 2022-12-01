class Start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  preload() {
    this.load.image("playBtn", "./assets/playbtn.jpg");
  }

  create() {
    let startButton = this.add.image(300, 200, 'playBtn').setScale(0.2).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      console.log("pressed");
      this.scene.start("game");
    });
  }

  update() {
  }
}

export default Start;
