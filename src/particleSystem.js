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
    };
    return Particle;
}());
function randX() {
    return random(0, windowWidth);
}
function randY() {
    return random(0, windowWidth);
}
//# sourceMappingURL=TS/particleSystem.js.map