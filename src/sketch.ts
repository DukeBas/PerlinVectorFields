let grid: Grid;
let particleSystem: ParticleSystem;
let nSystem: ParticleSystem;
let fpsBuffer: number[];  // used to smooth out fps counter

// Possible states, gotten from selector
type State = "vector" 
| "heatmap" 
| "particles" 
| "trails" 
| "strands" 
| "n-line" 
| "polygon";

// run before first drawn frame
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);  // make canvas start in top-left corner
  canvas.style('z-index', '-1');  // set canvas as background
  frameRate(settings.maxFrameRate);  // target framerate

  // set background to black
  background(255);

  // set random seed
  randomSeed(settings.seed);
  noiseSeed(settings.seed);

  // create a grid
  grid = new Grid(settings.numHorizontalCells, settings.numVerticalCells);

  // create particle systems
  particleSystem = new ParticleSystem(settings.numParticles);
  nSystem = new ParticleSystem(settings.numberOfParticlesNSystem);

  // set up fps buffer
  fpsBuffer = [];
  for (let i = 0; i < settings.fpsBufferSize; i++) {
    fpsBuffer.push(settings.maxFrameRate);
  }

  // set everything up based on inital state
  changedState();
}

// automatically called function to make canvas resize with window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  changedState();
}

// single drawing/step iteration
function draw() {
  const state = getCurrentState();

  // update vector field if required
  if (settings.timeShift) {
    grid.noiseStep();
  }

  switch (state) {
    case "vector":
    case "heatmap":
      // draw background
      background(255);
      grid.draw(state);
      break;
    case "particles":
      background(0);
      grid.draw(state);
      particleSystem.draw(state);
      particleSystem.updatePositions(grid, state);
      break;
    case "trails":
      background(0, 100);
      particleSystem.draw(state);
      particleSystem.updatePositions(grid, state);
    case "strands":
      particleSystem.draw(state);
      particleSystem.updatePositions(grid, state);
      break;
    case "n-line":
    case "polygon":
      if (!settings.nPersistency) {
        background(0, 70);
      }
      nSystem.draw(state);
      nSystem.updatePositions(grid, state);
      break;
  }

  updateFps();
}

// called when the user presses a key on their keyboard
function keyPressed() {
  // pause when spacebar is hit
  if (keyCode === 32) { 
    settings.paused = !settings.paused;
    if (settings.paused) {
      frameRate(0);
    } else {
      frameRate(60);
    }
  }
}