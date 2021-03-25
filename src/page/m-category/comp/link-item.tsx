import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

// 分类详情元组
function LinkItem({ link }) {
  return (
    <View style={styles.wrapper} key={link.id}>
      <Image source={{ uri: link.image }} style={styles.image} />
      <Text style={styles.text}>{link.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 130,
    flexBasis: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    color: '#333',
  },
});

export default LinkItem;
