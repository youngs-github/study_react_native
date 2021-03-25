import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../../store';

// 类型
type TProps = {
  tab: any;
} & TStore;

// 分类元组
function TabItem({ categoryStore, tab }: TProps) {
  // 切换分类
  const onpress = useCallback(() => {
    categoryStore.selectCategory(tab.id);
  }, [categoryStore, tab]);

  const { active } = categoryStore.tabs;
  return (
    <Pressable onPress={onpress} style={[styles.item, active === tab.id && styles.itemActive]} key={tab.id}>
      <Text style={[styles.itemText, active === tab.id && styles.itemTextActive]}>{tab.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  itemActive: {
    backgroundColor: '#fff',
  },
  itemText: {
    color: '#333',
  },
  itemTextActive: {
    color: '#e93b3d',
  },
});

export default inject('categoryStore')(observer(TabItem));
