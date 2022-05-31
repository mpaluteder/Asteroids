import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Game from '../classes/Game';

export default class GameService extends Service {
    @tracked game;

    constructor() {
        console.log('Initializing game service...');
        super(...arguments);

        this.game = new Game();
    }

    getScore() {
        return this.game.score;
    }

    setCanvasContext(canvasContext) {
        this.game.canvasContext = canvasContext;
    }

    startGame() {
        this.game.start();
        return true;
    }
}
