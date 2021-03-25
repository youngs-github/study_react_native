import {createRef} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

/**
 * 路由导航
 */
export const navigationRef = createRef<NavigationContainerRef>();

export function navigate(name, params?) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}
