export default class Vec2 {
    constructor ( x = 0, y = 0 ) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x = this.x + vector.x,
        this.y = this.y + vector.y;
    }
}