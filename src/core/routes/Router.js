import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided');
    }
    this.$placeholder = $(selector);
    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    console.log(ActiveRoute.path);
    console.log('Params', ActiveRoute.param);
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
