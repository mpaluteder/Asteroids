import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Game from '../classes/Game';

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export default class GameService extends Service {
    @tracked game;
    @tracked roundBeginTime;
    @tracked highScores = [
        {
            name: 'You',
            score: 2500,
            time: new Date(
                new Date() - DAY_IN_MILLISECONDS / 61
            ).toLocaleString('ja-JP'),
        },
        {
            name: 'The other you',
            score: 2000,
            time: new Date(
                new Date() - DAY_IN_MILLISECONDS * 1.001
            ).toLocaleString('ja-JP'),
        },
        {
            name: 'Also you',
            score: 1000,
            time: new Date(
                new Date() - DAY_IN_MILLISECONDS * Math.PI
            ).toLocaleString('ja-JP'),
        },
        {
            name: 'AAA',
            score: 500,
            time: new Date(
                new Date() - DAY_IN_MILLISECONDS / 8.9
            ).toLocaleString('ja-JP'),
        },
    ];

    constructor() {
        console.log('Initializing game service...');
        super(...arguments);

        this.game = new Game();
        this.roundBeginTime = new Date();
    }

    setCanvasContext(canvasContext) {
        this.game.canvasContext = canvasContext;
    }

    recordScore() {
        let myScore = 111; //this.game.score;
        if (myScore > 0) {
            this.highScores.push({
                name: 'test',
                score: myScore,
                time: new Date().toLocaleString('ja-JP'),
            });
        }
    }

    startGame() {
        this.recordScore();
        this.game.start();
        return true;
    }
}
