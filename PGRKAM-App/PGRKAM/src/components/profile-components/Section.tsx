import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {COLORS} from '../../constants/colors';
import CustomText from '../custom-widgets/CustomText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type SectionType = {
  iconLeft: string;
  iconRight: string;
  label: string;
  fromEdit: boolean;
  navigationScreen: string;
};
const Section = ({
  label,
  iconLeft,
  iconRight,
  fromEdit,
  navigationScreen,
}: SectionType) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.menu}>
      <View style={styles.menuLeft}>
        <Icon name={iconLeft} color={COLORS.yellow} size={fromEdit ? 25 : 33} />
        <CustomText label={label} customStyle={styles.label} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(navigationScreen)}>
        <Icon
          style={[
            styles.forward,
            {
              backgroundColor: fromEdit ? 'transparent' : COLORS.orange,
            },
          ]}
          name={iconRight}
          color={COLORS.yellow}
          size={33}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Section;

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
    borderRadius: 20,
  },
});
