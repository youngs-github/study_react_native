import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomePage from '../page/m-home';
import CartPage from '../page/m-cart';
import CatePage from '../page/m-category';
import UserPage from '../page/m-user';
import {StyleSheet} from 'react-native';

const {Navigator, Screen} = createBottomTabNavigator();

// 业务页
function MainNavigator() {
  return (
    <Navigator
      screenOptions={({route}) => ({
        tabBarIcon({color, size}) {
          const routeName = route.name;
          let iconName = '';
          if (routeName === 'home') {
            iconName = 'home';
          } else if (routeName === 'cart') {
            iconName = 'shopping-cart';
          } else if (routeName === 'cate') {
            iconName = 'compass';
          } else if (routeName === 'user') {
            iconName = 'user';
          }
          return <Icon name={iconName} size={size} color={color!} />;
        },
      })}
      tabBarOptions={{
        style: styles.wrapper,
        labelStyle: styles.label,
        activeTintColor: '#ff0000',
        inactiveTintColor: '#888',
      }}>
      <Screen name="home" component={HomePage} options={{title: '首页'}} />
      <Screen name="cate" component={CatePage} options={{title: '分类'}} />
      <Screen name="cart" component={CartPage} options={{title: '购物车'}} />
      <Screen name="user" component={UserPage} options={{title: '我'}} />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
  },
  label: {
    paddingBottom: 5,
  },
});

export default MainNavigator;
