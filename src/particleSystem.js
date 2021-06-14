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
        circle(this.x, this.y, 100);
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
        this.particles.forEach(function (p) {
            p.draw(state);
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