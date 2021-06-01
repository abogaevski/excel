import {storage} from '@core/utils';

function toHtml(key) {
  const model = storage(key);
  const href = key.split(':').join('/');
  const date = `
    ${new Date(model.lastOpened).toLocaleDateString()} 
    ${new Date(model.lastOpened).toLocaleTimeString()}`;
  return `
      <li class="db__record">
          <a href="#${href}">${model.title}</a>
          <strong>${date}</strong>
      </li>
  `;
}

function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys.sort();
}

export function createDashboardTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>У вас пока нет ни одной таблицы</p>`;
  }

  return `
      <div class="db__list-header">
          <span>Название</span>
          <span>Дата открытия</span>
      </div>

      <ul class="db__list">
        ${keys.map(toHtml).join('')}
      </ul>
  `;
}
