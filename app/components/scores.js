import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PlayComponent extends Component {
    @service game;

    constructor() {
        super(...arguments);
        console.log('scores!');
    }
}
