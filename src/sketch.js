var grid;
var particleSystem;
var fpsBuffer;
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(settings.maxFrameRate);
    background(255);
    grid = new Grid(settings.numHorizontalCells, settings.numVerticalCells);
    particleSystem = new ParticleSystem(settings.numParticles);
    fpsBuffer = [];
    for (var i = 0; i < settings.fpsBufferSize; i++) {
        fpsBuffer.push(settings.maxFrameRate);
    }
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
        case "trails":
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
function getCurrentState() {
    var selector = document.getElementById('state-selector');
    return selector.value;
}
function updateFps() {
    fpsBuffer.shift();
    fpsBuffer.push(frameRate());
    var sum = fpsBuffer.reduce(function (a, b) { return a + b; });
    var avg = sum / fpsBuffer.length;
    if (eval(document.getElementById('sidebar').style.width.charAt(0))) {
        document.getElementById('fps').innerHTML = avg.toFixed(0).toString();
    }
}
//# sourceMappingURL=TS/sketch.js.map