import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginPage from '../page/login';
import RegisterPage from '../page/register';

const {Navigator, Screen} = createStackNavigator();

// 注册/登录页
function AuthNavigator() {
  return (
    <Navigator screenOptions={{headerBackTitle: '返回'}}>
      <Screen
        name="login"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Screen
        name="register"
        component={RegisterPage}
        options={{headerShown: false}}
      />
    </Navigator>
  );
}

export default AuthNavigator;
