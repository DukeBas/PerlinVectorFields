var Particle = (function () {
    function Particle(x, y) {
        this;
        this.x = x;
        this.y = y;
        this.dx = random(-10, 10);
        this.dy = random(-10, 10);
        this.prevX = x;
        this.prevY = y;
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
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += this.dx;
        this.y += this.dy;
        if (this.x > width) {
            this.x = 0;
            this.prevX = 0;
        }
        if (this.x < 0) {
            this.x = width;
            this.prevX = width;
        }
        if (this.y > height) {
            this.y = 0;
            this.prevY = 0;
        }
        if (this.y < 0) {
            this.y = height;
            this.prevY = height;
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
    ParticleSystem.prototype.updatePositions = function () {
        this.particles.forEach(function (p) {
            p.applySpeed();
        });
    };
    return ParticleSystem;
}());
function randX() {
    return random(width);
}
function randY() {
    return random(height);
}
//# sourceMappingURL=TS/particleSystem.js.map