var numHorizontalCells = 50;
var numVerticalCells = 40;
var grid;
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(60);
    background(255);
    grid = new Grid(numHorizontalCells, numVerticalCells);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(255);
    var state = getCurrentState();
    grid.draw(state);
}
function getCurrentState() {
    var selector = document.getElementById('state-selector');
    return selector.value;
}
//# sourceMappingURL=TS/sketch.js.map