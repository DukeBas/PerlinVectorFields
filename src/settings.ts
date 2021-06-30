// Global settings
const settings = {
  // Variables for total cells, each cell holding a direction
  numHorizontalCells: 60,
  numVerticalCells: 40,
  numParticles: 1000,
  maxSpeed: 1.75,
  fieldStrength: 0.005, // how strong the acceleration is of a vector to a particle
  polygonStrength: 0.05, // how strong the acceleration is of particles in a polygon
  noiseDifference: 3, // how much difference each step of noise makes (ex: 1, 0 to 1 gets mapped to 0 to 360 degrees,)
                      // (but with a value of 2, 0,1 gets mapped to 0, 720 but it loops at 360, so values are more spread)
  noiseTimeResistance: 500, // how much each time step changes the angles. higher = less change 
  slowFrameRate: 30,
  maxFrameRate: 60,
  fpsBufferSize: 4, // higher = smoother, but less accurate for the current moment
  timeShift: false,
  seed: generateSeed(),
  coloring: false,
  numberOfParticlesNSystem: 6,
  polygonSideLength: 100, // in pixels
}

// variable to keep track of what simulation uses which specific system
const simUsesSystem = {
  vector: "particleSystem",
  heatmap: "particleSystem",
  particles: "particleSystem",
  trails: "particleSystem",
  strands: "particleSystem",
  nLine: "nSystem",
  polygon: "nSystem",
}

// function to generate a random seed, to be used by random and perlin noise
function generateSeed(): number {
  return Math.round(Math.random()*999999999999)
}

//TODO
// noise seed (+ show / alter in sidebar)
// noise detail (perlin noise octaves)
// noise time resistance slider
// reset particles + button
// state specific settings (sliders)
// second canvas overtop the first for non-trailing things