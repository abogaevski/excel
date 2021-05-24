import {ExcelComponent} from '@core/ExcelComponent';
import {defaultTitle} from '@/constants';
import {$} from '@core/dom';
import {changeTitle} from '@/store/actions';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['tableName'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHtml() {
    const title = this.$getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}">
      <div class="buttons">
        <button class="button">
          <i class="material-icons">
            delete
          </i>
        </button>
        <button class="button">
          <i class="material-icons">
            exit_to_app
          </i>
        </button>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
