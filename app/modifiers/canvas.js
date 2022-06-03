import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';

export default class CanvasModifier extends Modifier {
    @service game;
    @service scores;

    reset() {
        console.log('resetme');
        this.game.game.recordScore();
        this.game.score = 0;
        this.game.game.running = false;
    }

    recordScore() {
        let myScore = this.game.game.score;
        if (myScore > 0) {
            this.scores.recordNewScore(myScore, this.player);
            console.log('recorded score for ' + this.game.game.player + this.scores.highScores.length);
        }
    };

    async modify(element, [event, handler]) {
        //this.recordScore();
        const CANVAS_CONTEXT = element.getContext('2d');
        this.game.setCanvasContext(CANVAS_CONTEXT);
        console.log('canvas modifier!');
        console.log(this.scores.highScores);

        await this.game.game.start();
        console.log('canvas modify end');

        registerDestructor(this, this.reset);
    }
}
