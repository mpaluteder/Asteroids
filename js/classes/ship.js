import Canvas from 'utility/Canvas.js';
import Vec2 from 'classes/Vec2.js';
import MovingObject from './MovingObject.js';
import key from 'keymaster';


export default class Ship extends MovingObject {
    
    max_velocity = 10;
    acceleration_modifier = 0.1;
    stopping_modifier = 0.1;
    turning_speed = Math.PI / 50;
    direction;

    constructor() {
        super(new Vec2(500, 500),
            new Vec2(),
            'white');
        this.direction = -Math.PI / 2;
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

    currentVelocity() {
        return Math.abs(this.velocity.x) + Math.abs(this.velocity.y);
    }

    getAcceleration() {
        if (key.isPressed('w')){
            return new Vec2(
                this.acceleration_modifier * Math.cos(this.direction),
                this.acceleration_modifier * Math.sin(this.direction)
            );
        }
        else { 
            let velocityX = this.velocity.x;
            let velocityY = this.velocity.y;
            if (velocityX > 0) {
                velocityX = 1;
            }
            else if (velocityY > 0) {
                velocityY = 1;
            }
            return new Vec2(
                velocityX * (-1) * this.stopping_modifier, 
                velocityY * (-1) * this.stopping_modifier);
        }
    }


    move() {
        if (key.isPressed('a')){
            this.direction -= 0.1;            
        }
        else if (key.isPressed('d')){
            this.direction += 0.1;
        }

        const acceleration = this.getAcceleration();        
        this.velocity.add(acceleration);        
        this.position.add(this.velocity);
        

        this.wrap();
        
    }
}