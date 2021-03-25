import { action, configure, observable, runInAction } from 'mobx';
import { getMoreKills, getRefFloor, getSecKills, getHotProduct, getQuickNav } from './../service/home';

// 必须走action
configure({
  enforceActions: 'always',
});

export class HomeStore {
  /**
   * 回顶点
   */
  @observable backtop = false;
  @action setBacktop(backtop) {
    this.backtop = backtop;
  }

  /**
   * 滚动距离
   */
  @observable scrollTop = 0;
  @action setScrollTop(scrollTop) {
    this.scrollTop = scrollTop;
  }

  /**
   * 下拉刷新
   */
  @observable refreshing = false;
  @action async getRefreshing() {
    // 刷新数据
    this.refreshing = true;
    await Promise.all([this.getTopProduct(), this.getSecKills(), this.getMoreKills()]);
    runInAction(() => {
      this.refreshing = false;
    });
  }

  /**
   * 顶部推荐
   */
  @observable topProduct = {
    list: [],
    loading: false,
  };
  @action async getTopProduct() {
    // 请求数据
    this.topProduct.loading = true;
    const hots = await getHotProduct();
    // 打乱顺序
    for (let i = 0; i < 3; i++) {
      let j = Math.floor(Math.random() * 3) + 3;
      // 交换
      [hots[i], hots[j]] = [hots[j], hots[i]];
    }
    runInAction(() => {
      this.topProduct.list = hots;
      this.topProduct.loading = false;
    });
  }

  /**
   * 快速导航
   */
  @observable quickNavs = {
    list: [],
    loading: false,
  };
  @action async getQuickNav() {
    // 请求数据
    this.quickNavs.loading = true;
    const navs = await getQuickNav();
    runInAction(() => {
      this.quickNavs.list = navs;
      this.quickNavs.loading = false;
    });
  }

  /**
   * 秒杀商品
   */
  @observable secKills = {
    list: [],
    time: {
      text: '',
      stamp: 0,
    },
    loading: false,
  };
  @action async getSecKills() {
    // 请求数据
    this.secKills.loading = true;
    const secs = await getSecKills();
    // 打乱顺序
    for (let i = 0; i < 3; i++) {
      let j = Math.floor(Math.random() * 3) + 3;
      // 交换
      [secs.list[i], secs.list[j]] = [secs.list[j], secs.list[i]];
    }
    runInAction(() => {
      this.secKills.list = secs.list;
      this.secKills.time = secs.time;
      this.secKills.loading = false;
    });
  }

  /**
   * 更多秒杀
   */
  @observable moreKills = {
    span_2: [],
    span_4: [],
    loading: false,
  };
  @action async getMoreKills() {
    // 请求数据
    this.moreKills.loading = true;
    const more = await getMoreKills();
    // 打乱顺序
    for (let i = 0; i < 1; i++) {
      let j = Math.floor(Math.random() * 1) + 1;
      // 交换
      [more.span_2[i], more.span_2[j]] = [more.span_2[j], more.span_2[i]];
    }
    for (let i = 0; i < 2; i++) {
      let j = Math.floor(Math.random() * 2) + 2;
      // 交换
      [more.span_4[i], more.span_4[j]] = [more.span_4[j], more.span_4[i]];
    }
    runInAction(() => {
      this.moreKills.span_2 = more.span_2 || [];
      this.moreKills.span_4 = more.span_4 || [];
      this.moreKills.loading = false;
    });
  }

  /**
   * 为你推荐
   */
  @observable refFloors = {
    list: [],
    loading: false,
  };
  @action async getRefFloors() {
    // 请求数据
    if (this.refFloors.list.length >= 200 || this.refFloors.loading) {
      return;
    }
    this.refFloors.loading = true;
    const floor = await getRefFloor();
    floor.forEach((f) => {
      f.id = Math.random().toString(36);
    });
    // 打乱顺序
    for (let i = 0; i < 5; i++) {
      let j = Math.floor(Math.random() * 5) + 5;
      // 交换
      [floor[i], floor[j]] = [floor[j], floor[i]];
    }
    runInAction(() => {
      this.refFloors.list = [...this.refFloors.list, ...floor];
      this.refFloors.loading = false;
    });
  }
}

// 使用hooks
const store = new HomeStore();

export default store;
