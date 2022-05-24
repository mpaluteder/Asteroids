const canvas = document.getElementById('canvas-stage');
const context = canvas.getContext('2d');

export const canvasWidth = 1000;
export const canvasHeight = 1000;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const { PI } = Math;

export default {
    drawCircle( { x, y, radius, color = 'white', lineWidth = 2 }) {
        context.beginPath();

        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.arc(x, y, radius, 0, 2 * PI);

        context.closePath();
        context.stroke();
    },

    clear() {
        context.clearRect(0, 0, 1e9, 1e9);
    }
};