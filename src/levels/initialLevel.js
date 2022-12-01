import { Entity } from "../classes/Entity";
import Kitchen from "../classes/Kitchen";
import { TypeEntity } from "../classes/Globals";


function createEntity(game, x, y, furniture) {
  return new Entity(
    game.physics,
    x,
    y,
    "textures2",
    furniture[0],
    TypeEntity[furniture[1]]
  )
}


function createLevel1(game, collisionSystem, audioManager) {
  const entitySize = { x: 22 * 2, y: 22 * 2 };

  //Create horizontal tables
  for (let cnt = 0; cnt < 7; cnt++) {
    let furniture = ["environment_01", "Table", null];
    if (cnt === 3) furniture = ["environment_00", "Box", "fruits_0"];

    let entity = createEntity(game, (150 + cnt * entitySize.x), 100, furniture);

    entity.sprite.setSize(
      entity.sprite.width,
      entity.sprite.height / 2 + 2,
      false
    );
    entity.sprite.setName(furniture[2]);
    collisionSystem.addEntity(entity);

    if (cnt === 3) {
      entity = createEntity(game, (150 + cnt * entitySize.x), 95, ["fruits_0" ,"Box"])
    }
  }

  // Create first vertical tables
  for (let cnt = 1; cnt < 4; cnt++) {
    let furniture = ["environment_03", "Table", null];
    if (cnt === 3) furniture = ["environment_00", "Box", "fruits_1"];

    let entity = createEntity(game, 150, (100 + cnt * entitySize.y), furniture);
    entity.sprite.setName(furniture[2]);
    collisionSystem.addEntity(entity);

    if (cnt === 3) {
      entity = createEntity(game, 150, (93 + cnt * entitySize.y), ["fruits_1" ,"Box"])
    }
  }

  // Create second vertical tables
  for (let cnt = 1; cnt < 4; cnt++) {
    let furniture = ["environment_03", "Table", null];
    if (cnt === 2) furniture = ["environment_00", "Box", "fruits_2"];
    if (cnt === 3) furniture = ["environment_10", "Kitchen", null];

    let entity = createEntity(game, (150 + 6 * entitySize.x), (100 + cnt * entitySize.y), furniture);

    if (cnt === 2) {
      const entity = createEntity(game, (150 + 6 * entitySize.x), (95 + cnt * entitySize.y), ["fruits_2" , "Box"]);
      collisionSystem.addEntity(entity);
    }

    if (cnt === 3) {
      entity = new Kitchen(
        game,
        150 + 6 * entitySize.x,
        95 + cnt * entitySize.y,
        "textures2",
        furniture[0],
        furniture[1],
        true,
        audioManager
      );
    }

    collisionSystem.addEntity(entity);
  }

  // Create delivery conveyor
  for (let cnt = 0; cnt < 2; cnt++) {
    let furniture;
    if (cnt === 0) furniture = ["environment_05", "Delivery"];
    if (cnt === 1) furniture = ["environment_06", "Delivery"];

    let entity = createEntity(game, (275 + cnt * entitySize.x), 300, furniture);
    entity.sprite.setName(furniture[1]);
    collisionSystem.addEntity(entity);
  }
}

export default createLevel1;
