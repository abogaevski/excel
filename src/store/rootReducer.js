import {TABLE_RESIZE} from './types';

export function rootReducer(state, action) {
  let resizeState;
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      resizeState = state[field] || {};
      resizeState[action.data.id] = action.data.value;

      return {...state, [field]: resizeState};
    default: return state;
  }
}
