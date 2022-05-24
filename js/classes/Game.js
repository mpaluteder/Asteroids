import Canvas from '../utility/Canvas.js';
import MovingObject from './MovingObject.js';

const MIN_ASTEROIDS = 10;

export default class Game {

    asteroids;
    
    constructor(asteroidCount = MIN_ASTEROIDS) {
        this.asteroids = new Set();
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

    removeOutOfBounds(){
        for (let asteroid of this.asteroids) {
            if (asteroid.outOfBounds()){
                this.asteroids.delete(asteroid);                        
            }
        }
    }

    repopulateAsteroids() {
        for(let i = this.asteroids.size; i < MIN_ASTEROIDS; i++){
            this.asteroids.add(MovingObject.createRandom());
        }
    }

    tick() {
        Canvas.clear();        
        this.move();
        this.draw();
        this.removeOutOfBounds();
        this.repopulateAsteroids();
        requestAnimationFrame(this.tick.bind(this));
    }

    start() {
        this.tick();
    }
    
}