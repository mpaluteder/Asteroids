const { PI } = Math;

export default {
    drawRectangle(
        canvasContext,
        { x, y, width, height, color, lineWidth },
        fillWithColor = false,
        fillWithGradient = false
    ) {
        canvasContext.beginPath();
        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = color;
        canvasContext.rect(x, y, width, height, color, lineWidth);
        canvasContext.stroke();
        if (fillWithColor) {
            canvasContext.fillStyle = color;
            canvasContext.fill();
        }
        else if (fillWithGradient) {
            let gradient = canvasContext.createLinearGradient(x + width, y + height, x, y + height);
            gradient.addColorStop(0, 'gray');
            gradient.addColorStop(1, color);
            canvasContext.fillStyle = gradient;
            canvasContext.fill();
        }
    },

    drawTriangle(canvasContext, { a, b, c, color, lineWidth }, fillWithColor = false) {
        canvasContext.beginPath();
        canvasContext.moveTo(a.x, a.y);
        canvasContext.lineTo(b.x, b.y);
        canvasContext.lineTo(c.x, c.y);
        canvasContext.closePath();
        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = color;
        canvasContext.stroke();

        if (fillWithColor) {
            canvasContext.fillStyle = color;
            canvasContext.fill();
        }
    },

    drawCircle(
        canvasContext,
        { x, y, radius, color = 'white', lineWidth = 2 },
        fillWithColor = false,
        fillWithGradient = false
    ) {
        canvasContext.beginPath();

        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = color;
        canvasContext.arc(x, y, radius, 0, 2 * PI);

        canvasContext.closePath();
        canvasContext.stroke();
        if (fillWithColor) {
            canvasContext.fillStyle = color;
            canvasContext.fill();
        }
        else if (fillWithGradient) {
            let gradient = canvasContext.createRadialGradient(x, y, radius / 3, x, y, radius);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'black');
            canvasContext.fillStyle = gradient;
            canvasContext.fill();
        }
    },

    drawText(
        canvasContext,
        text,
        position = {
            x: canvasContext.canvas.width / 2,
            y: canvasContext.canvas.height / 2,
        },
        font = '64px serif',
        color = 'red',
        rotate90Degrees = false
    ) {
        canvasContext.fillStyle = color;
        canvasContext.font = font;
        canvasContext.textAlign = 'center';

        if (rotate90Degrees) {
            canvasContext.save();
            //canvasContext.translate(0, 0);
            canvasContext.rotate(-Math.PI / 2);
            canvasContext.fillText(text, position.y * -1, position.x);
            canvasContext.restore();
        } else {
            canvasContext.fillText(text, position.x, position.y);
        }
    },

    drawShipDamageEffect(canvasContext, damagePosition) {
        this.drawText(canvasContext, 'ouch!', damagePosition, '32px serif');
    },

    drawGameOver(canvasContext) {
        this.drawText(canvasContext, 'Game over :(');
    },

    drawPause(canvasContext) {
        this.drawText(canvasContext, 'Pause!');
    },

    clear(canvasContext) {
        canvasContext.clearRect(0, 0, 1e9, 1e9);
    },
};
