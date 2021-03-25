import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../../store';

// 类型
type TProps = TStore;

// 轮播图
function Slider({ homeStore }: TProps) {
  // 请求热门商品
  useEffect(() => {
    // 请求
    homeStore.getTopProduct();
  }, [homeStore]);

  return (
    <View style={styles.wrapper}>
      {homeStore.topProduct.list.length > 0 ? (
        <Swiper autoplay={true} autoplayTimeout={4} loop={true}>
          {homeStore.topProduct.list.map((image) => (
            <View key={image.id} style={styles.slider}>
              <Image source={{ uri: image.path }} style={styles.image} />
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
  slider: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default inject('homeStore')(observer(Slider));
