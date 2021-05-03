const CODES = {
  A: 65,
  Z: 90,
};

function createRow(content, index = '') {
  const resize = index ? `<div class="row-resize"></div>` : '';
  return `
    <div class="row">
        <div class="row-info">
            ${index}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
   </div>
  `;
}

function toCol(column) {
  return `
      <div class="column">${column}
            <div class="col-resize"></div>
      </div>
  `;
}

function createCell(cell) {
  return `<div class="cell" contenteditable="true">${cell}</div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toCol)
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
