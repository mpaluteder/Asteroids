import Canvas from 'utility/Canvas.js';
import MovingObject from './MovingObject.js';
import Ship from './ship.js';
import key from 'keymaster';

export default class Game {

    running;
    max_asteroids;
    asteroids;
    ship;
    bullets;
    
    constructor(asteroidCount = 10) {
        this.max_asteroids = asteroidCount;
        this.asteroids = new Set();
        this.ship = new Ship();
        this.bullets = new Set();
        this.bindHandlers();
    }

    bindHandlers() {
        if (key.isPressed('space')) {
            this.bullets.add(this.ship.shoot());
        }
    }

    move() {
        for (let asteroid of this.asteroids) {
            asteroid.move();
        }
        this.ship.move();
        
        for (let bullet of this.bullets) {
            bullet.move();
        }
    }

    draw() {
        for (let asteroid of this.asteroids) {
            asteroid.draw();
        }
        this.ship.draw();
        for (let bullet of this.bullets){
            bullet.draw();
        }
    }

    removeOutOfBounds(){
        for (let asteroid of this.asteroids) {
            if (asteroid.outOfBounds()){
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
        for(let i = this.asteroids.size; i < this.max_asteroids; i++){
            this.asteroids.add(MovingObject.createFromRandomEdge());
        }
    }

    handleShipCollision(collisionPosition) {
        if (this.ship.immunity > 0){
            return;
        }

        console.log('Collision!');
        this.ship.health--;
        console.log(this.ship.health);

        Canvas.drawShipDamageEffect(collisionPosition);
        if (this.ship.health <= 0){
            Canvas.drawGameOver();
            this.stop();
        }
        this.ship.immunity = 100;
    }

    checkCollisions(){
    
        this.ship.immunity--;
        for (let asteroid of this.asteroids){
            for (let bullet of this.bullets){
                //asteroid-bullet
                if (bullet.isCollidedWith(asteroid)){
                    this.bullets.delete(bullet);
                    this.asteroids.delete(asteroid);
                }                            
            }
            //asteroid-ship
            if (this.ship.isCollidedWith(asteroid)){
                this.handleShipCollision(asteroid.position);
                this.asteroids.delete(asteroid);
            }
        }

    }

    tick() {
        if (!this.running){
            return;
        }

        Canvas.clear();        
        this.move();
        this.draw();
        this.removeOutOfBounds();
        this.repopulateAsteroids();
        this.bindHandlers();
        this.checkCollisions();
        requestAnimationFrame(this.tick.bind(this));
    }

    start() {
        this.running = true;
        this.tick();
    }

    stop(){
        this.running = false;
    }
    
}