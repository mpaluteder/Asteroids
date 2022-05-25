import Canvas from 'utility/Canvas.js';
import MovingObject from './MovingObject.js';
import Ship from './ship.js';

const MIN_ASTEROIDS = 10;

export default class Game {

    asteroids;
    ship;
    
    constructor(asteroidCount = MIN_ASTEROIDS) {
        this.asteroids = new Set();
        this.ship = new Ship();
    }

    move() {
        for (let asteroid of this.asteroids) {
            asteroid.move();
        }
        this.ship.move();
    }

    draw() {
        for (let asteroid of this.asteroids) {
            asteroid.draw();
        }
        this.ship.draw();
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
            this.asteroids.add(MovingObject.createFromEdge());
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