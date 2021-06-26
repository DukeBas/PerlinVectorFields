var settings = {
    numHorizontalCells: 60,
    numVerticalCells: 40,
    numParticles: 2500,
    maxSpeed: 1.75,
    fieldStrength: 0.005,
    polygonStrength: 0.05,
    noiseDifference: 3,
    noiseTimeResistance: 500,
    slowFrameRate: 30,
    maxFrameRate: 60,
    fpsBufferSize: 4,
    timeShift: false,
    seed: generateSeed(),
    coloring: false,
    numberOfLinesNLine: 3,
    polygonSideLength: 100,
};
function generateSeed() {
    return Math.round(Math.random() * 999999999999);
}
//# sourceMappingURL=TS/settings.js.map