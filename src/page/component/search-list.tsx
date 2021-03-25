import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../store';

// 类型
type TProps = TStore;

// 顶部搜索
function SearchList({ appStore }: TProps) {
  // 请求数据
  useEffect(() => {
    // 请求
    appStore.getSearchBase();
  }, []);

  const { search } = appStore;
  return (
    <>
      {/* 搜索内容 */}
      <View style={search.type === 1 ? styles.searchKey : styles.searchKey2}>
        {/* 搜索历史 */}
        <View style={styles.history}>
          <View style={styles.historyHead}>
            <Text style={styles.historyHeadText}>最近搜索</Text>
          </View>
          <View style={styles.historyTags}>
            {search.history.map((h) => (
              <Text style={styles.searchTag} key={h.id}>
                {h.name}
              </Text>
            ))}
          </View>
        </View>
        {/* 热门搜索 */}
        <View style={styles.hotList}>
          <View style={styles.hotListHead}>
            <Text style={styles.hotListHeadText}>热门搜索</Text>
          </View>
          <View style={styles.hotListTags}>
            {search.hots.map((h) => (
              <Text style={[styles.searchTag, styles.searchTagHot]} key={h.id}>
                {h.name}
              </Text>
            ))}
          </View>
        </View>
      </View>
      {/* 搜索列表 */}
      <View style={search.type === 2 ? styles.searchList : styles.searchList2}>
        {search.list.map((li) => (
          <View style={styles.searchListItem} key={li.id}>
            <View style={styles.searchListText}>
              <Text style={styles.searchListName}>{li.key}</Text>
            </View>
            <View style={styles.searchListTags}>
              {li.tags.map((t) => (
                <Text style={styles.searchListTag} key={t}>
                  {t}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchKey: {
    minHeight: 260,
    backgroundColor: '#fff',
  },
  searchKey2: {
    display: 'none',
  },
  history: {
    marginTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  historyHead: {
    paddingBottom: 10,
  },
  historyHeadText: {
    color: '#232326',
    fontSize: 15,
  },
  historyTags: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  hotList: {
    marginTop: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },
  hotListHead: {
    marginTop: 15,
    paddingBottom: 10,
  },
  hotListHeadText: {
    color: '#232326',
    fontSize: 15,
  },
  hotListTags: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  searchTag: {
    color: '#686868',
    fontSize: 12,
    marginRight: 10,
    marginBottom: 10,
    paddingTop: 3,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 3,
    borderRadius: 3,
    backgroundColor: '#f0f2f5',
  },
  searchTagHot: {
    color: '#e93b3d',
  },
  searchList: {
    minHeight: 260,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  searchList2: {
    display: 'none',
  },
  searchListItem: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderBottomColor: '#f7f7f7',
    borderBottomWidth: 1,
  },
  searchListText: {
    flex: 1,
    flexBasis: 200,
    flexShrink: 2,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  searchListName: {
    color: '#232326',
  },
  searchListTags: {
    flex: 1,
    flexBasis: 200,
    flexShrink: 1,
    paddingLeft: 15,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchListTag: {
    color: '#686868',
    height: 26,
    lineHeight: 22,
    marginRight: 10,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    backgroundColor: '#f0f2f5',
  },
});

export default inject('appStore')(observer(SearchList));
