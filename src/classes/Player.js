import Entity from "./Entity";
import InputSystem from "./InputSystem";
import { TypeEntity } from "./Globals";

class Player {
  /**
   *
   * @param {Phaser.Physics.Arcade.ArcadePhysics} physics
   * @param {InputSystem} inputSystem
   * @param {number} x
   * @param {number} y
   * @param {string} spriteName
   */
  constructor(physics, inputSystem, x, y, spriteName, frame) {
    /** @type {InputSystem} */
    this.inputSystem = inputSystem;

    /** @type {Phaser.Physics.Arcade.Sprite} */
    this.sprite = physics.add.sprite(x, y, spriteName, frame);
    this.sprite.setSize(
      this.sprite.width - 4,
      this.sprite.height / 2,
      false
    );
    this.sprite.setOffset(2, this.sprite.height / 2);
    this.sprite.setScale(2);
    this.sprite.setDepth(1);
    this.sprite.setCollideWorldBounds(true);

    /** @type {number} */
    this.distanceCheck = (this.sprite.width + this.sprite.height / 2) * 2;

    /** @type {number} */
    this.velocity = 150;

    /** @type {Entity} */
    this.handObject = null;

    /** @type {Number} */
    this.handPositionX = 16;
    this.handPositionY = 16;
  }

  update() {
    if (this.inputSystem.cursors.left.isDown) {
      this.sprite.setVelocityX(-this.velocity);
      this.sprite.flipX = true;
      this.handPositionX = -16;
    } else if (this.inputSystem.cursors.right.isDown) {
      this.sprite.flipX = false;
      this.handPositionX = 16;
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

    if (this.handObject) {
      this.handObject.sprite.x = this.sprite.x + this.handPositionX;
      this.handObject.sprite.y = this.sprite.y + this.handPositionY;
    }

    if (this.inputSystem.isCancelPressed()) {
      if (this.handObject) this.dropObject();
    }
  }

  getObject(physics, objName, type) {
    if (!this.handObject) {
      this.handObject = new Entity(
        physics,
        this.sprite.x + this.handPositionX,
        this.sprite.y + this.handPositionY,
        "textures",
        objName,
        TypeEntity[type],
        false
      );
      this.handObject.sprite.setDepth(1);
    }
  }

  dropObject() {
    if (this.handObject) {
      this.handObject.sprite.destroy();
      this.handObject = null;
    }
  }

  /**
   * Process the collision with the entity.
   *
   * @param {Entity} entity
   */
  onCollision(entity, physics, orders) {
    if (this.inputSystem.isOkPressed()) {
      if (!this.handObject && TypeEntity.Box === entity.type) {
        this.getObject(physics, entity.sprite.name, "Fruit");
      } else if (!this.handObject && TypeEntity.Kitchen === entity.type) {
        const meal = entity.returnMeal();
        if (!meal) return;
        this.getObject(physics, meal, "GlassFruit");
      } else if (this.handObject && TypeEntity.Kitchen === entity.type) {
        if (entity.type === TypeEntity.Kitchen) {
          if (entity.prepareMeal(this.handObject.sprite.name)) {
            this.dropObject();
          }
        }
      } else if (this.handObject && TypeEntity.Delivery === entity.type) {
        if (this.handObject.type === TypeEntity.GlassFruit) {
          if (orders.delivered(this.handObject.sprite.name)) this.dropObject();
        }
      }
    }
  }
}

export default Player;
