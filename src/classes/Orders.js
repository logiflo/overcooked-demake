import Entity from "./Entity";
import { BarColors } from "./Globals";

const possibleOrders = ["items_6", "items_5", "items_4"];

class Order {
  constructor(game, spriteName) {
    this.meal = new Entity(game.physics, 30, 30, "textures", spriteName);

    this.bar = game.add.rectangle(
      this.meal.sprite.x - 15,
      this.meal.sprite.y + 15,
      30,
      6,
      BarColors.Green
    );
    this.bar.setOrigin(0, 0);
    this.bar.scaleX = 1;

    this.prepareTime = 5000;
    this.cnt = 0;
    this.expired = false;
  }

  update(audioManager) {
    this.cnt++;

    this.bar.scaleX = (this.prepareTime - this.cnt) / this.prepareTime;
    if (this.bar.scaleX < 0.25) {
      this.bar.setFillStyle(BarColors.Red);
    } else if (this.bar.scaleX < 0.75) {
      this.bar.setFillStyle(BarColors.Yellow);
    }

    if (this.cnt >= this.prepareTime) {
      this.meal.sprite.destroy();
      this.bar.destroy();
      this.expired = true;
      audioManager.playFailure();
    }
  }

  isExpired() {
    return this.expired;
  }

  setPosX(x) {
    this.meal.sprite.x = x;
    this.bar.x = x - 15;
  }

  destroy() {
    this.meal.sprite.destroy();
    this.bar.destroy();
  }
}

class Orders {
  constructor(game, audioManager, score) {
    this.orders = [];
    this.expiredOrders = [];
    this.game = game;
    this.cnt = 0;
    this.audioManager = audioManager;
    this.score = score;
  }
  static possibleOrders = ["items_6", "items_5", "items_4"];

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  update(scene) {
    this.cnt += 1;

    if ((this.cnt === 1 || this.cnt % 300 === 0) && this.cnt < 5000) {
      const random = possibleOrders[this.randomIntFromInterval(0, 2)];
      const order = new Order(this.game, random);
      this.orders.push(order);
    }

    this.expiredOrders = this.orders.filter((order) => order.isExpired());
    if (this.expiredOrders.length) {
      this.score.losePoints(500 * this.expiredOrders.length);
      this.score.pointText.setText(this.score.points);
    }

    if (this.cnt > 5000 && this.orders.length === 0) {
      this.audioManager.stopRestaurantSong();
      scene.start("end", { points: this.score.points });
    }

    this.orders = this.orders.filter((order) => !order.isExpired());

    // Set the positions of the sprites.
    let pos = 30;
    this.orders.forEach((order) => {
      order.setPosX(pos);
      order.update(this.audioManager);
      pos += 34;
    });
  }

  searchFirst(orderName) {
    for (let pos = 0; pos < this.orders.length; pos++) {
      if (this.orders[pos].meal.sprite.name === orderName) return pos;
    }

    return -1;
  }

  delivered(orderName) {
    const foundPos = this.searchFirst(orderName);
    if (foundPos === -1) {
      this.score.losePoints(500);
      this.audioManager.playFailure();
      this.score.pointText.setText(this.score.points);
      return true;
    };

    this.score.getPoints(Math.floor(1500 * this.orders[foundPos].bar.scaleX));
    this.score.pointText.setText(this.score.points);
    this.orders[foundPos].destroy();
    this.orders.splice(foundPos, 1);
    this.audioManager.playReady();

    return true;
  }
}

export default Orders;
