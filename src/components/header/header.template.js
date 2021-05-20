import {defaultTableName} from '@/constants';

export function createHeader(state) {
  const name = state['tableName'] || defaultTableName;
  return `
      <input type="text" class="input" value="${name}">
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
