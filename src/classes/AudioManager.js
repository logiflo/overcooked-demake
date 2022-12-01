class AudioManager {
  constructor(game) {
    this.restaurantSong = game.sound.add("restaurant");
    this.readySound = game.sound.add("ready");
    this.blenderSound = game.sound.add("blender");
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
}

export default AudioManager;
