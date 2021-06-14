class Particle {
  x: number;  // x part of location coordinate
  y: number;  // y part of location coordinate
  dx: number; // x component of speed
  dy: number; // y component of speed
  prevX: number;  // last x location
  prevY: number;  // last y location

  constructor(x: number, y: number) {
    this
    this.x = x;
    this.y = y;
    this.dx = random(-10, 10);
    this.dy = random(-10, 10);
    this.prevX = x;
    this.prevY = y;
  }

  setSpeed(dx: number, dy: number): void {
    this.dx = dx;
    this.dy = dy;
  }

  increaseSpeed(ddx: number, ddy: number): void {
    this.dx += ddx;
    this.dy += ddy;
  }

  // adds x and y speed values to x and y location values
  applySpeed(): void {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.dx;
    this.y += this.dy;

    // out of screen detection / wrapping
    if (this.x > width) {
      this.x = 0;
      this.prevX = 0;
    }
    if (this.x < 0) {
      this.x = width;
      this.prevX = width;
    }
    if (this. y > height){
      this.y = 0;
      this.prevY = 0;
    }
    if (this.y < 0){
      this.y = height;
      this.prevY = height;
    }
  }

  // draws particle on screen
  draw(state: State): void {
    push();
    stroke(255, 100)
    strokeWeight(5);
    line(this.prevX, this.prevY, this.x, this.y);
    pop();
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
    switch (state){
      case "particles":
        this.particles.forEach((p) => {
          p.draw(state);
        });
        break
    }    
  }

  // updates the particles positions according to their speed, and updates their speed according to their location
  updatePositions() {
    this.particles.forEach((p) => {
      // change location, apply speed
      p.applySpeed();
      // change speed, apply acceleration based on location (direction of closest vector)
      // TODO
    });
  }
}

// generates a random (x) value between 0 and the screen width (in pixels)
function randX(): number {
  return random(width);
}

// generates a random (y) value between 0 and the screen height (in pixels)
function randY(): number {
  return random(height);
}
