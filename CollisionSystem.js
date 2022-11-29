import { Math, Physics } from "phaser";
import Player from "./Player";
import Entity from "./Entity";

class CollisionSystem {
  /** @type {Physics.Arcade.ArcadePhysics} */
  physics = null;

  /** @type {Player} */
  player = null;

  /** @type {Entity[]} */
  entities = [];

  /**
   *
   * @param {Physics.Arcade.ArcadePhysics} physics
   * @param {Player} player
   */
  constructor(physics, player) {
    this.physics = physics;
    this.player = player;
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
  update() {
    let nearestEntity = { distance: 1000, entity: undefined };
    this.entities.forEach((entity) => {
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
      this.player.onCollision(nearestEntity.entity);
    }
  }
}

export default CollisionSystem;
