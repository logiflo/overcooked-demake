import AudioManager from "../classes/AudioManager";


class End extends Phaser.Scene {
  constructor() {
    super("end");
  }

  init(data) {
    this.points = data.points;
  }

  // preload() {
  //   this.load.image("restartbtn", "./assets/restartbtn.png");
  // }

  create() {
    this.add.image(300, 150, "backgroundStart");
    this.add.image(150, 150, "textures", "character_0").setScale(4);

    this.add.text(300, 100, "Your Score", { fontFamily: "OpenSansPXBold", fontSize: 32 });
    this.add.text(300, 120, this.points, { fontFamily: "OpenSansPXBold", fontSize: 32 });

    let startButton = this.add
      .image(375, 200, "restartbtn")
      .setScale(0.2)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.audioManager.stopEndSong();
        this.scene.start("game");
      });

    this.audioManager = new AudioManager(this);
    this.audioManager.playEndSong();
  }
}

export default End;
