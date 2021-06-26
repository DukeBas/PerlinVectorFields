var grid;
var particleSystem;
var nSystem;
var fpsBuffer;
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(settings.maxFrameRate);
    background(255);
    randomSeed(settings.seed);
    noiseSeed(settings.seed);
    grid = new Grid(settings.numHorizontalCells, settings.numVerticalCells);
    particleSystem = new ParticleSystem(settings.numParticles);
    nSystem = new ParticleSystem(2 * settings.numberOfLinesNLine);
    fpsBuffer = [];
    for (var i = 0; i < settings.fpsBufferSize; i++) {
        fpsBuffer.push(settings.maxFrameRate);
    }
    changedState();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    changedState();
}
function draw() {
    var state = getCurrentState();
    if (settings.timeShift) {
        grid.noiseStep();
    }
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
        case "trails":
            background(0, 100);
            particleSystem.draw(state);
            particleSystem.updatePositions(grid);
        case "strands":
            particleSystem.draw(state);
            particleSystem.updatePositions(grid);
            break;
        case "n-line":
            nSystem.draw(state);
            nSystem.updatePositions(grid);
            break;
        case "polygon":
            nSystem.draw(state);
            nSystem.updatePositions(grid);
            break;
    }
    updateFps();
}
function downloadCanvas() {
    saveCanvas(settings.seed.toString(), "png");
}
//# sourceMappingURL=TS/sketch.js.map