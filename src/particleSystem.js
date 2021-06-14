var Particle = (function () {
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
    }
    Particle.prototype.setSpeed = function (dx, dy) {
        this.dx = dx;
        this.dy = dy;
    };
    Particle.prototype.increaseSpeed = function (ddx, ddy) {
        this.dx += ddx;
        this.dy += ddy;
    };
    Particle.prototype.applySpeed = function () {
        this.x += this.dx;
        this.y += this.dy;
    };
    Particle.prototype.draw = function (state) {
        push();
        stroke(255);
        strokeWeight(5);
        point(this.x, this.y);
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
    ParticleSystem.prototype.updatePositions = function () {
        this.particles.forEach(function (p) {
            p.applySpeed();
        });
    };
    return ParticleSystem;
}());
function randX() {
    return random(windowWidth);
}
function randY() {
    return random(windowHeight);
}
//# sourceMappingURL=TS/particleSystem.js.map