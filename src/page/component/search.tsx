import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../store';

import { debounce } from '../../util';

import SearchList from './search-list';

// 类型
type TProps = {
  theme: boolean;
} & TStore;

// 顶部搜索
function Search({ appStore, theme }: TProps) {
  // 输入内容
  const textRef = useRef<string>('');
  // 输入框
  const inputRef = useRef<TextInput>();

  // 搜索方法
  const doSearch = useCallback(
    debounce((text) => {
      appStore.getSearchList(text);
    }),
    [],
  );
  // 鼠标移入
  const onfocus = useCallback(() => {
    if (appStore.search.type < 1) {
      appStore.setSearchType(1);
    }
  }, [appStore]);
  // 返回上层
  const onpress = useCallback(() => {
    if (appStore.search.type > 0) {
      inputRef.current.clear();
      appStore.setSearchType(0);
    }
  }, [appStore]);
  // 按钮搜索
  const onsearch = useCallback(() => {
    // 过滤
    if (!appStore.search.history.find((h) => h.name === textRef.current)) {
      appStore.addSearchHistory(textRef.current);
    }
  }, [appStore]);
  // 内容改变
  const onchangetext = useCallback((text) => {
    textRef.current = text;
    const { search } = appStore;
    // 搜索内容
    if (text) {
      doSearch(text);
      if (search.type !== 2) {
        appStore.setSearchType(2);
      }
    } else if (search.type === 2) {
      appStore.setSearchType(1);
    }
  }, []);
  // 回车搜索
  const onsubmitediting = useCallback(({ nativeEvent: { text } }) => {
    // 过滤
    if (!appStore.search.history.find((h) => h.name === textRef.current)) {
      appStore.addSearchHistory(text);
    }
  }, []);

  // 请求数据
  useEffect(() => {
    // 监听
    return reaction(
      () => appStore.search.type,
      (type) => {
        // 输入聚焦
        if (type > 0) {
          inputRef.current?.focus();
        } else {
          inputRef.current?.blur();
        }
      },
    );
  }, []);

  const { search } = appStore;
  console.log('type', search.type);

  return (
    <>
      {/* 默认风格 */}
      <View style={search.type < 1 ? (theme ? styles.textInput : styles.textInput2) : styles.hidden}>
        <Pressable onPress={onpress} style={styles.left}>
          {theme ? (
            <Icon name={'navicon'} style={styles.leftIcon} />
          ) : (
            <Icon name={'angle-left'} style={styles.leftIcon2} />
          )}
        </Pressable>
        {/* 搜索框 */}
        <View style={styles.center}>
          {/* 输入框 */}
          <View style={styles.searchBox}>
            <Icon name={'search'} style={styles.searchIcon} />
            <TextInput onFocus={onfocus} placeholder={'搜索'} style={styles.searchInput}></TextInput>
          </View>
        </View>
        {/* 登录 */}
        <View style={styles.right}>
          {theme ? <Text style={styles.rightButton}>登录</Text> : <Icon name={'ellipsis-h'} style={styles.leftIcon3} />}
        </View>
      </View>
      {/* 输入风格 */}
      <View style={search.type > 0 ? styles.textInput2 : styles.hidden}>
        <Pressable onPress={onpress} style={styles.left}>
          <Icon name={'angle-left'} style={styles.leftIcon2} />
        </Pressable>
        {/* 搜索框 */}
        <View style={styles.center}>
          <View style={styles.searchBox}>
            <Icon name={'search'} style={styles.searchIcon} />
            {/* 输入框 */}
            <TextInput
              blurOnSubmit={true}
              onFocus={onfocus}
              onChangeText={onchangetext}
              onSubmitEditing={onsubmitediting}
              placeholder={'搜索'}
              style={styles.searchInput}
              ref={inputRef}
            />
          </View>
        </View>
        {/* 登录 */}
        <View style={styles.right}>
          <Pressable onPress={onsearch}>
            <View style={styles.rightButton2}>
              <Text style={styles.rightButton2Text}>搜索</Text>
            </View>
          </Pressable>
        </View>
      </View>
      {/* 搜索列表 */}
      <SearchList />
    </>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
  textInput: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: '#c82519',
  },
  textInput2: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
  },
  left: {
    flexBasis: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    color: '#fff',
    margin: 'auto',
    fontSize: 28,
  },
  leftIcon2: {
    color: '#686868',
    margin: 'auto',
    fontSize: 40,
    fontWeight: 'bold',
  },
  leftIcon3: {
    color: '#686868',
    margin: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    flex: 0,
    height: 40,
    flexGrow: 1,
    flexShrink: 1,
    marginTop: 8,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
  },
  searchBox: {
    height: 40,
    paddingLeft: 12,
    paddingRight: 2,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
  },
  searchIcon: {
    color: '#ccc',
    width: 28,
    height: 24,
    fontSize: 22,
  },
  searchInput: {
    flex: 1,
    height: 36,
    flexBasis: 'auto',
    lineHeight: 26,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },
  right: {
    flexBasis: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    color: '#fff',
    fontSize: 15,
  },
  rightButton2: {
    paddingTop: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 6,
    borderRadius: 4,
    backgroundColor: '#e93b3d',
  },
  rightButton2Text: {
    color: '#fff',
    fontSize: 15,
  },
});

export default inject('appStore')(observer(Search));
