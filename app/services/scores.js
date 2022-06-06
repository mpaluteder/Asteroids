import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export default class ScoresService extends Service {
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
        console.log('scores service running');
        super(...arguments);
    }

    sortLastScore() {
        const HIGHSCORE_COUNT = this.highScores.length;
        for (let i = 1; i < HIGHSCORE_COUNT; i++) {
            if (
                this.highScores[HIGHSCORE_COUNT - i].score >
                this.highScores[HIGHSCORE_COUNT - i - 1].score
            ) {
                //swap
                [
                    this.highScores[HIGHSCORE_COUNT - i],
                    this.highScores[HIGHSCORE_COUNT - i - 1],
                ] = [
                    this.highScores[HIGHSCORE_COUNT - i - 1],
                    this.highScores[HIGHSCORE_COUNT - i],
                ];
            } else {
                return;
            }
        }
    }

    recordNewScore(score, player, time = new Date().toLocaleString('ja-JP')) {
        this.highScores.push({
            name: player,
            score: score,
            time: time,
        });
        console.log('Scores service recorded new score for ' + player);
        this.sortLastScore();
    }
}
