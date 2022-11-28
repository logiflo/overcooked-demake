class Player {
  player = null;

  constructor(game, x, y, spriteName) {
    this.player = game.physics.add.sprite(x, y, spriteName);
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
  }

  update (cursors) {
    if (cursors.left.isDown) {
      this.player.setVelocityX(-290);
      this.player.flipX = true;
    } else if (cursors.right.isDown) {
      this.player.flipX = false;
      this.player.setVelocityX(290);
    } else if (cursors.up.isDown) {
      this.player.setVelocityY(-290);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(290);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }
  }
}

export default Player;
