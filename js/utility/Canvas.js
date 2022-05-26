import Vec2 from 'classes/Vec2.js';

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

    drawShipDamageEffect(damagePosition) {
        context.fillStyle = 'red';
        //context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.font = '32px serif';
        context.textAlign = 'center';
        context.fillText('Ouch!', damagePosition.x, damagePosition.y);
    },

    drawGameOver(){
        context.font = '64px serif';
        context.textAlign = 'center';
        context.fillText('Game over :(', canvasWidth / 2, canvasHeight / 3);
    },

    clear() {
        context.clearRect(0, 0, 1e9, 1e9);
    }
};