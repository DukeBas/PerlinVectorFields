var Grid = (function () {
    function Grid(numHorizontalCells, numVerticalCells) {
        this.hor = numHorizontalCells;
        this.vert = numVerticalCells;
        this.cells = [];
        this.timeSteps = 0;
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
                var direction = settings.noiseDifference * noise(i / 25, j / 25) * 360;
                this.cells[i][j] = { dir: direction };
            }
        }
    };
    Grid.prototype.noiseStep = function () {
        this.timeSteps++;
        for (var i = 0; i < this.hor; i++) {
            for (var j = 0; j < this.vert; j++) {
                var direction = settings.noiseDifference * noise(i / 25, j / 25, this.timeSteps / settings.noiseTimeResistance) * 360;
                this.cells[i][j] = { dir: direction };
            }
        }
    };
    Grid.prototype.getGrid = function () {
        return this.cells;
    };
    Grid.prototype.draw = function (state) {
        var cellWidth = width / this.hor;
        var cellHeight = height / this.vert;
        var cellMin = min(cellWidth, cellHeight);
        switch (state) {
            case "vector":
                for (var i = 0; i < this.hor; i++) {
                    for (var j = 0; j < this.vert; j++) {
                        var loc = createVector((i + 0.5) * cellWidth, (j + 0.5) * cellHeight);
                        var dir = p5.Vector.fromAngle(this.cells[i][j].dir * (Math.PI / 180));
                        dir.setMag(Math.min(cellWidth / 2, cellHeight / 2));
                        line(loc.x, loc.y, loc.x + dir.x, loc.y + dir.y);
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
            case "particles":
                push();
                stroke(255);
                strokeWeight(0.5);
                for (var i = 0; i < this.hor; i++) {
                    for (var j = 0; j < this.vert; j++) {
                        var loc = createVector((i + 0.5) * cellWidth, (j + 0.5) * cellHeight);
                        var dir = p5.Vector.fromAngle(this.cells[i][j].dir * (Math.PI / 180));
                        dir.setMag(Math.min(cellWidth / 2, cellHeight / 2));
                        line(loc.x, loc.y, loc.x + dir.x, loc.y + dir.y);
                    }
                }
                pop();
                break;
        }
    };
    Grid.prototype.getCellAt = function (i, j) {
        return this.cells[i][j];
    };
    return Grid;
}());
//# sourceMappingURL=TS/grid.js.map