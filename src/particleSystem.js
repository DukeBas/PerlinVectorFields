var Particle = (function () {
    function Particle(x, y) {
        this.pos = createVector(x, y);
        this.prev = createVector(x, y);
        this.vel = createVector(random(-settings.maxSpeed, settings.maxSpeed), random(-settings.maxSpeed, settings.maxSpeed));
    }
    Particle.prototype.accelerate = function (dir, strength, otherForces) {
        var acc = p5.Vector.fromAngle(dir * Math.PI / 180, strength);
        this.vel.add(acc);
        if (otherForces !== undefined) {
            this.vel.add(otherForces);
        }
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
            case "n-line":
                push();
                stroke(255, 20);
                strokeWeight(1);
                colorMode(HSL);
                var numberOfLines = Math.floor(this.particles.length / 2);
                for (var i = 0; i < numberOfLines; i += 1) {
                    if (settings.coloring) {
                        stroke(i * (360 / numberOfLines), 100, 50, 0.1);
                    }
                    var p1 = this.particles[2 * i];
                    var p2 = this.particles[2 * i + 1];
                    line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
                }
                pop();
                break;
            case "polygon":
                push();
                stroke(255, 20);
                strokeWeight(1);
                colorMode(HSL);
                for (var i = 0; i < this.particles.length; i += 1) {
                    if (settings.coloring) {
                        stroke(i * (360 / this.particles.length), 100, 50, 0.1);
                    }
                    var p1 = this.particles[i];
                    var p2 = this.particles[i + 1 == this.particles.length ? 0 : i + 1];
                    line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
                }
                pop();
                break;
        }
    };
    ParticleSystem.prototype.updatePositions = function (grid, state) {
        if (state != "polygon") {
            this.particles.forEach(function (p) {
                p.applySpeed();
                p.accelerate(getNearestDirection(p.getX(), p.getY(), grid), settings.fieldStrength);
            });
        }
        else {
            var vectorList = [];
            for (var i = 0; i < this.particles.length; i++) {
                var previousParticle = this.particles[i - 1 == -1 ? this.particles.length - 1 : i - 1];
                var thisParticle = this.particles[i];
                var nextParticle = this.particles[i + 1 == this.particles.length ? 0 : i + 1];
                var leftDistance = dist(previousParticle.getX(), previousParticle.getY(), thisParticle.getX(), thisParticle.getY());
                var leftDifference = leftDistance - settings.polygonSideLength;
                var leftVector = createVector(previousParticle.getX() - thisParticle.getX(), previousParticle.getY() - thisParticle.getY())
                    .setMag(leftDifference);
                var rightDistance = dist(thisParticle.getX(), thisParticle.getY(), nextParticle.getX(), nextParticle.getY());
                var rightDifference = rightDistance - settings.polygonSideLength;
                var rightVector = createVector(nextParticle.getX() - thisParticle.getX(), nextParticle.getY() - thisParticle.getY())
                    .setMag(rightDifference);
                leftVector.add(rightVector);
                leftVector.limit(settings.polygonStrength);
                vectorList[i] = leftVector.copy();
            }
            for (var i = 0; i < this.particles.length; i++) {
                var p = this.particles[i];
                p.applySpeed();
                p.accelerate(getNearestDirection(p.getX(), p.getY(), grid), settings.fieldStrength, vectorList[i]);
            }
        }
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