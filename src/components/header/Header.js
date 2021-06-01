import {ExcelComponent} from '@core/ExcelComponent';
import {defaultTitle} from '@/constants';
import {$} from '@core/dom';
import {changeTitle} from '@/store/actions';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      subscribe: ['tableName'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHtml() {
    console.log(ActiveRoute.path);
    const title = this.$getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}">
      <div class="buttons">
        <button data-action="remove" class="button">
          <i data-action="remove" class="material-icons">
            delete
          </i>
        </button>
        <button data-action="exit" class="button">
          <i data-action="exit" class="material-icons">
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

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.action === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.action === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
