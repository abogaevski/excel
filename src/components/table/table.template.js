import {toInlineStyles} from '@core/utils';

const CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}
function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}
function createRow(state, content, index = '') {
  const height = getHeight(state, index);
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  return `
      <div 
          class="row"
          data-type="resizable"
          data-row="${index}"
          style="height: ${height}"
      >
        <div class="row-info">
            ${index}
            ${resize}
        </div>
      <div class="row-data">${content}</div>
   </div> 
  `;
}

function toCol({column, index, width}) {
  return `
      <div
        class="column"
        data-type="resizable"
        data-col="${index}"
        style="width: ${width}"  
      >
            ${column}
            <div class="col-resize" data-resize="col"></div>
      </div>
  `;
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const text = state.dataState[id] || '';
    const styles = toInlineStyles(state.stylesState[id]);
    return `
      <div 
        class="cell"
        contenteditable="true"
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        style="${styles}; width: ${width}"
      >
      ${text}
      </div>
    `;
  };
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function toColWidthFrom(state) {
  return function(column, index) {
    return {
      column, index, width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColWidthFrom(state))
      .map(toCol)
      .join('');
  rows.push(createRow({}, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(state.rowState, cells, row + 1));
  }

  return rows.join('');
}
