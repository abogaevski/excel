import {Page} from '@core/Page';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/store/rootReducer';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {normalizeInitialState} from '@/store/initialState';
import {updateDate} from '@/store/actions';

function storageName(param) {
  return 'excel:' + param;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();

    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      console.log('AppState', state);
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);
    store.dispatch(updateDate(new Date().toJSON()));

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
