import EmberRouter from '@ember/routing/router';
import config from 'asteroids/config/environment';

export default class Router extends EmberRouter {
    location = config.locationType;
    rootURL = config.rootURL;
}

Router.map(function () {
    this.route('play');
    this.route('scores');
});
