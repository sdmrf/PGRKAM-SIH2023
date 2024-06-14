import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/colors';

type TextType = {
  color: string;
  icon: string;
  label: string;
  customStyle?: any;
  comp?: any;
};

const SettingsCard = ({color, icon, label, customStyle, comp}: TextType) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <MaterialCommunityIcons
          name={icon}
          style={{color: COLORS.title}}
          size={25}
        />
        <Text
          style={[
            {
              fontFamily: 'DMSans-Medium',
              color: COLORS.title,
              paddingLeft: 10,
            },
          ]}>
          {label}
        </Text>
      </View>
      <View>{comp}</View>
    </View>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: '90%',
    borderRadius: 10,
    marginBottom: '3%',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
