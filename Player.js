import Entity from "./Entity";
import InputSystem from "./InputSystem";

class Player {
  /** @type {InputSystem} */
  inputSystem = null

  /** @type {Phaser.Physics.Arcade.Sprite} */
  sprite = null;

  /** @type {number} */
  distanceCheck = 0;

  /** @type {number} */
  velocity = 150;

  handObject = null;

  /**
   *
   * @param {Phaser.Physics.Arcade.ArcadePhysics} physics
   * @param {InputSystem} inputSystem
   * @param {number} x
   * @param {number} y
   * @param {string} spriteName
   */
  constructor(physics, inputSystem, x, y, spriteName) {
    this.inputSystem = inputSystem;

    this.sprite = physics.add.sprite(x, y, spriteName);
    this.sprite.setScale(2);
    this.sprite.setCollideWorldBounds(true);

    this.distanceCheck = (this.sprite.width + this.sprite.height / 2) * 2;
  }

  update () {
    if (this.inputSystem.cursors.left.isDown) {
      this.sprite.setVelocityX(-this.velocity);
      this.sprite.flipX = true;
    } else if (this.inputSystem.cursors.right.isDown) {
      this.sprite.flipX = false;
      this.sprite.setVelocityX(this.velocity);
    } else {
      this.sprite.setVelocityX(0);
    }

    if (this.inputSystem.cursors.up.isDown) {
      this.sprite.setVelocityY(-this.velocity);
    } else if (this.inputSystem.cursors.down.isDown) {
      this.sprite.setVelocityY(this.velocity);
    } else {
      this.sprite.setVelocityY(0);
    }
  }


  getObject(obj) {
    if (!this.handObject) this.handObject = obj;
  }

  dropObject() {
    if (this.handObject) this.handObject = null;
  }

  /**
   * Process the collision with the entity.
   *
   * @param {Entity} entity
   */
  onCollision (entity) {
    if (this.inputSystem.isOkPressed()) {
      if (!this.handObject) this.getObject(entity.sprite.name)
      console.log(this.handObject);
    }

    if (this.inputSystem.isCancelPressed()) {
      if (this.handObject) this.dropObject();
      console.log(this.handObject);
    }
  }
}

export default Player;
