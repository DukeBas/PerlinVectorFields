let grid: Grid;
let particleSystem: ParticleSystem;
let fpsBuffer: number[];  // used to smooth out fps counter

// Possible states, gotten from selector
type State = "vector" | "heatmap" | "particles" | "trails";

// run before first drawn frame
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);  // make canvas start in top-left corner
  canvas.style('z-index', '-1');  // set canvas as background
  frameRate(settings.maxFrameRate);  // target framerate

  // set background to black
  background(255);

  // create a grid
  grid = new Grid(settings.numHorizontalCells, settings.numVerticalCells);

  // create particle system
  particleSystem = new ParticleSystem(settings.numParticles);

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
}

// single drawing/step iteration
function draw() {
  const state = getCurrentState();

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
      particleSystem.updatePositions(grid);
      break;
    case "trails":
      particleSystem.draw(state);
      particleSystem.updatePositions(grid);
      break;
  }

  updateFps();
}

// called when state gets changed
function changedState() {
  const state = getCurrentState();

  // change things based on the new state
  switch (state) {
    case "vector":
    case "heatmap":
      frameRate(settings.slowFrameRate);
      break;
    case "particles":
      frameRate(settings.maxFrameRate);
      background(0);
      break;
    case "trails":
      frameRate(settings.maxFrameRate);
      background(0);
      break;
  }
}


// function to get the current state from selector
function getCurrentState(): State {
  const selector: any = document.getElementById('state-selector');
  return selector.value;
}

// update the fps counter in the sidebar
function updateFps(): void {
  // smooth out fps
  fpsBuffer.shift(); // remove first entry
  fpsBuffer.push(frameRate()); // add latest framerate

  const sum = fpsBuffer.reduce((a, b) => a + b);
  const avg = sum / fpsBuffer.length;

  // only update it when sidebar is shown
  if (eval(document.getElementById('sidebar').style.width.charAt(0))) {
    document.getElementById('fps').innerHTML = avg.toFixed(0).toString();
  }

}
