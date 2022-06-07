import Canvas from './utility/Canvas';
import Ship from './ship';
import key from 'keymaster';
import Asteroid, {
    DEFAULT_RADIUS as ASTEROID_DEFAULT_RADIUS,
} from './Asteroid';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class Game {
    @service scores;
    @service game;

    running = false;
    player = 'Bruce Willis';
    max_asteroids;
    asteroids;
    @tracked ship;
    bullets;
    CANVAS_WIDTH = 1000;
    CANVAS_HEIGHT = 1000;
    canvasContext;
    @tracked score = 0;
    tickNumber = 0;

    constructor(canvasContext = undefined, asteroidCount = 10) {
        this.canvasContext = canvasContext;
        this.max_asteroids = asteroidCount;
        this.asteroids = new Set();
        this.bullets = new Set();
        this.bindHandlers();
    }

    bindHandlers() {
        if (key.isPressed('space')) {
            for (let bullet of this.ship.shoot()) {
                this.bullets.add(bullet);
            }
        }
        if (key.isPressed('escape')) {
            console.log('Pause' + !this.running);
            this.running = false;
            Canvas.drawPause(this.canvasContext);
        }
    }

    move() {
        for (let asteroid of this.asteroids) {
            asteroid.move();
        }
        this.ship.move(this.canvasContext);

        for (let bullet of this.bullets) {
            bullet.move();
        }
    }

    draw() {
        for (let asteroid of this.asteroids) {
            asteroid.draw();
        }
        this.ship.draw(this.tickNumber);
        for (let bullet of this.bullets) {
            bullet.draw();
        }
    }

    removeOutOfBounds() {
        for (let asteroid of this.asteroids) {
            if (asteroid.outOfBounds()) {
                this.asteroids.delete(asteroid);
            }
        }

        for (let bullet of this.bullets) {
            if (bullet.outOfBounds()) {
                this.bullets.delete(bullet);
            }
        }
    }

    repopulateAsteroids() {
        for (let i = this.asteroids.size; i < this.max_asteroids; i++) {
            this.asteroids.add(
                Asteroid.createFromRandomEdge(
                    this.canvasContext,
                    3,
                    true,
                    ASTEROID_DEFAULT_RADIUS + Math.floor(this.tickNumber / 10)
                )
            );
        }
    }

    handleShipCollision(collisionPosition) {
        if (this.ship.immunity > 0) {
            return;
        }
        this.ship.health--;
        console.log('Collision! Remaining health: ' + this.ship.health);

        Canvas.drawShipDamageEffect(this.canvasContext, collisionPosition);
        if (this.ship.health <= 0) {
            Canvas.drawGameOver(this.canvasContext);
            this.stop();
        }
        this.ship.immunity = 100;
    }

    handleCollisions(collidingObject, collideToObject, collisionType) {
        if (collisionType === 'asteroid-bullet') {
            this.score += collidingObject.generation;
            this.bullets.delete(collideToObject);
        } else if (collisionType === 'asteroid-ship') {
            this.asteroids.delete(collidingObject);
            this.handleShipCollision(collideToObject.position);
        }
        for (let newAsteroid of collidingObject.handleCollision()) {
            this.asteroids.add(newAsteroid);
        }
        this.asteroids.delete(collidingObject);
    }

    checkCollisions() {
        this.ship.immunity--;
        for (let asteroid of this.asteroids) {
            for (let bullet of this.bullets) {
                //asteroid-bullet
                if (bullet.isCollidedWith(asteroid)) {
                    this.handleCollisions(asteroid, bullet, 'asteroid-bullet');
                }
            }
            //asteroid-ship
            if (this.ship.isCollidedWith(asteroid)) {
                this.handleCollisions(asteroid, this.ship, 'asteroid-ship');
            }
        }

        //asteroid-asteroid
        if (this.tickNumber % 10 === 0) {
            //console.log(this.asteroids.size);
            const ASTEROIDS_ARRAY = Array.from(this.asteroids);
            for (let i = 0; i < ASTEROIDS_ARRAY.length; i++) {
                let asteroid = ASTEROIDS_ARRAY[i];
                for (let j = i + 1; j < ASTEROIDS_ARRAY.length; j++) {
                    let otherAsteroid = ASTEROIDS_ARRAY[j];
                    if (asteroid.isCollidedWith(otherAsteroid)) {
                        this.handleCollisions(
                            asteroid,
                            otherAsteroid,
                            'asteroid-asteroid'
                        );
                    }
                }
            }
        }
    }

    async tick() {
        this.tickNumber++;
        if (!this.running) {
            return true;
        }

        Canvas.clear(this.canvasContext);
        this.move();
        this.draw();
        this.removeOutOfBounds();
        this.repopulateAsteroids();
        this.bindHandlers();
        this.checkCollisions();
        requestAnimationFrame(this.tick.bind(this));
    }

    async start() {
        if (!this.canvasContext) {
            console.error(
                'Game canvas is not defined: "' +
                    this.canvasContext +
                    '", fix before continuing!'
            );
            return false;
        }
        this.canvasContext.canvas.width = this.CANVAS_WIDTH;
        this.canvasContext.canvas.height = this.CANVAS_HEIGHT;

        this.score = 0;
        this.ship = new Ship(this.canvasContext);
        this.running = true;
        return new Promise(() => {
            this.tick();
        });
    }

    stop() {
        this.running = false;
        //this.recordScore();
    }

    resume() {
        this.running = true;
    }

    recordScore() {
        this.scores.recordScore(this.score, this.player);
    }
}
