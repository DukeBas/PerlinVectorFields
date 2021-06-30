type Cell = {
  dir: number,  // direction in degrees [0, 360]
}

class Grid {
  hor: number;  // number of horizontal cells
  vert: number; // number of vertical cells
  cells: Cell[][]; // variable holding the cells
  timeSteps: number; // used for keeping track of how many steps have preceded

  constructor(numHorizontalCells: number, numVerticalCells: number) {
    this.hor = numHorizontalCells;
    this.vert = numVerticalCells;
    this.cells = [];
    this.timeSteps = 0;

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
    this.timeSteps++;
    for (let i = 0; i < this.hor; i++) {
      for (let j = 0; j < this.vert; j++) {
        const direction = settings.noiseDifference * noise(i / 25, j / 25, this.timeSteps / settings.noiseTimeResistance) * 360;
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
            const loc = createVector((i + 0.5) * cellWidth, (j + 0.5) * cellHeight);
            const dir = p5.Vector.fromAngle(this.cells[i][j].dir* (Math.PI / 180));
            dir.setMag(Math.min(cellWidth/2, cellHeight/2));

            line(loc.x, loc.y, loc.x+dir.x, loc.y+dir.y);
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
      case "particles":
        push();
        stroke(255);
        strokeWeight(0.5);
        for (let i = 0; i < this.hor; i++) {
          for (let j = 0; j < this.vert; j++) {
            const loc = createVector((i + 0.5) * cellWidth, (j + 0.5) * cellHeight);
            const dir = p5.Vector.fromAngle(this.cells[i][j].dir* (Math.PI / 180));
            dir.setMag(Math.min(cellWidth/2, cellHeight/2));

            line(loc.x, loc.y, loc.x+dir.x, loc.y+dir.y);
          }
        }
        pop();
        break;
    }
  }

  // returns cell at i,j in cells array
  getCellAt(i: number, j: number): Cell {
    return this.cells[i][j];
  }
}