import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class PlayerNameComponent extends Component {
    @service('game') game;
    newPlayerName = 'Bruce Willis';

    constructor() {
        console.log('Player name input');
        super(...arguments);
    }

    @action
    changeName(element) {
        console.log('changeName: ' + this.newPlayerName + element.target.value);
        this.game.game.player = element.target.value;
    }

    @action
    startGame() {
        this.game.started = true;
    }
}
