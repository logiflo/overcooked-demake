import AudioManager from "../classes/AudioManager";

class Start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  loadFont(name, url) {
    const newFont = new FontFace(name, `url(${url})`);
    newFont
      .load()
      .then(function (loaded) {
        document.fonts.add(loaded);
      })
      .catch(function (error) {
        return error;
      });
  }

  preload() {
    this.load.image("backgroundStart", "./assets/backgroundEnd.png");
    this.load.image("logo", "./assets/overcooked-logo.webp");
    this.load.image("playBtn", "./assets/startbtn.png");
    this.load.image("demake", "./assets/demake.png")

    this.load.image("background", "./assets/sand2.png");
    this.load.image("buttons", "./assets/help.png");
    this.load.multiatlas("textures", "./assets/textures.json", "./assets/");
    this.load.image("tick", "./assets/tick.png");
    this.load.image("coin", "./assets/coin.png");

    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 20,
      frameHeight: 29,
    });

    this.load.image("restartbtn", "./assets/restartbtn.png");

    this.load.audio("intro", "./assets/intro.ogg");
    this.load.audio("restaurant", "./assets/restaurant.ogg");
    this.load.audio("blender", "./assets/blender_sfx.ogg");
    this.load.audio("ready", "./assets/ready_sfx.ogg");
    this.load.audio("failure", "./assets/buzzer.ogg");
    this.load.audio("end", "./assets/map.ogg");

    this.loadFont("OpenSansPXBold", "./assets/OpenSansPXBold.ttf");
  }

  create() {
    this.add.image(300, 170, "backgroundStart").setScale(0.8);
    this.add.image(320, 180, "logo");
    this.add.image(520, 210, "demake").setScale(0.4);

    this.add
      .image(320, 300, "playBtn")
      .setScale(0.1)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.audioManager.stopIntroSong();
        this.scene.start("game");
      });

    this.audioManager = new AudioManager(this);
    this.audioManager.playIntroSong();
  }
}

export default Start;
