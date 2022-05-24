import Canvas from '../utility/Canvas.js';
import MovingObject from './MovingObject.js';

export default class Game {

    asteroids;
    
    constructor(asteroidCount = 10) {
        this.asteroids = [];

        for (let i = 0; i < asteroidCount; i++) {
            this.asteroids.push(MovingObject.createRandom());
        }
    }

    move() {
        for (let asteroid of this.asteroids) {
            asteroid.move();
        }
    }

    draw() {
        for (let asteroid of this.asteroids) {
            asteroid.draw();
        }

    }

    tick() {
        Canvas.clear();
        this.move();
        this.draw();
        requestAnimationFrame(this.tick.bind(this));
    }

    start() {
        this.tick();
    }
    
}