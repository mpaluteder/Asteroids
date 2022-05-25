import Canvas from 'utility/Canvas.js';
import MovingObject from './MovingObject.js';

export default class Ship extends MovingObject {
    
    direction;

    constructor() {
        super({x: 500, y: 500},
            {x: 0, y: 0},
            'white');
        this.direction = Math.PI / 180 * 90;
        this.radius = 50;
        console.log('ship constructed');
    }

    draw() {
        Canvas.drawCircle( { 
            x: this.position.x, 
            y: this.position.y, 
            radius: this.radius, 
            color: this.color, 
            lineWidth: this.lineWidth
        });
        Canvas.drawCircle( { 
            x: this.position.x + this.radius, 
            y: this.position.y, 
            radius: 20, 
            color: 'blue', 
            lineWidth: this.lineWidth
        });
    }
}