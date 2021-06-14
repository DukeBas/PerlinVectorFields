
class Particle {
    x: number;  // x part of location coordinate
    y: number;  // y part of location coordinate
    dx: number; // x component of speed
    dy: number; // y component of speed
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
    }

    setSpeed(dx: number, dy: number): void {
        this.dx = dx;
        this.dy = dy;
    }

    increaseSpeed(ddx: number, ddy: number): void {
        this.dx += ddx;
        this.dy += ddy;
    }

    // adds x and y speed values to x and y location values
    applySpeed(): void {
        this.x += this.dx;
        this.y += this.dy;
    }

    // draws particle on screen
    draw(state: State): void {

    }
}

// generates a random (x) value between 0 and the screen width (in pixels)
function randX(): number {
    return random(0, windowWidth);
}

// generates a random (y) value between 0 and the screen height (in pixels)
function randY(): number {
    return random(0, windowWidth);
}
