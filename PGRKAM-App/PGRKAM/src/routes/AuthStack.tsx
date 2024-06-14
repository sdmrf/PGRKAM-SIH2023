import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUp from '../screens/auth-screens/SignUpScreen';
import Login from '../screens/auth-screens/LoginScreen';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
