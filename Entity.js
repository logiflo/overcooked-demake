class Entity {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  sprite = null;

  /** @type {string} */
  name = "";

  /**
   *
   * @param {Phaser.Physics.Arcade.ArcadePhysics} physics
   * @param {number} x
   * @param {number} y
   * @param {string} spriteName
   * @param {string} frame
   */
  constructor(physics, x, y, spriteName, frame) {
    this.sprite = physics.add.sprite(x, y, spriteName, frame).setImmovable(true);
    this.sprite.setScale(2);
  }
}

export default Entity;
