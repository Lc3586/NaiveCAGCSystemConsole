import { modules } from './modules';
import { createStore, createLogger } from 'vuex';

const { DEV } = import.meta.env;

export interface State {
  [key: string]: any;
}

const store = createStore<State>({
  modules,
  strict: true,
  plugins: DEV ? [createLogger()] : [],
});

export default store;
