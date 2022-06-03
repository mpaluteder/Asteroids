const { PI } = Math;

export default {
    drawCircle(
        canvasContext,
        { x, y, radius, color = 'white', lineWidth = 2 }
    ) {
        canvasContext.beginPath();

        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = color;
        canvasContext.arc(x, y, radius, 0, 2 * PI);

        canvasContext.closePath();
        canvasContext.stroke();
    },

    drawText(
        canvasContext,
        text,
        position = {
            x: canvasContext.canvas.width / 2,
            y: canvasContext.canvas.height / 2,
        },
        font = '64px serif',
        color = 'red'
    ) {
        canvasContext.fillStyle = color;
        canvasContext.font = font;
        canvasContext.textAlign = 'center';
        canvasContext.fillText(text, position.x, position.y);
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
