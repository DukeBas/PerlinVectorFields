// Global settings
const settings = {
  // Variables for total cells, each cell holding a direction
  numHorizontalCells: 64,
  numVerticalCells: 36,
  numParticles: 1000,
  maxSpeed: 1.75,
  minMaxSpeed: 0.5,
  maxMaxSpeed: 5,
  fieldStrength: 0.005, // how strong the acceleration is of a vector to a particle
  minFieldStrength: 0.005,
  maxFieldStrength: 1,
  polygonStrength: 0.05, // how strong the acceleration is of particles in a polygon
  noiseDifference: 3, // how much difference each step of noise makes (ex: 1, 0 to 1 gets mapped to 0 to 360 degrees,)
                      // (but with a value of 2, 0,1 gets mapped to 0, 720 but it loops at 360, so values are more spread)
  noiseTimeResistance: 500, // how much each time step changes the angles. higher = less change 
  maxFrameRate: 60,
  fpsBufferSize: 4, // higher = smoother, but less accurate for the current moment
  timeShift: false,
  seed: generateSeed(),
  coloring: false,
  numberOfParticlesNSystem: 6,
  polygonSideLength: 100, // in pixels
  minNumParticles: 0,
  maxNumParticles: 5000,
  maxNumParticlesNSystem: 100,
  paused: false,
  noiseOctaves: 4,
}

// function to generate a random seed, to be used by random and perlin noise
function generateSeed(): number {
  return Math.round(Math.random()*999999999999)
}

//TODO
// noise detail (perlin noise octaves)
// noise time resistance slider
// state specific settings (sliders)
// second canvas overtop the first for non-trailing things
// possibly remove wrapping and use modulo to draw
