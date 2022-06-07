import Canvas from './utility/Canvas';
import Vec2 from './Vec2';

const DEFAULT_RADIUS = 10;
const DEFAULT_BORDER_WIDTH = 2;

export default class MovingObject {
    canvasContext;
    position;
    velocity;
    color;
    fillWithColor = false;
    fillWithGradient = false;
    radius = DEFAULT_RADIUS;
    lineWidth = DEFAULT_BORDER_WIDTH;
    colors = [];

    constructor(
        canvasContext,
        initialPosition = new Vec2(),
        initialVelocity = new Vec2(1, 1),
        initialColor = 'red',
        radius = DEFAULT_RADIUS,
        fillWithColor = false,
        fillWithGradient = false
    ) {
        this.canvasContext = canvasContext;
        this.position = initialPosition;
        this.velocity = initialVelocity;
        this.color = initialColor;
        this.radius = radius;
        this.fillWithColor = fillWithColor;
        this.fillWithGradient = fillWithGradient;
    }

    move() {
        this.position.add(this.velocity);
    }

    draw() {
        Canvas.drawCircle(
            this.canvasContext,
            {
                x: this.position.x,
                y: this.position.y,
                radius: this.radius,
                color: this.color,
                lineWidth: 1,
            },
            this.fillWithColor,
            this.fillWithGradient
        );
    }

    outOfBounds() {
        if (this.outOfBoundsDirection() != '') {
            return true;
        } else {
            return false;
        }
    }

    outOfBoundsDirection() {
        const SPACING_FROM_BORDER = 0;

        if (this.position.y < SPACING_FROM_BORDER) {
            return 'N';
        } else if (
            this.position.y >
            this.canvasContext.canvas.height - SPACING_FROM_BORDER
        ) {
            return 'S';
        } else if (this.position.x < SPACING_FROM_BORDER) {
            return 'W';
        } else if (
            this.position.x >
            this.canvasContext.canvas.width - SPACING_FROM_BORDER
        ) {
            return 'E';
        }

        return '';
    }

    wrap() {
        let outOfBoundsDirection = this.outOfBoundsDirection();
        if (outOfBoundsDirection === '') {
            return;
        }

        let positionX = this.position.x;
        let positionY = this.position.y;

        if (outOfBoundsDirection === 'N') {
            positionY = this.canvasContext.canvas.height;
        } else if (outOfBoundsDirection === 'S') {
            positionY = 0;
        } else if (outOfBoundsDirection === 'W') {
            positionX = this.canvasContext.canvas.width;
        } else if (outOfBoundsDirection === 'E') {
            positionX = 0;
        }

        this.position = new Vec2(positionX, positionY);
    }

    isCollidedWith(otherMovingObject) {
        if (
            this.position.distanceTo(otherMovingObject.position) <=
            this.radius + otherMovingObject.radius
        ) {
            return true;
        } else {
            return false;
        }
    }
}
