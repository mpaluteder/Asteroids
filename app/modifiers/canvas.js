import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';

export default class CanvasModifier extends Modifier {
    @service game;

    modify(element) {
        const CANVAS_CONTEXT = element.getContext('2d');
        this.game.setCanvasContext(CANVAS_CONTEXT);
        console.log('canvas?');

        this.game.startGame();
    }
}
