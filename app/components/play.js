import Component from '@ember/component';
import Game from '../classes/Game';

export default class PlayComponent extends Component {

    game;

    constructor() {
        super(...arguments);
    }

    didInsertElement() {
        let canvasContext = this.element.getElementsByClassName('canvas-stage')[0].getContext('2d');
        this.game = new Game(canvasContext);
        this.game.start();    
    }
    

}
