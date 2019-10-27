class LindaFish extends Fish {
  constructor(options) {
    super(options),
      this.imageUri = "./images/seriousLinda.jpg"
  }

  isCloseToAndyFish() {

    //Check if all the fishes in tank are tasty
    let tank = this.tank.denizens;
    let fishArray = Object.keys(tank);

    for (let number of fishArray) {
      let currentFish = tank[number];

      //Loop through
      if (currentFish && currentFish.constructor.name === "AndyFish") {
        let xDifference = Math.abs(this.position.x - currentFish.position.x);
        let yDifference = Math.abs(this.position.y - currentFish.position.y);

        // console.log(`${this.constructor.name} difference from ${currentFish.imageUri}: (${xDifference},${yDifference})`);

        if (xDifference <= 50 && yDifference <= 50) {
          console.log(`$${currentFish.constructor.name} killed ${this.constructor.name}`);
          this.imageUri = "./images/seriousLandy.jpg";
          this.height = 300;
          this.width = 300;
        }
      }
    }
  }

  update(t) {
    // if you're out of bounds or if you are a tasty fish that is close to a Bite fish


    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      this.isCloseToAndyFish();
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
  }
}