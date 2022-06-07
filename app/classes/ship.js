import Canvas from './utility/Canvas';
import Vec2 from './Vec2';
import MovingObject from './MovingObject';
import key from 'keymaster';
import { tracked } from '@glimmer/tracking';

export default class Ship extends MovingObject {
    SHIP_NAME = 'BUG 2';
    BULLET_RADIUS = 5;
    SHIP_WIDTH = 50;
    SHIP_HEIGHT = 150;

    acceleration_modifier = 0.1;
    stopping_modifier = 0.1;
    min_bullet_velocity = 10;
    turning_speed = Math.PI / 50;
    direction = 0;
    @tracked health = 3;
    immunity = 0;
    boosters_active = false;

    constructor(canvasContext) {
        const CANVAS_WIDTH = canvasContext.canvas.width;
        const CANVAS_HEIGHT = canvasContext.canvas.height;
        super(
            canvasContext,
            new Vec2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2),
            new Vec2(),
            'white',
            50
        );
        this.direction = -Math.PI / 2;
        console.log('ship constructed');
    }

    draw(tickNumber = 0) {
        this.canvasContext.save();
        const TRANSLATE_X = this.position.x + this.SHIP_WIDTH / 2;
        const TRANSLATE_Y = this.position.y - 20;
        this.canvasContext.translate(TRANSLATE_X, TRANSLATE_Y);
        this.canvasContext.rotate(this.direction + Math.PI / 2);
        this.canvasContext.translate(-TRANSLATE_X, -TRANSLATE_Y);

        //head
        let triangleAttributes = {
            a: { x: this.position.x, y: this.position.y },
            b: { x: this.position.x + this.SHIP_WIDTH, y: this.position.y },
            c: {
                x: this.position.x + this.SHIP_WIDTH / 2,
                y: this.position.y - 20,
            },
            color: this.color,
            lineWidth: this.lineWidth,
        };
        Canvas.drawTriangle(this.canvasContext, triangleAttributes);

        let rectangleAttributes = {
            x: this.position.x,
            y: this.position.y,
            width: this.SHIP_WIDTH,
            height: this.SHIP_HEIGHT,
            color: this.color,
            lineWidth: this.lineWidth,
        };

        //body
        const fillBody =
            this.immunity <= 0
                ? true
                : Math.floor(tickNumber / 10) % 2 === 0
                ? true
                : false;
        Canvas.drawRectangle(
            this.canvasContext,
            rectangleAttributes,
            false,
            fillBody
        );
        Canvas.drawText(
            this.canvasContext,
            this.SHIP_NAME,
            {
                x: this.position.x + this.SHIP_WIDTH / 2,
                y: this.position.y + this.SHIP_HEIGHT / 2,
            },
            ' 32px serif',
            'orange',
            true
        );

        //boosters
        rectangleAttributes.y += rectangleAttributes.height;
        rectangleAttributes.width = this.SHIP_WIDTH / 5;
        rectangleAttributes.height = this.SHIP_HEIGHT / 10;
        rectangleAttributes.color = 'gray';
        Canvas.drawRectangle(this.canvasContext, rectangleAttributes, true);

        rectangleAttributes.x += this.SHIP_WIDTH - rectangleAttributes.width;
        Canvas.drawRectangle(this.canvasContext, rectangleAttributes, true);

        if (this.boosters_active) {
            let triangleAttributes = {
                a: {
                    x: this.position.x,
                    y:
                        this.position.y +
                        this.SHIP_HEIGHT +
                        rectangleAttributes.height +
                        5,
                },
                b: {
                    x: this.position.x + rectangleAttributes.width,
                    y:
                        this.position.y +
                        this.SHIP_HEIGHT +
                        rectangleAttributes.height +
                        5,
                },
                c: {
                    x: this.position.x + rectangleAttributes.width / 2,
                    y: this.position.y + this.SHIP_HEIGHT + 40,
                },
                color: 'rgba(255, 51, 0, 0.3)',
                lineWidth: this.lineWidth,
            };
            Canvas.drawTriangle(this.canvasContext, triangleAttributes, true);
            triangleAttributes.a.x +=
                this.SHIP_WIDTH - rectangleAttributes.width;
            triangleAttributes.b.x +=
                this.SHIP_WIDTH - rectangleAttributes.width;
            triangleAttributes.c.x +=
                this.SHIP_WIDTH - rectangleAttributes.width;
            Canvas.drawTriangle(this.canvasContext, triangleAttributes, true);
            this.boosters_active = false;
        }

        //cannons
        let circleAttributes = {
            x: this.position.x + this.SHIP_WIDTH,
            y: this.position.y,
            radius: 10,
            color: 'blue',
            lineWidth: 1,
        };
        Canvas.drawCircle(this.canvasContext, circleAttributes, false, true);
        circleAttributes.x = this.position.x;
        circleAttributes.color = 'red';
        Canvas.drawCircle(this.canvasContext, circleAttributes, false, true);

        this.canvasContext.restore();
    }

    currentVelocity() {
        return Math.abs(this.velocity.x) + Math.abs(this.velocity.y);
    }

    getAcceleration() {
        if (key.isPressed('w')) {
            this.boosters_active = true;
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
        const LEFT_BULLET_POSITION = new Vec2(this.position.x, this.position.y);

        let bulletVelocity = new Vec2(
            this.velocity.x +
                this.min_bullet_velocity * Math.cos(this.direction),
            this.velocity.y +
                this.min_bullet_velocity * Math.sin(this.direction)
        );
        const LEFT_BULLET = new MovingObject(
            this.canvasContext,
            LEFT_BULLET_POSITION,
            bulletVelocity,
            'red',
            this.BULLET_RADIUS
        );

        const RIGHT_BULLET_POSITION = new Vec2(
            this.position.x + this.SHIP_WIDTH,
            this.position.y
        );
        const RIGHT_BULLET = new MovingObject(
            this.canvasContext,
            RIGHT_BULLET_POSITION,
            bulletVelocity,
            'blue',
            this.BULLET_RADIUS
        );

        return [LEFT_BULLET, RIGHT_BULLET];
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
