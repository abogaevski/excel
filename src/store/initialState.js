import {storage} from '@core/utils';
import {defaultStyles, defaultTableName} from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  tableName: defaultTableName,
  currentStyles: defaultStyles,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;
