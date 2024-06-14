import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/HomeScreen';
import {COLORS} from '../constants/colors';
import {StyleSheet} from 'react-native';
import HomeStack from './HomeStack';
import NotificationScreen from '../screens/NotificationScreen';
import ARScanning from '../screens/ar-screen/ARScanning';
export type AppStackParamList = {
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createMaterialBottomTabNavigator();

export const AppStack = () => {
  return (
    <Tab.Navigator
      // labeled={false}
      initialRouteName="Feed"
      activeColor={COLORS.primary}
      barStyle={styles.tabBarStyle}>
      <Tab.Screen
        name="Feed"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={33}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="apps" color={color} size={30} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Camera"
        component={ARScanning}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="camera-outline"
              color={color}
              size={33}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Messages"
        component={Home}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="message-outline"
              color={color}
              size={33}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={33}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth: 1,
    backgroundColor: COLORS.light,
    borderTopColor: '#cdcccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
