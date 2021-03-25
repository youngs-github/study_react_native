import React, {useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useStore} from '../store';

import {navigate} from '../util/navigator';

// 登录页
function Login() {
  const {appStore} = useStore();
  // 表单数据
  const formRef = useRef({
    username: '123456',
    password: '123456',
  });
  const onUsernameChange = useCallback(
    text => {
      formRef.current.username = text;
    },
    [formRef],
  );
  const onPasswordChange = useCallback(
    text => {
      formRef.current.password = text;
    },
    [formRef],
  );
  // 提交
  const onpress = useCallback(async () => {
    await appStore.login({
      username: formRef.current.username,
      password: formRef.current.password,
    });
  }, [appStore, formRef]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.formBox}>
        <View style={styles.formItem}>
          <Input
            autoCapitalize="none"
            leftIcon={<Icon name="user" style={styles.icon} />}
            onChangeText={onUsernameChange}
            placeholder="用户名"
            value={formRef.current.username}
            style={styles.input}
          />
        </View>
        <View style={styles.formItem}>
          <Input
            leftIcon={<Icon name="lock" style={styles.icon} />}
            onChangeText={onPasswordChange}
            placeholder="密码"
            secureTextEntry
            value={formRef.current.password}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.btnBox}>
        <Button title="提交" onPress={onpress} buttonStyle={styles.btn} />
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
  },
  btn: {
    width: 120,
    height: 54,
  },
});

export default Login;
