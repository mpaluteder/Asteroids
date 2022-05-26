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

    static createFromRandomEdge(maxVelocity = 10, easeInFromObjectOuterBorder = true) {
        const addedSpacing = easeInFromObjectOuterBorder ? 0 : DEFAULT_RADIUS + DEFAULT_BORDER_WIDTH;

        let lockXPlane = Math.random() < 0.5;
        let lockReverse = Math.random() < 0.5;

        const randomPosition = new Vec2(
            (lockXPlane ? (lockReverse ? addedSpacing : canvasWidth - addedSpacing) : Math.max(Math.floor(Math.random() * canvasWidth - addedSpacing), addedSpacing)),
            (!lockXPlane ? (lockReverse ? addedSpacing : canvasWidth - addedSpacing) : Math.max(Math.floor(Math.random() * canvasWidth - addedSpacing), addedSpacing)),
        );          
        
        let randomVelocity = new Vec2(
            Math.floor(Math.random() * maxVelocity + 1) * (Math.random() < 0.5 ? 1 : -1),
            Math.floor(Math.random() * maxVelocity + 1) * (Math.random() < 0.5 ? 1 : -1),
        );
        
        if (randomVelocity.x === 0 && randomVelocity.y === 0){
            randomVelocity = new Vec2(1, 1);
        }
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return new MovingObject(randomPosition, randomVelocity, randomColor);
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
}