import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../../store';

import Timer from './timer';

// 类型
type TProps = TStore;

// 秒杀
function SecKill({ homeStore }: TProps) {
  // 请求秒杀商品
  useEffect(() => {
    // 请求
    homeStore.getSecKills();
  }, [homeStore]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleBox}>
        <View style={styles.title}>
          <Text>某某秒杀</Text>
        </View>
        <View style={styles.clock}>
          {/* 计时器 */}
          <Timer time={homeStore.secKills.time} />
        </View>
        <View style={styles.more}>
          <Text style={styles.moreText}>更多秒杀</Text>
          <Icon name={'angle-right'} style={styles.moreIcon} />
        </View>
      </View>
      <View style={styles.listBox}>
        {homeStore.secKills.list.map((kill) => (
          <View key={kill.id} style={styles.killItem}>
            <Image source={{ uri: kill.image }} style={styles.image} />
            <Text style={styles.price}>¥ {kill.price}</Text>
            <Text style={styles.original}>¥ {kill.original}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  titleBox: {
    height: 36,
    paddingLeft: 12,
    flexDirection: 'row',
  },
  title: {
    flex: 0,
    color: '#333',
    flexBasis: 100,
    paddingTop: 6,
    flexDirection: 'row',
  },
  clock: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  more: {
    flex: 0,
    flexBasis: 140,
    paddingTop: 6,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  moreText: {
    color: '#fa2c19',
  },
  moreIcon: {
    color: '#fff',
    width: 20,
    height: 20,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 1,
    marginLeft: 8,
    borderRadius: 15,
    backgroundColor: '#fa2c19',
  },
  listBox: {
    height: 142,
    paddingTop: 2,
    flexDirection: 'row',
  },
  killItem: {
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
  },
  price: {
    color: '#f2270c',
    marginTop: 8,
  },
  original: {
    color: '#999',
    marginTop: 2,
    textDecorationColor: '#999',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

export default inject('homeStore')(observer(SecKill));
