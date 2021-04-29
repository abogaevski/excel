import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  toHtml() {
    return '<h1>Table</h1>';
  }
}
