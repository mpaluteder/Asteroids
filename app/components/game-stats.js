import Component from '@glimmer/component';
//import Component from '@ember/component';
import Game from '../classes/Game';
import { inject as service } from '@ember/service';

export default class GameStatsComponent extends Component {
    @service game;
    health = 0;
    score = 0;

    constructor() {
        console.log(document.querySelector('canvas-stage'));
        
        super(...arguments);
        console.log('s=' + this.game.getScore());
        //this.game = new Game();
    }

    myScore() {
        return new Date();
    }


}