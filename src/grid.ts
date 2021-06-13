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

    this.generateRandomCells();
  }

  // generates cells
  generateRandomCells() {
    for (let i = 0; i < numHorizontalCells; i++) {
      this.cells[i] = [];
      for (let j = 0; j < numHorizontalCells; j++) {
        const randomDirection = random(0, 360);
        this.cells[i][j] = { dir: randomDirection };
      }
    }
  }

  getGrid(): Cell[][] {
    return this.cells;
  }

  // function to draw the cells
  draw(): void {
    // get individual cell width and height
    const cellWidth = windowWidth / this.hor;
    const cellHeight = windowHeight / this.vert;
    const cellMin = min(cellWidth, cellHeight);

    for (let i = 0; i < this.hor; i++) {
      for (let j = 0; j < this.vert; j++) {
        const cell = this.cells[i][j];
        const locX = i * cellWidth;
        const locY = j * cellHeight;
        
        // rect(locX, locY, cellWidth, cellHeight);
        line(locX + cellWidth / 2,
          locY + cellHeight / 2,
          locX + cellWidth/2 * (1+Math.cos(cell.dir * (Math.PI/180))),
          locY + cellHeight/2 * (1+Math.sin(cell.dir * (Math.PI/180)))
        )
      }
    }
  }
}