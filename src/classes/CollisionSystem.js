import { Math, Physics } from "phaser";
import Player from "./Player";
import Entity from "./Entity";

class CollisionSystem {
  /**
   *
   * @param {Physics.Arcade.ArcadePhysics} physics
   * @param {Player} player
   */
  constructor(physics, player) {
    /** @type {Physics.Arcade.ArcadePhysics} */
    this.physics = physics;

    /** @type {Player} */
    this.player = player;

    /** @type {Entity[]} */
    this.entities = [];
  }

  /**
   *
   * @param {Entity} entity
   */
  addEntity(entity) {
    this.physics.add.collider(this.player.sprite, entity.sprite);
    this.entities.push(entity);
  }

  /**
   * Loop all the entities and check the distance with the player.
   *
   * Gets the nearest entity with the player below an interval.
   *
   * Calls player "onCollision" method with the nearest entity if any.
   */
  update(physics, orders) {
    let nearestEntity = { distance: 1000, entity: undefined };
    this.entities.forEach((entity) => {
      entity.update();

      const distance = Math.Distance.Between(
        this.player.sprite.x,
        this.player.sprite.y,
        entity.sprite.x,
        entity.sprite.y
      );

      if (
        distance <= this.player.distanceCheck &&
        distance < nearestEntity.distance
      ) {
        nearestEntity = { distance, entity };
      }
    });

    if (nearestEntity.entity) {
      this.player.onCollision(nearestEntity.entity, physics, orders);
    }
  }
}

export default CollisionSystem;
