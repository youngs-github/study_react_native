import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import { TStore } from '../../../store';

// 类型
type TProps = TStore;

// 为你推荐
function RecFloor({ homeStore }: TProps) {
  // 监听滚动变化
  useEffect(() => {
    // 请求
    homeStore.getRefFloors();
    return reaction(
      () => homeStore.scrollTop,
      () => {
        // 更新
        if (!homeStore.refFloors.loading) {
          homeStore.getRefFloors();
        }
      },
    );
  }, [homeStore]);

  // 组织icon
  // 0-无、1-超市、2-自有、3-国际、4-精选
  const calcIcon = ({ icon, name }) => {
    let iconNums = 0;
    let iconMenu = null;
    if (icon === 1) {
      iconNums = 14;
      iconMenu = <Text style={styles.icon}>XX超市</Text>;
    }
    if (icon === 2) {
      iconNums = 10;
      iconMenu = <Text style={styles.icon}>自营</Text>;
    }
    if (icon === 3) {
      iconNums = 14;
      iconMenu = <Text style={styles.icon}>XX国际</Text>;
    }
    if (icon === 4) {
      iconNums = 14;
      iconMenu = <Text style={styles.icon}>XX精选</Text>;
    }
    return (
      <>
        {iconMenu}
        <Text numberOfLines={2} style={styles.text}>
          {iconNums > 0 && ' '.repeat(iconNums)}
          {name}
        </Text>
      </>
    );
  };
  // 组织paicon
  // 0-无、1-新品、2-闪购、3-满减
  const calcPaicon = (paicon) => {
    let name = '';
    if (paicon === 1) {
      name = '新品';
    }
    if (paicon === 2) {
      name = '闪购';
    }
    if (paicon === 3) {
      name = '满减';
    }
    return name ? <Text style={styles.paicon}>{name}</Text> : null;
  };
  // 组织source
  const calcSource = (source) => {
    if (source) {
      return (
        <>
          <Text style={styles.source}>¥ {source.price}</Text>
          <Text style={styles.sourceIcon}>PLUS</Text>
        </>
      );
    }
    return null;
  };

  const { refFloors } = homeStore;
  return (
    <View style={styles.wrapper}>
      {refFloors.list.map((f) => (
        <View style={styles.itemBox} key={f.id}>
          <View style={styles.item}>
            {/* 图片 */}
            <View style={styles.imageBox}>
              <Image source={{ uri: f.image }} style={styles.image} />
            </View>
            {/* 详情 */}
            <View style={styles.textBox}>{calcIcon(f)}</View>
            {/* 价格 */}
            <View style={styles.priceBox}>
              <Text style={styles.price}>¥ {f.price}</Text>
              {calcPaicon(f.paicon)}
              <Text style={styles.similar}>看相似</Text>
            </View>
            {/* 会员 */}
            <View style={styles.sourceBox}>{calcSource(f.source)}</View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: -5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  itemBox: {
    padding: 5,
    flexGrow: 1,
    flexBasis: 200,
  },
  item: {
    height: 320,
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  imageBox: {
    flexBasis: 220,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textBox: {
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row',
  },
  icon: {
    top: 2,
    left: 10,
    color: '#fff',
    fontSize: 10,
    position: 'absolute',
    textAlign: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 2,
    backgroundColor: '#ff0000',
  },
  text: {
    fontSize: 13,
    flexDirection: 'row',
  },
  priceBox: {
    marginTop: 3,
    flexDirection: 'row',
  },
  price: {
    color: '#fa2c19',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  paicon: {
    color: '#fa2c19',
    height: 18,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 2,
    marginLeft: 10,
    borderRadius: 3,
    paddingLeft: 3,
    paddingRight: 3,
    borderColor: '#fa2c19',
    borderWidth: 1,
  },
  similar: {
    color: '#808080',
    right: 0,
    fontSize: 13,
    position: 'absolute',
    textAlign: 'center',
    paddingTop: 3,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 3,
    backgroundColor: '#f0f2f5',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  sourceBox: {
    marginTop: 3,
    flexDirection: 'row',
  },
  source: {
    color: '#232326',
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  sourceIcon: {
    color: '#d9cf7e',
    height: 12,
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 11,
    marginTop: 4,
    marginLeft: 10,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 3,
    backgroundColor: '#232326',
  },
});

export default inject('homeStore')(observer(RecFloor));
