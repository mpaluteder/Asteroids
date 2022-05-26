import Canvas, {canvasWidth, canvasHeight} from 'utility/Canvas.js';
import Vec2 from './Vec2.js';
import MovingObject from './MovingObject.js';

const DEFAULT_RADIUS = 10;
const DEFAULT_BORDER_WIDTH = 2;

export default class Asteroid extends MovingObject{

    generation;

    constructor(position = new Vec2(), 
        velocity = new Vec2(),
        color = 'white',
        radius = 10,
        generation = 1,                
    ){
        super(position, velocity, color, radius);

        this.generation = generation;
    }

    handleCollision() {
        if (this.generation >= 3) {
            return [];
        }

        const newRadius = this.radius / (this.generation + 1);
        const newGen = this.generation + 1;
        const asteroid1 = new Asteroid(new Vec2(this.position.x, this.position.y), new Vec2(this.velocity.x * (-1), this.velocity.y), this.color, newRadius, newGen);
        const asteroid2 = new Asteroid(new Vec2(this.position.x, this.position.y), new Vec2(this.velocity.x * (-1), this.velocity.y * (-1)), this.color, newRadius, newGen);
        const asteroid3 = new Asteroid(new Vec2(this.position.x, this.position.y), new Vec2(this.velocity.x, this.velocity.y * (-1)), this.color, newRadius, newGen);

        return [asteroid1, asteroid2, asteroid3];

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
            Math.floor(Math.random() * maxVelocity + 1) * (lockXPlane  ? 1 : -1),
            Math.floor(Math.random() * maxVelocity + 1) * (lockReverse ? 1 : -1),
        );
        
        if (randomVelocity.x === 0 && randomVelocity.y === 0){
            randomVelocity = new Vec2(1, 1);
        }
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return new Asteroid(randomPosition, randomVelocity, randomColor, DEFAULT_RADIUS, 1);
    }

}