var settings = {
    numHorizontalCells: 60,
    numVerticalCells: 40,
    numParticles: 1000,
    maxSpeed: 1.75,
    minMaxSpeed: 0.5,
    maxMaxSpeed: 5,
    fieldStrength: 0.005,
    minFieldStrength: 0.005,
    maxFieldStrength: 1,
    polygonStrength: 0.05,
    noiseDifference: 3,
    noiseTimeResistance: 500,
    maxFrameRate: 60,
    fpsBufferSize: 4,
    timeShift: false,
    seed: generateSeed(),
    coloring: false,
    numberOfParticlesNSystem: 6,
    polygonSideLength: 100,
    minNumParticles: 0,
    maxNumParticles: 5000,
    maxNumParticlesNSystem: 100,
    paused: false,
};
function generateSeed() {
    return Math.round(Math.random() * 999999999999);
}
//# sourceMappingURL=TS/settings.js.map