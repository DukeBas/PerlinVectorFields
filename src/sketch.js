var grid;
var particleSystem;
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(60);
    background(255);
    grid = new Grid(settings.numHorizontalCells, settings.numVerticalCells);
    particleSystem = new ParticleSystem(settings.numParticles);
    changedState();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    var state = getCurrentState();
    switch (state) {
        case "vector":
        case "heatmap":
            background(255);
            grid.draw(state);
            break;
        case "particles":
            background(0);
            grid.draw(state);
            particleSystem.draw(state);
            particleSystem.updatePositions(grid);
            break;
    }
    updateFps();
}
function changedState() {
    var state = getCurrentState();
    switch (state) {
        case "vector":
        case "heatmap":
            frameRate(5);
            break;
        case "particles":
            frameRate(144);
            background(0);
    }
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