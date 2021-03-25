import { action, configure, observable, runInAction } from 'mobx';
import { getCategories, getCategoryLink } from '../service/category';

// 必须走action
configure({
  enforceActions: 'always',
});

export class CategoryStore {
  @observable tabs = {
    list: [],
    active: '',
    loading: false,
  };
  @observable links = {
    list: [],
    loading: false,
  };
  @action async getCategories() {
    // 获取数据
    this.tabs.loading = true;
    const list = await getCategories();
    runInAction(() => {
      this.tabs.list = list;
      this.tabs.active = list.length ? list[0].id : '';
      this.tabs.loading = false;
    });
  }
  @action selectCategory(id) {
    // 选中标签
    this.tabs.active = id;
    // 请求数据
    this.getCategoryLink(id);
  }
  @action async getCategoryLink(id) {
    // 获取数据
    this.links.list = [];
    this.links.loading = true;
    const links = await getCategoryLink(id);
    // 打乱顺序
    for (let i = 0; i < links.length >> 1; i++) {
      let j = Math.floor(Math.random() * 3) + 3;
      // 交换
      [links[i], links[j]] = [links[j], links[i]];
    }
    runInAction(() => {
      this.links.list = links;
      this.links.loading = false;
    });
  }
}

const store = new CategoryStore();
export default store;
