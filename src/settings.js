var settings = {
    numHorizontalCells: 60,
    numVerticalCells: 40,
    numParticles: 2500,
    maxSpeed: 1.75,
    fieldStrength: 0.005,
    noiseDifference: 3,
    noiseTimeResistance: 500,
    slowFrameRate: 30,
    maxFrameRate: 60,
    fpsBufferSize: 4,
    timeShift: false,
    seed: generateSeed(),
    coloring: false,
};
function generateSeed() {
    return Math.round(Math.random() * 999999);
}
//# sourceMappingURL=TS/settings.js.map