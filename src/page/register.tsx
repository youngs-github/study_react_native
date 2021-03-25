import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useStore} from '../store';

// 注册页
function Register() {
  const route = useRoute();
  const navigation = useNavigation();

  const [state, setState] = useState({});

  const clear = useCallback(() => {
    route.params = {};
    setState({});
  }, []);
  const press = useCallback(() => {
    navigation.navigate('login', {
      setState,
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.formBox}>
        <Text>路由参数(路由跳转)：{JSON.stringify(route.params, null, 4)}</Text>
        <Text>路由参数(传递setState)：{JSON.stringify(state, null, 4)}</Text>
        <Text>全局状态(redux/mobx)：{JSON.stringify('省略', null, 4)}</Text>
      </View>
      <View style={styles.btnBox}>
        <Button title="清空" onPress={clear} buttonStyle={styles.btn} />
        <Button title="跳转" onPress={press} buttonStyle={styles.btn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  formBox: {
    width: 300,
    padding: 20,
    backgroundColor: '#ddd',
  },
  formItem: {},
  icon: {
    color: '#666',
    fontSize: 28,
  },
  input: {},
  btnBox: {
    marginTop: 30,
    flexDirection: 'row',
  },
  btn: {
    width: 120,
    height: 54,
    margin: 10,
  },
});

export default Register;
