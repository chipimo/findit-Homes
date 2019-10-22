import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import notificationScreen from '../screens/notification'
import inboxScreen from '../screens/inbox'
import menuScreen from '../screens/menu'
import LoginScreen from '../screens/LoginScreen'
import chatScreen from '../screens/chat'
import BarcodeScanner from '../screens/qrcode'




 const Tabs = createMaterialBottomTabNavigator(
  {
    Explore: { 
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={'ios-search'}/> 
        ),
      }
    },
    Notification: { 
      screen: notificationScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={'ios-notifications'}/>
        ),
      }
     },
    Inbox: {
       screen: inboxScreen,
       navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={'ios-chatbubbles'}/>
        ),
      } 
    },

    More: { 
      screen: menuScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={'ios-menu'}/>
        ),
      } 
    },
    
  },
  {
    initialRouteName: 'Explore',
    activeColor: '#889e00',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#fff' },
  }
);

const StackNav = createStackNavigator({
  Tabs: Tabs,
  LinksScreen: LinksScreen,
  chatScreen: chatScreen,
  LoginScreen: LoginScreen, 
  BarcodeScanner: BarcodeScanner,  
  
},{
  defaultNavigationOptions:{
    header:null  
  }
  
});

export default StackNav


