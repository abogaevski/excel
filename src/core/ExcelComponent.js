import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  // Возвращает шаблон компонента
  toHtml() {
    return ``;
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, ...args) {
    const unsub = this.emitter.subscribe(event, ...args);
    this.unsubscribers.push(unsub);
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
