import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

// 购物车
function Cart() {
  return null;
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    padding: 10,
    borderWidth: 1,
  },
  camera: {
    width: 200,
    height: 150,
    transform: [
      {
        rotateZ: '-90deg',
      },
    ],
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 60,
    marginTop: 380,
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonItem: {
    width: 80,
    height: 30,
    margin: 10,
    textAlign: 'center',
    lineHeight: 26,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  picture: {
    left: 10,
    bottom: 20,
    width: '100%',
    height: 300,
    position: 'absolute',
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
});

export default Cart;
