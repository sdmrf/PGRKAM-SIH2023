import {StyleSheet, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {COLORS} from '../../constants/colors';
import CustomText from '../custom-widgets/CustomText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Section from './Section';

const DashMenu = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={{marginTop: 15}}>
      <Section
        fromEdit={false}
        iconLeft="person-circle-outline"
        iconRight="chevron-forward-outline"
        label="My Profile"
        navigationScreen="ProfileInfoScreen"
      />
      <Section
        fromEdit={false}
        iconLeft="bookmark-outline"
        iconRight="chevron-forward-outline"
        label="My Applications"
        navigationScreen="AppliedJobsScreen"
      />
      <Section
        fromEdit={false}
        iconLeft="search"
        iconRight="chevron-forward-outline"
        label="Find Jobs"
        navigationScreen="AllJobsScreen"
      />
    </View>
  );
};

export default DashMenu;

const styles = StyleSheet.create({
  menu: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: 10,
    marginHorizontal: '3%',
    borderRadius: 10,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 11.25,
    shadowRadius: 11.84,
  },
  label: {
    fontSize: 18,
    color: COLORS.title,
    borderRadius: 15,
    fontFamily: 'DMSans-SemiBold',
  },
  menuLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  forward: {
    backgroundColor: COLORS.orange,
    borderRadius: 20,
  },
});
