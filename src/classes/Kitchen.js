import AudioManager from "./AudioManager";
import Entity from "./Entity";
import { BarColors, TypeEntity, State, Smoothie } from "./Globals";

class Kitchen extends Entity {
  constructor(game, x, y, spriteName, frame, type, isImmovable, audioManager) {
    super(game.physics, x, y, spriteName, frame, type, isImmovable);

    this.state = State.Empty;
    this.prepareTime = 300;
    this.fruit = "";
    this.cnt = 0;
    this.rangeMov = 0;
    this.shakeDir = 1;

    this.blender = new Entity(
      game.physics,
      this.sprite.x,
      this.sprite.y - 15,
      "textures2",
      "items_2",
      TypeEntity.Blender
    );

    this.bar = game.add.rectangle(this.sprite.x - 22, this.sprite.y + 11, 44, 6, BarColors.Green);
    this.bar.setOrigin(0,0);
    this.bar.scaleX = 0;

    /** @type {AudioManager} */
    this.audioManager = audioManager;
  }

  update() {
    if (this.state !== State.Busy) return;

    this.cnt++;

    this.bar.scaleX = (this.prepareTime - this.cnt) / this.prepareTime;

    if (this.cnt % 5) {
      this.rangeMov += 1 * this.shakeDir;
      if (this.rangeMov === 3 * this.shakeDir) {
        this.shakeDir *= -1;
      }

      this.blender.sprite.x += this.shakeDir;
    }

    if (this.cnt >= this.prepareTime) {
      this.state = State.Ready;
      this.bar.scaleX = 0;
      this.bar.setFillStyle(BarColors.Green);
      this.audioManager.stopBlender();
      this.audioManager.playReady();
      this.cnt = 0;
    }
  }

  prepareMeal(fruit) {
    if (this.state !== State.Empty) return false;
    if (!fruit.includes("fruits")) return false;

    this.state = State.Busy;
    this.fruit = fruit;
    this.bar.scaleX = 1;
    this.audioManager.playBlender();

    return true;
  }

  returnMeal() {
    if (this.state !== State.Ready) return "";

    this.state = State.Empty;
    return Smoothie[this.fruit];
  }
}

export default Kitchen;
