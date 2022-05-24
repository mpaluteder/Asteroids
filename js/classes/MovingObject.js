import Canvas from '/js/utility/Canvas.js';

export default class MovingObject {

    position;
    velocity;
    radius = 10;
    lineWidth = 2;

    constructor() {
        this.position = {x: 0, y: 0,};
        this.velocity = {x: 1, y: 1,};
    }

    move() {
        this.position = {x: this.position.x + this.velocity.x, y: this.position.y + this.velocity.y,}        
    }

    draw() {
        Canvas.drawCircle( { 
            x: this.position.x, 
            y: this.position.y, 
            radius: this.radius, 
            color: 'red', 
            lineWidth: this.lineWidth,});
    }
}