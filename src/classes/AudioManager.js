class AudioManager {
  constructor(game) {
    this.restaurantSong = game.sound.add("restaurant");
    this.readySound = game.sound.add("ready");
    this.blenderSound = game.sound.add("blender");
    this.orderFailureSound = game.sound.add("failure");
    this.intro = game.sound.add("intro");
    this.end = game.sound.add("end");
  }

  playIntroSong() {
    this.intro.setLoop(true);
    this.intro.play();
  }

  stopIntroSong() {
    this.intro.stop();
  }

  playRestaurantSong() {
    this.restaurantSong.setLoop(true);
    this.restaurantSong.play();
  }

  stopRestaurantSong() {
    this.restaurantSong.stop();
  }

  playReady() {
    this.readySound.play();
  }

  stopReady() {
    this.readySound.stop();
  }

  playBlender() {
    this.blenderSound.play();
  }

  stopBlender() {
    this.blenderSound.stop();
  }

  playFailure() {
    this.orderFailureSound.play();
  }

  stopFailure() {
    this.orderFailureSound.stop();
  }

  playEndSong() {
    this.end.setLoop(true);
    this.end.play();
  }

  stopEndSong() {
    this.end.stop();
  }
}

export default AudioManager;
