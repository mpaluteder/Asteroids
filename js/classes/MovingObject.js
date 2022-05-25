import Canvas, {canvasWidth, canvasHeight} from 'utility/Canvas.js';

const DEFAULT_RADIUS = 10;
const DEFAULT_BORDER_WIDTH = 2;

export default class MovingObject {

    position;
    velocity;
    color;
    radius = DEFAULT_RADIUS;
    lineWidth = DEFAULT_BORDER_WIDTH;
    colors = [];

    constructor(initialPosition = {x: 0, y: 0}, 
        initialVelocity = {x: 1, y: 1},
        initialColor = 'red',
    ) {
        this.position = initialPosition;
        this.velocity = initialVelocity;
        this.color = initialColor;
    }

    static createRandom(maxVelocity = 10) {
        const addedSpacing = DEFAULT_RADIUS + DEFAULT_BORDER_WIDTH;
        const randomPosition = {
            x: Math.max(Math.floor(Math.random() * canvasWidth - addedSpacing), addedSpacing),
            y: Math.max(Math.floor(Math.random() * canvasHeight - addedSpacing), addedSpacing),
        };          
        //console.log(randomPosition);
        const randomVelocity = {
            x: Math.floor(Math.random() * maxVelocity),
            y: Math.floor(Math.random() * maxVelocity),
        };
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return new MovingObject(randomPosition, randomVelocity, randomColor);
    }

    static createFromEdge(maxVelocity = 10) {
        const addedSpacing = 0; // DEFAULT_RADIUS + DEFAULT_BORDER_WIDTH;
        let lockXPlane = Math.random() < 0.5;
        let lockReverse = Math.random() < 0.5;
        const randomPosition = {
            x: (lockXPlane ? (lockReverse ? addedSpacing : canvasWidth - addedSpacing) : Math.max(Math.floor(Math.random() * canvasWidth - addedSpacing), addedSpacing)),
            y: (!lockXPlane ? (lockReverse ? addedSpacing : canvasWidth - addedSpacing) : Math.max(Math.floor(Math.random() * canvasWidth - addedSpacing), addedSpacing)),
        };          
        //console.log(randomPosition);
        let randomVelocity = {
            x: Math.floor(Math.random() * maxVelocity) * (Math.random() < 0.5 ? 1 : -1),
            y: Math.floor(Math.random() * maxVelocity) * (Math.random() < 0.5 ? 1 : -1),
        };
        //console.log(randomVelocity);
        if (randomVelocity.x === 0 && randomVelocity.y === 0){
            randomVelocity = {x: 1, y: 1};
        }
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return new MovingObject(randomPosition, randomVelocity, randomColor);
    }

    move() {
        this.position = {
            x: this.position.x + this.velocity.x, 
            y: this.position.y + this.velocity.y,
        };        
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
        const SPACING_FROM_BORDER = 0; //this.radius + this.lineWidth;
        if (this.position.x < SPACING_FROM_BORDER || this.position.x > (canvasWidth - SPACING_FROM_BORDER)) {
            return true;
        }
        else if (this.position.y < SPACING_FROM_BORDER || this.position.y > (canvasHeight - SPACING_FROM_BORDER)){
            return true;
        }
        else {
            return false;
        }
    }
}