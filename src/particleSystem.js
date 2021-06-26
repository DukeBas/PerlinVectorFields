var Particle = (function () {
    function Particle(x, y) {
        this.pos = createVector(x, y);
        this.prev = createVector(x, y);
        this.vel = createVector(0, 0);
    }
    Particle.prototype.accelerate = function (dir, strength) {
        var acc = p5.Vector.fromAngle(dir * Math.PI / 180);
        acc.setMag(strength);
        this.vel.add(acc);
        this.vel.limit(settings.maxSpeed);
    };
    Particle.prototype.applySpeed = function () {
        this.prev = this.pos.copy();
        this.pos.add(this.vel);
        if (this.pos.x > width) {
            this.pos.x = 0.5;
            this.prev.x = 0.5;
        }
        if (this.pos.x < 0) {
            this.pos.x = width - 0.5;
            this.prev.x = width - 0.5;
        }
        if (this.pos.y > height) {
            this.pos.y = 0.5;
            this.prev.y = 0.5;
        }
        if (this.pos.y < 0) {
            this.pos.y = height - 0.5;
            this.prev.y = height - 0.5;
        }
    };
    Particle.prototype.draw = function (state) {
        line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
    };
    Particle.prototype.getX = function () {
        return this.pos.x;
    };
    Particle.prototype.getY = function () {
        return this.pos.y;
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
                push();
                stroke(255, 100);
                strokeWeight(5);
                this.particles.forEach(function (p) {
                    p.draw(state);
                });
                pop();
                break;
            case "trails":
                push();
                stroke(255, 100);
                strokeWeight(2);
                this.particles.forEach(function (p) {
                    p.draw(state);
                });
                pop();
                break;
            case "strands":
                push();
                stroke(255, 2);
                strokeWeight(1);
                this.particles.forEach(function (p) {
                    p.draw(state);
                });
                pop();
                break;
            case "tri-line":
                push();
                stroke(255, 20);
                strokeWeight(1);
                for (var i = 0; i < 6; i += 2) {
                    var p1 = this.particles[i];
                    var p2 = this.particles[i + 1];
                    line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
                }
                pop();
                break;
        }
    };
    ParticleSystem.prototype.updatePositions = function (grid) {
        this.particles.forEach(function (p) {
            p.applySpeed();
            p.accelerate(getNearestDirection(p.getX(), p.getY(), grid), settings.fieldStrength);
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