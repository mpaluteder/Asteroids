import Canvas from './utility/Canvas';
import Vec2 from './Vec2';
import MovingObject from './MovingObject';
import key from 'keymaster';

export default class Ship extends MovingObject {
  BULLET_RADIUS = 5;

  max_velocity = 10;
  acceleration_modifier = 0.1;
  stopping_modifier = 0.1;
  min_bullet_velocity = 10;
  turning_speed = Math.PI / 50;
  direction;
  health = 3;
  immunity = 0;

  constructor() {
    super(new Vec2(500, 500), new Vec2(), 'white', 50);
    this.direction = -Math.PI / 2;
    console.log('ship constructed');
  }

  draw() {
    Canvas.drawCircle({
      x: this.position.x,
      y: this.position.y,
      radius: this.radius,
      color: this.color,
      lineWidth: this.lineWidth,
    });
    Canvas.drawCircle({
      x: this.position.x + this.radius,
      y: this.position.y,
      radius: 20,
      color: 'blue',
      lineWidth: this.lineWidth,
    });
  }

  currentVelocity() {
    return Math.abs(this.velocity.x) + Math.abs(this.velocity.y);
  }

  getAcceleration() {
    if (key.isPressed('w')) {
      return new Vec2(
        this.acceleration_modifier * Math.cos(this.direction),
        this.acceleration_modifier * Math.sin(this.direction)
      );
    } else {
      let velocityX = this.velocity.x;
      let velocityY = this.velocity.y;
      if (velocityX > 0) {
        velocityX = 1;
      } else if (velocityY > 0) {
        velocityY = 1;
      }
      return new Vec2(
        velocityX * -1 * this.stopping_modifier,
        velocityY * -1 * this.stopping_modifier
      );
    }
  }

  shoot() {
    let bulletInitialPosition = new Vec2(
      this.position.x + this.radius,
      this.position.y
    );

    let bulletVelocity = new Vec2(
      this.velocity.x + this.min_bullet_velocity * Math.cos(this.direction),
      this.velocity.y + this.min_bullet_velocity * Math.sin(this.direction)
    );

    return new MovingObject(
      bulletInitialPosition,
      bulletVelocity,
      'red',
      this.BULLET_RADIUS
    );
  }

  move() {
    if (key.isPressed('a')) {
      this.direction -= 0.1;
    } else if (key.isPressed('d')) {
      this.direction += 0.1;
    }

    const acceleration = this.getAcceleration();
    this.velocity.add(acceleration);
    this.position.add(this.velocity);

    this.wrap();
  }
}
