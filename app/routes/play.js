import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
//import Game from '../classes/Game';

export default class PlayRoute extends Route {
    @service game;

    model() {
        console.log('Play route model:' + this.game.started);
    }
}
