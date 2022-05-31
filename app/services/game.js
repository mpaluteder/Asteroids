import Service from '@ember/service';
//import Game from '../classes/Game';

export default class GameService extends Service {
    game;

    constructor() {
        console.log('game service');
        super(...arguments);
        /*
    this.game = new Game();
    this.game.start();
    */
    }
}
