import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Game from '../classes/Game';

export default class GameService extends Service {
    @tracked game;
    @tracked roundBeginTime;
    @tracked started = true;

    constructor() {
        console.log('Initializing game service...');
        super(...arguments);

        this.game = new Game();
        this.running = this.game.running;
        this.roundBeginTime = new Date();
    }

    setCanvasContext(canvasContext) {
        this.game.canvasContext = canvasContext;
    }

    recordScore() {
        let myScore = this.game.score;
        if (myScore > 0) {
            this.highScores.push({
                name: this.game.player,
                score: myScore,
                time: new Date().toLocaleString('ja-JP'),
            });
        }
        //console.log('recorded score for ' + this.game.player + this.scores.highScores);
    }

    async startGame() {
        //const CANVAS = this.game.canvasContext;
        //this.game = new Game();
        //this.game.canvasContext = CANVAS;
        //this.game.start();
    }
}
