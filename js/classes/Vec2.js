export default class Vec2 {
    constructor ( x = 0, y = 0 ) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x = this.x + vector.x,
        this.y = this.y + vector.y;
    }

    magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    distanceTo(otherVector){
        return Math.sqrt(
            (otherVector.x - this.x)**2 +
            (otherVector.y - this.y)**2);
    }
}