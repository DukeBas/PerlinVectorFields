let grid: Grid;
let particleSystem: ParticleSystem;

// Possible states, gotten from selector
type State = "vector" | "heatmap" | "particles";

// run before first drawn frame
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);  // make canvas start in top-left corner
  canvas.style('z-index', '-1');  // set canvas as background
  frameRate(60);  // target framerate

  // set background to black
  background(255);

  // create a grid
  grid = new Grid(settings.numHorizontalCells, settings.numVerticalCells);

  // create particle system
  particleSystem = new ParticleSystem(settings.numParticles);

  // set everything up based on inital state
  changedState();
}

// automatically called function to make canvas resize with window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// single drawing iteration
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
      particleSystem.draw(state);
      particleSystem.updatePositions();
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
      break;
    case "particles":
      background(0);
  }
}


// function to get the current state from selector
function getCurrentState(): State {
  const selector: any = document.getElementById('state-selector');
  return selector.value;
}

// update the fps counter in the sidebar
function updateFps(): void {
  // only update it when sidebar is shown
  if (eval(document.getElementById('sidebar').style.width.charAt(0))) {
    document.getElementById('fps').innerHTML = frameRate().toFixed(0).toString();
  }

}