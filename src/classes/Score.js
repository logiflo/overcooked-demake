class Score {
  constructor(game) {
    this.points = 0;
    this.pointText = game.add.text(35, 310, this.points, { fontFamily: "OpenSansPXBold", fontSize: 28 });
  }

  getPoints(num) {
    this.points += num;
    console.log(this.points, num);
  }

  losePoints(num) {
    this.points -= num;
    console.log(this.points, num);
  }
}

export default Score;
