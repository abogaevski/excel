import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHtml() {
    return `
      <div class="info">fx</div>
      <div
        id="formula"
        class="input"
        contenteditable="true"
        spellcheck="false">
      </div>
    `;
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text());
    });
    this.$on('table:input', ($cell) => {
      this.$formula.text($cell.text());
    });
  }

  onInput(e) {
    this.$emit('formula:input', $(e.target).text());
  }

  onKeydown(event) {
    const {key} = event;
    const keys = ['Enter', 'Tab'];
    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}

