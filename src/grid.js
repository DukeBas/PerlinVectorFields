var Grid = (function () {
    function Grid(numHorizontalCells, numVerticalCells) {
        this.hor = numHorizontalCells;
        this.vert = numVerticalCells;
        this.cells = [];
        for (var i = 0; i < numHorizontalCells; i++) {
            this.cells[i] = [];
        }
        this.generateNoisedCells();
    }
    Grid.prototype.generateRandomCells = function () {
        for (var i = 0; i < this.hor; i++) {
            this.cells[i] = [];
            for (var j = 0; j < this.vert; j++) {
                var direction = random(0, 360);
                this.cells[i][j] = { dir: direction };
            }
        }
    };
    Grid.prototype.generateNoisedCells = function () {
        for (var i = 0; i < this.hor; i++) {
            this.cells[i] = [];
            for (var j = 0; j < this.vert; j++) {
                var direction = noise(i / 25, j / 25) * 360;
                this.cells[i][j] = { dir: direction };
            }
        }
    };
    Grid.prototype.noiseStep = function () {
        for (var i = 0; i < this.hor; i++) {
            for (var j = 0; j < this.vert; j++) {
                var direction = noise(i / 25, j / 25, frameCount / 50) * 360;
                this.cells[i][j] = { dir: direction };
            }
        }
    };
    Grid.prototype.getGrid = function () {
        return this.cells;
    };
    Grid.prototype.draw = function (state) {
        var cellWidth = windowWidth / this.hor;
        var cellHeight = windowHeight / this.vert;
        var cellMin = min(cellWidth, cellHeight);
        this.noiseStep();
        switch (state) {
            case "vector":
                for (var i = 0; i < this.hor; i++) {
                    for (var j = 0; j < this.vert; j++) {
                        var cell = this.cells[i][j];
                        var locX = i * cellWidth;
                        var locY = j * cellHeight;
                        line(locX + cellWidth / 2, locY + cellHeight / 2, locX + cellWidth / 2 * (1 + Math.cos(cell.dir * (Math.PI / 180))), locY + cellHeight / 2 * (1 + Math.sin(cell.dir * (Math.PI / 180))));
                    }
                }
                break;
            case "heatmap":
                for (var i = 0; i < this.hor; i++) {
                    for (var j = 0; j < this.vert; j++) {
                        var cell = this.cells[i][j];
                        var locX = i * cellWidth;
                        var locY = j * cellHeight;
                        push();
                        fill(map(cell.dir, 0, 360, 0, 255));
                        rect(locX, locY, cellWidth, cellHeight);
                        pop();
                    }
                }
                break;
        }
    };
    return Grid;
}());
//# sourceMappingURL=TS/grid.js.map