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
    nSystem = new ParticleSystem(settings.numberOfParticlesNSystem);
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
            nSystem.draw(state);
            nSystem.updatePositions(grid, state);
            break;
        case "polygon":
            nSystem.draw(state);
            nSystem.updatePositions(grid, state);
            break;
    }
    updateFps();
}
//# sourceMappingURL=TS/sketch.js.map