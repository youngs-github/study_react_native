import { createContext, useContext } from 'react';

import appStore, { AppStore } from './app';
import homeStore, { HomeStore } from './home';
import categoryStore, { CategoryStore } from './category';

// 类型
type Store = {
  appStore: AppStore;
  homeStore: HomeStore;
  categoryStore: CategoryStore;
};

export type TStore = Partial<Store>;

// 统一
const store = {
  appStore,
  homeStore,
  categoryStore,
};

// hooks
const context = createContext(store);
export const useStore = () => useContext<Store>(context);

export default store;
