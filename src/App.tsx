import React, {useCallback, useEffect, useState} from 'react';
import {Alert, PermissionsAndroid, Platform, StatusBar} from 'react-native';
import {Provider} from 'mobx-react';

import AppRoot from './router/app-root';

import stores from './store';

/**
 * App组件
 * 1、申请权限
 * 2、检测更新
 */
export default function App() {
  // 已授权
  const [granted, setGranted] = useState(false);
  // 申请方法
  const checkPermissons = useCallback(async () => {
    const array = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ];
    const grants = await PermissionsAndroid.requestMultiple(array);
    for (let key in grants) {
      if (grants[key] !== 'granted') {
        // 继续申请
        return checkPermissons();
      }
    }
    // 完成
    setGranted(true);
  }, []);
  // 申请权限
  useEffect(() => {
    if (Platform.OS) {
      setGranted(true);
    } else {
      checkPermissons();
    }
    // 检测更新
    // 暂时不会
  }, []);

  return granted ? (
    <Provider {...stores}>
      {/* 进度 */}
      <StatusBar />
      {/* 路由 */}
      <AppRoot />
    </Provider>
  ) : null;
}
