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

    drawShipDamageEffect(canvasContext, damagePosition) {
        canvasContext.fillStyle = 'red';
        canvasContext.font = '32px serif';
        canvasContext.textAlign = 'center';
        canvasContext.fillText('Ouch!', damagePosition.x, damagePosition.y);
    },

    drawGameOver(canvasContext) {
        canvasContext.font = '64px serif';
        canvasContext.textAlign = 'center';
        canvasContext.fillText(
            'Game over :(',
            canvasContext.canvas.width / 2,
            canvasContext.canvas.height / 2
        );
    },

    clear(canvasContext) {
        canvasContext.clearRect(0, 0, 1e9, 1e9);
    },
};
