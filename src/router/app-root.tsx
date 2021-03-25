import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import AuthNavigator from './auth-navigator';
import MainNavigator from './main-navigator';

import {useStore} from '../store';

import {navigationRef} from '../util/navigator';
import {observer} from 'mobx-react';

// 鉴权页面
function AppRoot() {
  const {appStore} = useStore();

  // 启动页
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {appStore.auth ? (
        // 已登录
        <MainNavigator />
      ) : (
        // 未登录
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

export default observer(AppRoot);
