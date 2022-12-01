class Points {
  constructor() {
    this.totalPoints = 0;
  }

  getPoints(num) {
    this.totalPoints += num;
  }

  losePoints(num) {
    this.totalPoints -= num;
  }
}

export default Points;
