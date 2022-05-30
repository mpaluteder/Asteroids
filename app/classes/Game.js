import Canvas from './utility/Canvas';
import Ship from './ship';
import key from 'keymaster';
import Asteroid from './Asteroid';

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
      this.asteroids.add(Asteroid.createFromRandomEdge(3));
    }
  }

  handleShipCollision(collisionPosition) {
    if (this.ship.immunity > 0) {
      return;
    }
    this.ship.health--;
    console.log('Collision! Remaining health: ' + this.ship.health);

    Canvas.drawShipDamageEffect(collisionPosition);
    if (this.ship.health <= 0) {
      Canvas.drawGameOver();
      this.stop();
    }
    this.ship.immunity = 100;
  }

  handleCollisions(collidingObject, collideToObject, collisionType) {
    if (collisionType === 'asteroid-bullet') {
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
  }

  tick() {
    if (!this.running) {
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

  stop() {
    this.running = false;
  }
}
