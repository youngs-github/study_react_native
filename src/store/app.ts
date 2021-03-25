import {action, configure, observable, runInAction} from 'mobx';
import {register, login, getSearchInfo, getSearchList} from './../service';

// 必须走action
configure({
  enforceActions: 'always',
});

export class AppStore {
  /**
   * 用户信息
   */
  @observable auth: null | {
    user: {name: string; address: string};
    token: string;
  } = null;
  @action async register(form) {
    // 注册
    const {user, token} = await register(form);
    runInAction(() => {
      this.auth.user = user;
      this.auth.token = token;
    });
  }
  @action async login(form) {
    // 登录
    const {user, token} = await login(form);
    runInAction(() => {
      this.auth = {
        user,
        token,
      };
    });
  }

  /**
   * 搜索状态
   */
  @observable search = {
    // 类型: 默认0, 焦点1, 结果2
    type: 0,
    // 当前结果
    list: [],
    // 热门搜索
    hots: [],
    // 搜索历史
    history: [],
    loading: false,
  };
  @action setSearchType(type = 0) {
    this.search.type = type;
  }
  @action async getSearchBase() {
    // 请求基础数据
    this.search.loading = true;
    const {history, hot} = await getSearchInfo();
    runInAction(() => {
      this.search.hots = hot || [];
      this.search.history = history || [];
      this.search.loading = false;
    });
  }
  @action addSearchHistory(name) {
    // 添加搜索历史
    this.search.history.push({
      id: Math.random().toString(36).slice(2),
      name: name,
    });
  }
  @action async getSearchList(text) {
    // 查询关键字数据
    this.search.loading = true;
    const list = await getSearchList(text);
    // 手动进行过滤
    let curr = [];
    let right = list.length - 1;
    for (let i = 0; i < 10; i++) {
      let index = Math.floor(Math.random() * (right + 1));
      curr.push(list[index]);
      // 交换
      list[index] = list[right--];
    }
    runInAction(() => {
      this.search.list = curr;
      this.search.loading = false;
    });
  }
}

const store = new AppStore();

export default store;
