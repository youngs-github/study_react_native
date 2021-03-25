import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../../store';

// 类型
type TProps = TStore;

// 更多秒杀
function MoreKill({ homeStore }: TProps) {
  // 初始化
  useEffect(() => {
    // 请求
    homeStore.getMoreKills();
  }, [homeStore]);

  const { moreKills } = homeStore;
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {/* 两列结构 */}
        {moreKills.span_2.map((item) => (
          <View style={styles.span_2} key={item.id}>
            <View style={styles.span_2_title}>
              <Text style={styles.mainTitle}>{item.name}</Text>
              <Text style={styles.metaTitle}>{item.meta}</Text>
            </View>
            <View style={styles.span_2_images}>
              {item.images &&
                item.images.map((image) => (
                  <Image
                    source={{
                      uri: image.image,
                    }}
                    key={image.id}
                    style={styles.span_2_image}
                  />
                ))}
            </View>
          </View>
        ))}
      </View>
      <View style={styles.row}>
        {/* 四列结构 */}
        {moreKills.span_4.map((item) => (
          <View style={styles.span_4} key={item.id}>
            <View style={styles.span_4_title}>
              <Text style={styles.mainTitle}>{item.name}</Text>
              <Text style={styles.metaTitle}>{item.meta}</Text>
            </View>
            <View style={styles.span_2_images}>
              {item.images &&
                item.images.map((image) => (
                  <Image
                    source={{
                      uri: image.image,
                    }}
                    key={image.id}
                    style={styles.span_2_image}
                  />
                ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
    margin: 12,
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexGrow: 1,
    flexBasis: 140,
    flexDirection: 'row',
  },
  span_2: {
    padding: 8,
    flexGrow: 1,
    flexBasis: 100,
  },
  span_4: {
    flexGrow: 1,
    flexBasis: 50,
  },
  span_2_title: {
    paddingLeft: 2,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  metaTitle: {
    color: '#666771',
    fontSize: 13,
  },
  span_2_images: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  span_2_image: {
    width: 80,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  span_4_title: {
    marginTop: 5,
    paddingLeft: 10,
  },
});

export default inject('homeStore')(observer(MoreKill));
