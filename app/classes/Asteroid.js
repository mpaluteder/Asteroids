import Vec2 from './Vec2';
import MovingObject from './MovingObject';

export const DEFAULT_RADIUS = 10;
const DEFAULT_BORDER_WIDTH = 2;

export default class Asteroid extends MovingObject {
    generation;

    constructor(
        canvasContext,
        position = new Vec2(),
        velocity = new Vec2(),
        color = 'white',
        radius = 10,
        generation = 1
    ) {
        super(canvasContext, position, velocity, color, radius, false, true);
        this.generation = generation;
    }

    handleCollision() {
        if (this.generation >= 3) {
            return [];
        }

        const newRadius = this.radius / (this.generation + 1);
        const newGen = this.generation + 1;
        const asteroid1 = new Asteroid(
            this.canvasContext,
            new Vec2(this.position.x, this.position.y),
            new Vec2(this.velocity.x * -1, this.velocity.y),
            this.color,
            newRadius,
            newGen
        );
        const asteroid2 = new Asteroid(
            this.canvasContext,
            new Vec2(this.position.x, this.position.y),
            new Vec2(this.velocity.x * -1, this.velocity.y * -1),
            this.color,
            newRadius,
            newGen
        );
        const asteroid3 = new Asteroid(
            this.canvasContext,
            new Vec2(this.position.x, this.position.y),
            new Vec2(this.velocity.x, this.velocity.y * -1),
            this.color,
            newRadius,
            newGen
        );

        return [asteroid1, asteroid2, asteroid3];
    }

    static createFromRandomEdge(
        canvasContext,
        maxVelocity = 10,
        easeInFromObjectOuterBorder = true,
        asteroid_size = DEFAULT_RADIUS
    ) {
        const CANVAS_WIDTH = canvasContext.canvas.width;
        const CANVAS_HEIGHT = canvasContext.canvas.height;
        const addedSpacing = easeInFromObjectOuterBorder
            ? 0
            : asteroid_size + DEFAULT_BORDER_WIDTH;

        let lockXPlane = Math.random() < 0.5;
        let lockReverse = Math.random() < 0.5;

        const randomPosition = new Vec2(
            lockXPlane
                ? lockReverse
                    ? addedSpacing
                    : CANVAS_WIDTH - addedSpacing
                : Math.max(
                      Math.floor(Math.random() * CANVAS_WIDTH - addedSpacing),
                      addedSpacing
                  ),
            !lockXPlane
                ? lockReverse
                    ? addedSpacing
                    : CANVAS_HEIGHT - addedSpacing
                : Math.max(
                      Math.floor(Math.random() * CANVAS_HEIGHT - addedSpacing),
                      addedSpacing
                  )
        );

        let randomVelocity = new Vec2(
            Math.floor(Math.random() * maxVelocity + 1) * (lockXPlane ? 1 : -1),
            Math.floor(Math.random() * maxVelocity + 1) * (lockReverse ? 1 : -1)
        );

        if (randomVelocity.x === 0 && randomVelocity.y === 0) {
            randomVelocity = new Vec2(1, 1);
        }
        const randomColor =
            '#' + Math.floor(Math.random() * 16777215).toString(16);

        let asteroid = new Asteroid(
            canvasContext,
            randomPosition,
            randomVelocity,
            randomColor,
            asteroid_size,
            1
        );
        //asteroid.fillWithColor = true;
        //asteroid.fillWithGradient = true;
        return asteroid;
    }
}
