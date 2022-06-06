import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PlayComponent extends Component {
    @service('game') game;

    constructor() {
        super(...arguments);
    }
}
