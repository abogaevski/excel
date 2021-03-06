import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector,
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/store/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHtml() {
    return createTable(20, this.$getState());
  }

  prepare() {
    this.selection = new TableSelection(this.$root);

    this.$on('formula:input', (value) => {
      this.selection.current.attr('data-value', value);
      this.selection.current.text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  updateTextInStore(text) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value: text,
    }));
  }

  onKeydown(event) {
    const {key} = event;
    const $current = this.selection.current.id(true);
    const keys = [
      'Tab', 'Enter', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
    ];
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const $next = this.$root.find(nextSelector(key, $current));
      if ($next) this.selectCell($next);
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);

    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }
}

