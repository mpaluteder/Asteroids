import Component from '@glimmer/component';
//import Component from '@ember/component';
import Game from '../classes/Game';
import { inject as service } from '@ember/service';

export default class PlayComponent extends Component {
    @service game;

    constructor() {
        console.log(document.querySelector('canvas-stage'));
        //console.log(this.game.getScore());
        super(...arguments);
        //this.game = new Game();
    }
}
/*
export default class PlayComponent extends Component {

    @service game;

    constructor() {
        //console.log(this.game.getScore());
        super(...arguments);
        this.game = new Game();

    }

    didInsertElement() {
        let canvasContext = this.element.getElementsByClassName('canvas-stage')[0].getContext('2d');
        //let canvasContext = this.element.getElementByID('canvas-stage')[0].getContext('2d');
        this.game.canvasContext = canvasContext;
        this.game.start();
        console.log(this.game.score);
    }
}

*/
