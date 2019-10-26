class GoFish extends Fish {

  constructor(options) {
    super(options);
    this.surgeSecondsLeft = 0;
    this.maxSurge = 1.0;
    this.surgMult = 3.0;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S * (1 + this.surgeSecondsLeft * this.surgMult));
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
    this.surgeSecondsLeft = Math.max(0, this.surgeSecondsLeft - PHYSICS_TICK_SIZE_S);
  }


  onClick(event) {
    this.surgeSecondsLeft = this.maxSurge;
  }



  isCloseToBiteFish() {

    //Check if all the fishes in tank are tasty
    let tank = this.tank.denizens;
    let fishArray = Object.keys(tank);

    for (let number of fishArray) {
      let currentFish = tank[number];

      if (currentFish && currentFish !== this) {
        let xDifference = Math.abs(this.position.x - currentFish.position.x);
        let yDifference = Math.abs(this.position.y - currentFish.position.y);

        // console.log(`${this.constructor.name} difference from ${currentFish.imageUri}: (${xDifference},${yDifference})`);

        if (xDifference <= 50 && yDifference <= 50) {
          console.log(`$${currentFish.constructor.name} killed ${this.constructor.name}`);
          this.kill();
        }
      }
    }
  }

  update(t) {
    // if you're out of bounds or if you are a tasty fish that is close to a Bite fish
    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      this.isCloseToBiteFish();
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
  }
}