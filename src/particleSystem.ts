class Particle {
  pos: p5.Vector;   // position vector
  prev: p5.Vector;  // vector of previous position 
  vel: p5.Vector;   // velocity vector


  constructor(x: number, y: number) {
    this.pos = createVector(x, y);
    this.prev = createVector(x, y);
    this.vel = createVector(0, 0);
  }

  // takes a direction (in degrees) and adds speed to this particle in that direction
  accelerate(dir: number, strength: number): void {
    const acc = p5.Vector.fromAngle(dir * Math.PI / 180);
    acc.setMag(strength);
    this.vel.add(acc);
    this.vel.limit(5);
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
}

class ParticleSystem {
  particles: Particle[];

  constructor(numberOfParticles: number) {
    this.particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
      let p = new Particle(randX(), randY());
      this.particles.push(p);
    }
  }

  // draw all the particles
  draw(state: State): void {
    switch (state) {
      case "particles":
        push();
        stroke(255, 100)
        strokeWeight(5);
        this.particles.forEach((p) => {
          p.draw(state);
        });
        pop();
        break;
      case "trails":
        push();
        stroke(255, 5)
        strokeWeight(2);
        this.particles.forEach((p) => {
          p.draw(state);
        });
        pop();
        break;
    }
  }

  // updates the particles positions according to their speed, and updates their speed according to their location
  updatePositions(grid: Grid) {
    this.particles.forEach((p) => {
      // change location, apply speed
      p.applySpeed();
      // change speed, apply acceleration based on location (direction of closest vector)
      p.accelerate(getNearestDirection(p.getX(), p.getY(), grid), settings.fieldStrength)
    });
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
