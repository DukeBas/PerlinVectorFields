let grid: Grid;
let particleSystem: ParticleSystem;

// Possible states, gotten 
type State = "vector" | "heatmap" | "particles";

// run before first drawn frame
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);  // make canvas start in top-left corner
  canvas.style('z-index', '-1');  // set canvas as background
  frameRate(6);  // target framerate

  // set background to black
  background(255);

  // create a grid
  grid = new Grid(settings.numHorizontalCells, settings.numVerticalCells);

  // create particle system
  particleSystem = new ParticleSystem(settings.numParticles);
}

// automatically called function to make canvas resize with window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// single drawing iteration
function draw() {
  // draw background
  background(255);

  const state = getCurrentState();
  grid.draw(state);
  particleSystem.draw(state);

  updateFps();
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