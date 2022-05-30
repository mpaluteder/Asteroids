import { createApp } from 'vue/dist/vue.esm-bundler.js';
import Game from 'classes/Game.js';

export default class gameUI {
  app;
  game;

  constructor() {
    this.game = new Game();
    this.game.start();

    this.app = createApp(
      {
        props: ['game'],
        data() {
          return {
            myGame: this.game,
          };
        },
        computed: {
          restart() {
            this.game.stop();
          },
          //getGame(): return{ this.game}
        },
      },
      this
    ).mount('#interface');
  }
}
