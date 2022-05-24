import Canvas, {canvasWidth, canvasHeight} from '/js/utility/Canvas.js';

export default class MovingObject {

    position;
    velocity;
    radius = 10;
    lineWidth = 2;

    constructor(initialPosition = {x: 0, y: 0}, 
                initialVelocity = {x: 1, y: 1,},
                ) {
        this.position = initialPosition;
        this.velocity = initialVelocity;
    }

    static createRandom(maxVelocity = 10) {
        const randomPosition = {
            x: Math.floor(Math.random() * canvasWidth),
            y: Math.floor(Math.random() * canvasHeight),
        };        
        console.log(randomPosition);
        const randomVelocity = {
            x: Math.floor(Math.random() * maxVelocity),
            y: Math.floor(Math.random() * maxVelocity),
        }
        return new MovingObject(randomPosition, randomVelocity);
    }

    move() {
        this.position = {
            x: this.position.x + this.velocity.x, 
            y: this.position.y + this.velocity.y,
        }        
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