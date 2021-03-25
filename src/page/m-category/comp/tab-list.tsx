import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../../store';

import TabItem from './tab-item';

// 类型
type TProps = TStore;

// 分类元组
function TabList({ categoryStore }: TProps) {
  return (
    <ScrollView style={styles.box}>
      {categoryStore.tabs.list.map((tab) => (
        <TabItem tab={tab} key={tab.id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexBasis: 80,
  },
});

export default inject('categoryStore')(observer(TabList));
