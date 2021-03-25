import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../../store';

// 类型
type TProps = TStore;

// 快速导航
function QuickNav({ homeStore }: TProps) {
  // 初始化
  useEffect(() => {
    // 请求
    homeStore.getQuickNav();
  }, [homeStore]);

  return (
    <View style={styles.wrapper}>
      {homeStore.quickNavs.list.length > 0 ? (
        <Swiper loop={false} style={styles.swiper} paginationStyle={styles.pager}>
          {homeStore.quickNavs.list.map((mall) => (
            <View key={mall.id} style={styles.mallNav}>
              {mall.list.map((item) => (
                <View key={item.id} style={styles.item}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </Swiper>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
  },
  swiper: {
    height: 180,
  },
  mallNav: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  pager: {
    bottom: 0,
    position: 'absolute',
  },
  item: {
    flex: 0,
    width: '20%',
    flexDirection: 'column',
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 8,
  },
  name: {
    color: '#666',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default inject('homeStore')(observer(QuickNav));
