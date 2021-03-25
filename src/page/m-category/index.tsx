import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../store';

import TabList from './comp/tab-list';
import LinkList from './comp/link-list';
import Search from '../component/search';

// 类型
type TProps = TStore;

// 分类
function Category({ appStore, categoryStore }: TProps) {
  // 请求数据
  useEffect(() => {
    categoryStore.getCategories();
    return reaction(
      () => categoryStore.tabs.active,
      (id) => {
        categoryStore.getCategoryLink(id);
      },
    );
  }, [categoryStore]);

  return (
    <View style={styles.wrapper}>
      {/* 搜索栏 */}
      <Search theme={false} />
      {/* 滚动区 */}
      <View style={appStore.search.type === 0 ? styles.box : styles.hidden}>
        {/* 左侧导航 */}
        <TabList />
        {/* 右侧列表 */}
        <LinkList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#f6f6f6',
  },
  hidden: {
    display: 'none',
  },
  box: {
    flex: 1,
    height: 200,
    flexDirection: 'row',
  },
});

export default inject('appStore', 'categoryStore')(observer(Category));
