import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../../store';

import LinkItem from './link-item';

// 类型
type TProps = TStore;

// 分类详情
function TabLink({ categoryStore }: TProps) {
  const { links } = categoryStore;
  return (
    <ScrollView style={styles.wrapper}>
      {links.list.map((link) => (
        <View style={styles.link} key={link.id}>
          <Text style={styles.linkName}>{link.name}</Text>
          <View style={styles.linkList}>
            {link.items.map((item) => (
              <LinkItem link={item} key={item.id} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexBasis: 320,
    backgroundColor: '#fff',
  },
  link: {
    paddingTop: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
  linkName: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  linkList: {
    padding: 5,
    marginTop: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default inject('categoryStore')(observer(TabLink));
