// Global settings
const settings = {
  // Variables for total cells, each cell holding a direction
  numHorizontalCells: 60,
  numVerticalCells: 40,
  numParticles: 2500,
  maxSpeed: 1.75,
  fieldStrength: 0.005, // how strong the acceleration is of a vector to a particle
  noiseDifference: 3, // how much difference each step of noise makes (ex: 1, 0 to 1 gets mapped to 0 to 360 degrees,)
                      // (but with a value of 2, 0,1 gets mapped to 0, 720 but it loops at 360, so values are more spread)
  noiseTimeResistance: 500, // how much each time step changes the angles. higher = less change 
  slowFrameRate: 30,
  maxFrameRate: 60,
  fpsBufferSize: 4, // higher = smoother
  timeShift: false,
  seed: Math.round(Math.random()*999999)
}

//TODO
// noise seed (+ show / alter in sidebar)
// noise detail (perlin noise octaves)
// noise time resistance slider
// fix timeshift
// reset particles
// reseed particles button