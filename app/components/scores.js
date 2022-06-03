import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PlayComponent extends Component {
    @service scores;

    constructor() {
        super(...arguments);
        console.log('scores!');
    }
}
