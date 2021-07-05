class Particle {
  pos: p5.Vector;   // position vector
  prev: p5.Vector;  // vector of previous position 
  vel: p5.Vector;   // velocity vector


  constructor(x: number, y: number) {
    this.pos = createVector(x, y);
    this.prev = createVector(x, y);
    this.vel = createVector(random(-settings.maxSpeed, settings.maxSpeed),
      random(-settings.maxSpeed, settings.maxSpeed));
  }

  // takes a direction (in degrees) and adds speed to this particle in that direction
  accelerate(dir: number, strength: number, otherForces?: p5.Vector): void {
    const acc = p5.Vector.fromAngle(dir * Math.PI / 180, strength);
    this.vel.add(acc);
    if (otherForces !== undefined) {
      this.vel.add(otherForces);
    }
    this.vel.limit(settings.maxSpeed);
  }

  // adds x and y speed values to x and y location values
  applySpeed(): void {
    this.prev = this.pos.copy();
    this.pos.add(this.vel);

    // out of screen detection / wrapping
    if (this.pos.x > width) {
      this.pos.x = 0.5;
      this.prev.x = 0.5;
    }
    if (this.pos.x < 0) {
      this.pos.x = width - 0.5;
      this.prev.x = width - 0.5;
    }
    if (this.pos.y > height) {
      this.pos.y = 0.5;
      this.prev.y = 0.5;
    }
    if (this.pos.y < 0) {
      this.pos.y = height - 0.5;
      this.prev.y = height - 0.5;
    }
  }

  // draws particle on screen
  draw(state: State): void {
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  }

  getX(): number {
    return this.pos.x;
  }

  getY(): number {
    return this.pos.y;
  }

  getVelX(): number {
    return this.vel.x;
  }

  getVelY(): number {
    return this.vel.y;
  }
}

class ParticleSystem {
  particles: Particle[];

  constructor(numberOfParticles: number) {
    this.generateParticles(numberOfParticles);
  }

  generateParticles(numberOfParticles: number) {
    // create/clear particles array
    this.particles = [];

    // generate new particles
    for (let i = 0; i < numberOfParticles; i++) {
      let p = new Particle(randX(), randY());
      this.particles.push(p);
    }
  }

  // adds or removes particles to get to a new number of particles in the simulation
  updateNumberOfParticles(newNum: number): void {
    console.log(this)
    if (newNum > this.particles.length){
      // add particles
      for (let pToGo = newNum - this.particles.length; pToGo > 0; pToGo--){
        let p = new Particle(randX(), randY());
        this.particles.push(p);
      }
    } else if (newNum < this.particles.length){
      // remove particles
      this.particles = this.particles.splice(0, newNum);
    }
  }

  // draw all the particles
  draw(state: State): void {
    switch (state) {
      case "particles":
        push();
        stroke(255, 100);
        strokeWeight(5);
        this.particles.forEach((p) => {
          if (settings.coloring) {
            const R = map(Math.abs(p.getVelX()), 0, settings.maxSpeed, 0, 255);
            const B = map(Math.abs(p.getVelY()), 0, settings.maxSpeed, 0, 255);
            stroke(R, 0, B, 255);
          }
          p.draw(state);
        });
        pop();
        break;
      case "trails":
        push();
        stroke(255, 100);
        strokeWeight(2);
        this.particles.forEach((p) => {
          if (settings.coloring) {
            const R = map(Math.abs(p.getVelX()), 0, settings.maxSpeed, 0, 255);
            const B = map(Math.abs(p.getVelY()), 0, settings.maxSpeed, 0, 255);
            stroke(R, 0, B, 100);
          }
          p.draw(state);
        });
        pop();
        break;
      case "strands":
        push();
        stroke(255, 2);
        strokeWeight(1);
        this.particles.forEach((p) => {
          if (settings.coloring) {
            const R = map(Math.abs(p.getVelX()), 0, settings.maxSpeed, 0, 255);
            const B = map(Math.abs(p.getVelY()), 0, settings.maxSpeed, 0, 255);
            stroke(R, 0, B, 3);
          }
          p.draw(state);
        });
        pop();
        break;
      case "n-line":
        push();
        stroke(255, 20);
        strokeWeight(1);
        colorMode(HSL)
        const numberOfLines = Math.floor(this.particles.length / 2);
        for (let i = 0; i < numberOfLines; i += 1) {
          if (settings.coloring) {
            stroke(i * (360 / numberOfLines), 100, 50, 0.1);
          }
          const p1 = this.particles[2 * i];
          const p2 = this.particles[2 * i + 1];
          line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
        }
        pop();
        break;
      case "polygon":
        push();
        stroke(255, 20);
        strokeWeight(1);
        colorMode(HSL);
        for (let i = 0; i < this.particles.length; i += 1) {
          if (settings.coloring) {
            stroke(i * (360 / this.particles.length), 100, 50, 0.1);
          }
          const p1 = this.particles[i];
          const p2 = this.particles[i + 1 == this.particles.length ? 0 : i + 1];
          line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
        }
        pop();
        break;
    }
  }

  // updates the particles positions according to their speed, and updates their speed according to their location
  updatePositions(grid: Grid, state: State) {
    if (state != "polygon") {
      this.particles.forEach((p) => {
        // change location, apply speed
        p.applySpeed();

        // change speed, apply acceleration based on location (direction of closest vector)
        p.accelerate(getNearestDirection(p.getX(), p.getY(), grid), settings.fieldStrength);
      });
    } else {
      // for each point, calculate the applied force by comparing side length and desired side length
      const vectorList: p5.Vector[] = [];
      for (let i = 0; i < this.particles.length; i++) {
        const previousParticle = this.particles[i - 1 == -1 ? this.particles.length - 1 : i - 1];
        const thisParticle = this.particles[i];
        const nextParticle = this.particles[i + 1 == this.particles.length ? 0 : i + 1];

        const leftDistance = dist(previousParticle.getX(),
          previousParticle.getY(),
          thisParticle.getX(),
          thisParticle.getY());
        const leftDifference = leftDistance - settings.polygonSideLength;
        const leftVector = createVector(previousParticle.getX() - thisParticle.getX(),
          previousParticle.getY() - thisParticle.getY())
          .setMag(leftDifference);

        const rightDistance = dist(thisParticle.getX(),
          thisParticle.getY(),
          nextParticle.getX(),
          nextParticle.getY());
        const rightDifference = rightDistance - settings.polygonSideLength;
        const rightVector = createVector(nextParticle.getX() - thisParticle.getX(),
          nextParticle.getY() - thisParticle.getY())
          .setMag(rightDifference);

        // add vectors to get total
        leftVector.add(rightVector)

        // define maximum length vector
        leftVector.limit(settings.polygonStrength);

        // add vector to list
        vectorList[i] = leftVector.copy();

        // push();
        // stroke(255,0,0)
        // line(thisParticle.getX(),
        // thisParticle.getY(),
        // thisParticle.getX() + leftVector.x,
        // thisParticle.getY() + leftVector.y);
        // pop();
      }

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        // change location, apply speed
        p.applySpeed();

        // push();
        // stroke(255,0,0)
        // line(p.getX(), p.getY(), p.getX() + vectorList[i].x*10, p.getY() + vectorList[i].y*10);
        // pop();

        // apply acceleration based on vectorfield and other points in polygon
        p.accelerate(getNearestDirection(p.getX(), p.getY(), grid), settings.fieldStrength, vectorList[i]);
      }
    }
  }
}

// takes x and y and returns the direction (in degrees) of the nearest vector
function getNearestDirection(x: number, y: number, grid: Grid): number {
  let cellWidth = width / settings.numHorizontalCells;
  let cellHeight = height / settings.numVerticalCells;
  const i = Math.floor(x / cellWidth);
  const j = Math.floor(y / cellHeight);
  return grid.getCellAt(i, j).dir;
}

// generates a random (x) value between 0 and the screen width (in pixels)
function randX(): number {
  return random(width);
}

// generates a random (y) value between 0 and the screen height (in pixels)
function randY(): number {
  return random(height);
}
