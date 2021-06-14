type Cell = {
  dir: number,  // direction in degrees [0, 360]
}

class Grid {
  hor: number;  // number of horizontal cells
  vert: number; // number of vertical cells
  cells: Cell[][]; // variable holding the cells

  constructor(numHorizontalCells: number, numVerticalCells: number) {
    this.hor = numHorizontalCells;
    this.vert = numVerticalCells;
    this.cells = []

    // initialise colums
    for (let i = 0; i < numHorizontalCells; i++) {
      this.cells[i] = [];
    }

    this.generateNoisedCells();
  }

  // generates cells with random direction
  generateRandomCells() {
    for (let i = 0; i < this.hor; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.vert; j++) {
        const direction = random(0, 360);
        this.cells[i][j] = { dir: direction };
      }
    }
  }

  // generates cells with 2d perlin noise based direction
  generateNoisedCells() {
    for (let i = 0; i < this.hor; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.vert; j++) {
        const direction = settings.noiseDifference * noise(i / 25, j / 25) * 360;
        this.cells[i][j] = { dir: direction };
      }
    }
  }

  // use 3d noise, for time dimension
  noiseStep() {
    for (let i = 0; i < this.hor; i++) {
      for (let j = 0; j < this.vert; j++) {
        const direction = settings.noiseDifference * noise(i / 25, j / 25, frameCount / settings.noiseTimeResistance) * 360;
        this.cells[i][j] = { dir: direction };
      }
    }
  }

  getGrid(): Cell[][] {
    return this.cells;
  }

  // function to draw the cells
  draw(state: State): void {
    // get individual cell width and height
    const cellWidth = width / this.hor;
    const cellHeight = height / this.vert;
    const cellMin = min(cellWidth, cellHeight);

    // this.noiseStep();

    switch (state) {
      case "vector":
        for (let i = 0; i < this.hor; i++) {
          for (let j = 0; j < this.vert; j++) {
            const cell = this.cells[i][j];
            const locX = i * cellWidth;
            const locY = j * cellHeight;

            line(locX + cellWidth / 2,
              locY + cellHeight / 2,
              locX + cellMin / 2 * (1 + Math.cos(cell.dir * (Math.PI / 180))),
              locY + cellMin / 2 * (1 + Math.sin(cell.dir * (Math.PI / 180)))
            );
          }
        }
        break;
      case "heatmap":
        for (let i = 0; i < this.hor; i++) {
          for (let j = 0; j < this.vert; j++) {
            const cell = this.cells[i][j];
            const locX = i * cellWidth;
            const locY = j * cellHeight;

            push();
            fill(map(cell.dir, 0, 360, 0, 255));
            rect(locX, locY, cellWidth, cellHeight);
            pop();
          }
        }
        break;
    }
  }

  // returns cell at i,j in cells array
  getCellAt(i: number, j: number): Cell {
    return this.cells[i][j];
  }
}