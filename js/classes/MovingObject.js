import Canvas, {canvasWidth, canvasHeight} from 'utility/Canvas.js';
import Vec2 from 'classes/Vec2.js';

const DEFAULT_RADIUS = 10;
const DEFAULT_BORDER_WIDTH = 2;

export default class MovingObject {

    position;
    velocity;
    color;
    radius = DEFAULT_RADIUS;
    lineWidth = DEFAULT_BORDER_WIDTH;
    colors = [];

    constructor(initialPosition = new Vec2(), 
        initialVelocity = new Vec2(1, 1),
        initialColor = 'red',
        radius = DEFAULT_RADIUS,
    ) {
        this.position = initialPosition;
        this.velocity = initialVelocity;
        this.color = initialColor;
        this.radius = radius;
    }    

    move() {
        this.position.add(this.velocity);
    }

    draw() {
        Canvas.drawCircle( { 
            x: this.position.x, 
            y: this.position.y, 
            radius: this.radius, 
            color: this.color, 
            lineWidth: this.lineWidth});
    }

    outOfBounds() {
        if (this.outOfBoundsDirection() != '') {
            return true;
        }
        else {
            return false;
        }
    }

    outOfBoundsDirection() {
        const SPACING_FROM_BORDER = 0; //this.radius + this.lineWidth;

        if (this.position.y < SPACING_FROM_BORDER){
            return 'N';
        }
        else if (this.position.y > (canvasHeight - SPACING_FROM_BORDER)){
            return 'S';
        }
        else  if (this.position.x < SPACING_FROM_BORDER) {
            return 'W';
        }
        else if (this.position.x > (canvasWidth - SPACING_FROM_BORDER)) {
            return 'E';
        }    

        return '';
    }

    wrap() {
        let outOfBoundsDirection = this.outOfBoundsDirection();
        if (outOfBoundsDirection === '') {
            return;
        }         
        
        let positionX = this.position.x;
        let positionY = this.position.y;
        
        if (outOfBoundsDirection === 'N') {
            positionY = canvasHeight;
        }
        else if (outOfBoundsDirection === 'S') {
            positionY = 0;
        }
        else if (outOfBoundsDirection === 'W') {
            positionX = canvasWidth;
        }
        else if (outOfBoundsDirection === 'E') {
            positionX = 0;
        }

        this.position = new Vec2(positionX, positionY);

    }

    isCollidedWith(otherMovingObject) {
        if (this.position.distanceTo(otherMovingObject.position) <= this.radius + otherMovingObject.radius){
            return true;
        }
        else {
            return false;
        }
    }

    handleCollision2() {

    }
}