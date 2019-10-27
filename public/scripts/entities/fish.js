class Fish extends Denizen {

  constructor(options) {
    super(options);
    this.imageUri = '/images/fish01.png';
    this.maxSwimSpeed = 100;
    this.makeNewVelocity();
    this.isTasty = true;
  }

  generateSwimVelocity(max, min) {
    if (min && min > max) {
      min = 0;
    }
    var newSpeed = new Vector(randRangeInt(-max, max), randRangeInt(-max / 2, max / 2));
    while (min && newSpeed.magnitude() < min) {
      newSpeed = new Vector(randRangeInt(-max, max), randRangeInt(-max / 2, max / 2));
    }
    return newSpeed;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
  }

  makeNewVelocity(minMag) {
    this.swimVelocity = this.generateSwimVelocity(this.maxSwimSpeed, minMag || 0);
    this.timeUntilSpeedChange = randRangeInt(5);
  }

  isCloseToBiteFish() {

    //Check if all the fishes in tank are tasty
    let tank = this.tank.denizens;
    let fishArray = Object.keys(tank);

    for (let number of fishArray) {
      let currentFish = tank[number];

      //Loop through
      if (currentFish && currentFish.constructor.name === "BiteFish") {
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