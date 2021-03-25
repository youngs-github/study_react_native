import React, { useCallback } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react';

// 类型
type TProps = {
  store: any;
};

// 锚点
function Backtop({ store }: TProps) {
  // 点击事件
  const onpress = useCallback(() => {
    store.setBacktop(false);
  }, [store]);

  return (
    <View style={store.backtop ? styles.wrapper : styles.none}>
      <Pressable onPress={onpress}>
        <View style={styles.box}>
          <Icon name={'arrow-up'} style={styles.icon} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    right: 15,
    bottom: 15,
    zIndex: 10,
    position: 'absolute',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  none: {
    display: 'none',
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#666',
    fontSize: 18,
    marginTop: 6,
    marginRight: 2,
    paddingTop: 2,
    borderTopColor: '#666',
    borderTopWidth: 3,
  },
});

export default observer(Backtop);
