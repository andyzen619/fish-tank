class BiteFish extends Fish {

  constructor(options) {
    super(options);
    this.imageUri = '/images/fzYjRZ9.gif';
    this.isTasty = false;
  }

  update(t) {
    // if you're out of bounds or if you are a tasty fish that is close to a Bite fish


    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
  }
}