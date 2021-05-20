import {createHeader} from '@/components/header/header.template';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import * as actions from '@/store/actions';

export class Header extends ExcelStateComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['focusout'],
      subscribe: ['tableName'],
      ...options,
    });
  }

  get template() {
    return createHeader(this.state);
  }

  prepare() {
    this.initState(this.$getState());
  }

  storeChanged(changes) {
    this.setState(changes);
  }

  toHtml() {
    return this.template;
  }

  onFocusout(event) {
    const value = event.target.value;
    this.$dispatch(actions.changeTableName({
      value,
    }));
  }
}
