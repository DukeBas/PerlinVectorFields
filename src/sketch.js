var grid;
var particleSystem;
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(6);
    background(255);
    grid = new Grid(settings.numHorizontalCells, settings.numVerticalCells);
    particleSystem = new ParticleSystem(settings.numParticles);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(255);
    var state = getCurrentState();
    grid.draw(state);
    particleSystem.draw(state);
    updateFps();
}
function getCurrentState() {
    var selector = document.getElementById('state-selector');
    return selector.value;
}
function updateFps() {
    if (eval(document.getElementById('sidebar').style.width.charAt(0))) {
        document.getElementById('fps').innerHTML = frameRate().toFixed(0).toString();
    }
}
//# sourceMappingURL=TS/sketch.js.map