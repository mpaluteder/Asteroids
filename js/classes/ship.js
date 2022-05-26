import Canvas from 'utility/Canvas.js';
import MovingObject from './MovingObject.js';
import key from 'keymaster';

const NULL_VECTOR = {x: 0, y: 0};
const RADIAN_HELPER = (180 / Math.PI);

export default class Ship extends MovingObject {
    
    max_velocity = 10;
    min_turning_angle = 0;
    max_turning_angle = 2 * Math.PI;
    turning_speed = Math.PI / 50;
    direction;

    constructor() {
        super({x: 500, y: 500},
              {x: 0, y: 0},
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
            return {
                x: 0.1 * Math.cos(this.direction),
                y: 0.1 * Math.sin(this.direction)
            };
        }
        else { 
            return NULL_VECTOR;
        }
    }


    move() {
        /*
        if (key.isPressed('w')){
            this.position = {
                x: this.position.x + this.velocity.x, 
                y: this.position.y + this.velocity.y,
            }; 
            console.log(this.getAcceleration());
            const acceleration = this.getAcceleration();
            this.velocity = {
                x: this.velocity.x + acceleration.x,
                y: this.velocity.y + acceleration.y
            };
        }
        else*/ if (key.isPressed('a')){
            this.direction -= 0.1;            
        }
        else if (key.isPressed('d')){
            this.direction += 0.1;
        }

        const acceleration = this.getAcceleration();
        this.velocity = {
            x: this.velocity.x + acceleration.x,
            y: this.velocity.y + acceleration.y
        };
        this.position = {
            x: this.position.x + this.velocity.x, 
            y: this.position.y + this.velocity.y,
        }; 

        console.log(this.position);
        console.log(this.direction);
/*
        if (this.direction > this.max_turning_angle){
            this.direction = this.max_turning_angle;
        }
        else if (this.direction < this.min_turning_angle) {
            this.direction = this.min_turning_angle;
        }
        console.log(this.direction);
        */
        
    }
}