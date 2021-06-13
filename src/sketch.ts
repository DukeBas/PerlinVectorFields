// Variables for total cells, each cell holding a direction
let numHorizontalCells = 50;
let numVerticalCells = 40;
let grid: Grid;


// run before first drawn frame
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);  // make canvas start in top-left corner
  canvas.style('z-index', '-1');  // set canvas as background
  frameRate(60);  // target framerate

  // set background to black
  background(255);

  // create a grid
  grid = new Grid(numHorizontalCells, numVerticalCells);
}

// automatically called function to make canvas resize with window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// single drawing iteration
function draw() {
  grid.draw();

  // const randX = random(0, windowWidth);
  // const randY = random(0, windowHeight);
  // rect(randX, randY, 10, 10)

  noLoop();
}