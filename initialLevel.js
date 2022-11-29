import Entity from "./Entity";

function createLevel1(game, collisionSystem) {
  const entitySize = { x: 22 * 2, y: 22 * 2 };

  for (let cnt = 0; cnt < 7; cnt++) {
    let furniture = [1, null];
    if (cnt === 3) furniture = [0, "fruits_0"];

    const entity = new Entity(
      game.physics,
      150 + cnt * entitySize.x,
      100,
      "textures",
      `environment_${furniture[0]}`
    );

    if (cnt === 3) {
      const entity = new Entity(
        game.physics,
        150 + cnt * entitySize.x,
        95,
        "textures",
        furniture[1]
      );
    }
    entity.sprite.setName(furniture[1]);
    collisionSystem.addEntity(entity);
  }

  for (let cnt = 1; cnt < 4; cnt++) {
    let furniture = [3, null];
    if (cnt === 3) furniture = [0, "fruits_1"];

    const entity = new Entity(
      game.physics,
      150,
      100 + cnt * entitySize.y,
      "textures",
      `environment_${furniture[0]}`
    );

    if (cnt === 3) {
      const entity = new Entity(
        game.physics,
        150,
        95 + cnt * entitySize.y,
        "textures",
        furniture[1]
      );
    }
    entity.sprite.setName(furniture[1]);
    collisionSystem.addEntity(entity);
  }

  for (let cnt = 1; cnt < 4; cnt++) {
    let furniture = [3, null];
    if (cnt === 2) furniture = [0, "fruits_2"];

    const entity = new Entity(
      game.physics,
      150 + 6 * entitySize.x,
      100 + cnt * entitySize.y,
      "textures",
      `environment_${furniture[0]}`
    );

    if (cnt === 2) {
      const entity = new Entity(
        game.physics,
        150 + 6 * entitySize.x,
        95 + cnt * entitySize.y,
        "textures",
        furniture[1]
      );
    }

    entity.sprite.setName(furniture[1]);
    collisionSystem.addEntity(entity);
  }
}

export default createLevel1;
