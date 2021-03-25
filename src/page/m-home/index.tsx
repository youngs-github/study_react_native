import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, Dimensions, View, RefreshControl } from 'react-native';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../store';

import Search from '../component/search';
import TopProduct from './comp/top-product';
import QuickNav from './comp/quick-nav';
import SecKill from './comp/sec-kill';
import MoreKill from './comp/more-kill';
import RefFloor from './comp/rec-floor';
import Backtop from '../component/backtop';

// 类型
type TProps = TStore;

// 首页
function Home({ appStore, homeStore }: TProps) {
  // 滚动组件
  const scrollViewRef = useRef<ScrollView>(null);
  // 滚动事件
  const onscroll = useCallback(
    ({ nativeEvent: { contentSize, contentOffset } }) => {
      const { height } = Dimensions.get('window');
      if (contentSize.height - height <= contentOffset.y - 60) {
        homeStore.setScrollTop(Date.now());
      }
      if (homeStore.backtop && contentOffset.y < height * 2.5) {
        homeStore.setBacktop(false);
      }
      if (!homeStore.backtop && contentOffset.y > height * 2.5) {
        homeStore.setBacktop(true);
      }
    },
    [homeStore],
  );
  // 刷新数据
  const onrefresh = useCallback(() => {
    homeStore.getRefreshing();
  }, [homeStore]);
  // 返回顶部
  useEffect(() => {
    return reaction(
      () => homeStore.backtop,
      () => {
        if (!homeStore.backtop) {
          scrollViewRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
        }
      },
    );
  }, [homeStore]);

  const { search } = appStore;
  return (
    <View style={styles.wrapper}>
      {/* 搜索栏 */}
      <Search theme={true} />
      {/* 回顶部 */}
      <Backtop store={homeStore} />
      {/* 滚动区 */}
      <ScrollView
        refreshControl={
          // 刷新
          <RefreshControl refreshing={homeStore.refreshing} onRefresh={onrefresh} />
        }
        onScroll={onscroll}
        ref={scrollViewRef}
        style={search.type === 0 ? styles.scroll : styles.hidden}
      >
        {/* 轮播图 */}
        <TopProduct />
        {/* 快速导航 */}
        <QuickNav />
        {/* 秒杀系列 */}
        <SecKill />
        {/* 更多秒杀 */}
        <MoreKill />
        {/* 为你推荐 */}
        <RefFloor />
      </ScrollView>
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
  scroll: {},
});

export default inject('appStore', 'homeStore')(observer(Home));
