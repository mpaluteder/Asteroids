import Canvas from 'utility/Canvas.js';
import MovingObject from './MovingObject.js';
import Ship from './ship.js';

export default class Game {

    max_asteroids;
    asteroids;
    ship;
    
    constructor(asteroidCount = 10) {
        this.max_asteroids = asteroidCount;
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
        for(let i = this.asteroids.size; i < this.max_asteroids; i++){
            this.asteroids.add(MovingObject.createFromRandomEdge());
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