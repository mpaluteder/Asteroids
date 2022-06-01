import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class GameStatsComponent extends Component {
    @service('game') game;

    constructor() {
        //console.log(document.querySelector('canvas-stage'));
        super(...arguments);
    }
}
