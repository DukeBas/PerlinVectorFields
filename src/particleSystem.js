var Particle = (function () {
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.prevX = x;
        this.prevY = y;
    }
    Particle.prototype.setSpeed = function (dx, dy) {
        this.dx = dx;
        this.dy = dy;
    };
    Particle.prototype.accelerate = function (dir) {
        this.dx += Math.cos(dir * (Math.PI / 180)) * settings.fieldStrength;
        this.dy += Math.sin(dir * (Math.PI / 180)) * settings.fieldStrength;
    };
    Particle.prototype.applySpeed = function () {
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += this.dx;
        this.y += this.dy;
        if (this.x > width) {
            this.x = 0.5;
            this.prevX = 0.5;
        }
        if (this.x < 0) {
            this.x = width - 0.5;
            this.prevX = width - 0.5;
        }
        if (this.y > height) {
            this.y = 0.5;
            this.prevY = 0.5;
        }
        if (this.y < 0) {
            this.y = height - 0.5;
            this.prevY = height - 0.5;
        }
    };
    Particle.prototype.draw = function (state) {
        push();
        stroke(255, 100);
        strokeWeight(5);
        line(this.prevX, this.prevY, this.x, this.y);
        pop();
    };
    return Particle;
}());
var ParticleSystem = (function () {
    function ParticleSystem(numberOfParticles) {
        this.particles = [];
        for (var i = 0; i < numberOfParticles; i++) {
            var p = new Particle(randX(), randY());
            this.particles.push(p);
        }
    }
    ParticleSystem.prototype.draw = function (state) {
        switch (state) {
            case "particles":
                this.particles.forEach(function (p) {
                    p.draw(state);
                });
                break;
        }
    };
    ParticleSystem.prototype.updatePositions = function (grid) {
        this.particles.forEach(function (p) {
            p.applySpeed();
            p.accelerate(getNearestDirection(p.x, p.y, grid));
        });
    };
    return ParticleSystem;
}());
function getNearestDirection(x, y, grid) {
    var cellWidth = width / settings.numHorizontalCells;
    var cellHeight = height / settings.numVerticalCells;
    var i = Math.floor(x / cellWidth);
    var j = Math.floor(y / cellHeight);
    return grid.getCellAt(i, j).dir;
}
function randX() {
    return random(width);
}
function randY() {
    return random(height);
}
//# sourceMappingURL=TS/particleSystem.js.map