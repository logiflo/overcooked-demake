import { TypeEntity } from "./Globals";

class Entity {
  /**
   *
   * @param {Phaser.Physics.Arcade.ArcadePhysics} physics
   * @param {number} x
   * @param {number} y
   * @param {string} spriteName
   * @param {string} frame
   */
  constructor(physics, x, y, spriteName, frame, type, isImmovable = true) {
    /** @type {Phaser.Physics.Arcade.Sprite} */
    this.sprite = physics.add
      .image(x, y, spriteName, frame)
      .setImmovable(isImmovable)
      .setScale(2)
      .setName(frame);

    /** @type {TypeEntity} */
    this.type = type;
  }

  update() {}
}

export default Entity;
