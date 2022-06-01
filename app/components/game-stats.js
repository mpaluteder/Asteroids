import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default class GameStatsComponent extends Component {
    @service('game') game;
    get myGame() {
        return getOwner(this).lookup('service:game');
    }
    score = 0;

    constructor() {
        //console.log(document.querySelector('canvas-stage'));

        super(...arguments);
        this.score = this.game.getScore();
    }
}
