import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Section from '../Section';
import {COLORS} from '../../../constants/colors';
import CustomText from '../../custom-widgets/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Education = ({education}: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={{marginTop: 5}}>
      <Section
        fromEdit
        label="Education"
        iconLeft="school-outline"
        iconRight="add-outline"
        navigationScreen="EducationScreen"
      />
      {education &&
        education.length > 0 &&
        education?.map((edu: any, ind: number) => {
          return (
            <View style={styles.education} key={ind}>
              <Divider style={{marginTop: -5, marginBottom: 5}} />
              <View style={styles.expHeader}>
                <CustomText
                  label={edu.course}
                  customStyle={{fontSize: 17, color: COLORS.title}}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('EducationScreen', edu)}>
                  <Icon name="create-outline" color={COLORS.yellow} size={30} />
                </TouchableOpacity>
              </View>
              <CustomText
                label={edu?.institute}
                customStyle={{
                  fontSize: 15,
                  color: COLORS.dark700,
                  marginTop: 5,
                }}
              />
              <CustomText
                label={`${edu.from} - ${edu.to}  \u25CF  ${
                  parseInt(edu.to.split(' ')[1]) -
                  parseInt(edu.from.split(' ')[1])
                } Years`}
                customStyle={{
                  fontSize: 15,
                  color: COLORS.dark700,
                  marginTop: 10,
                }}
              />
            </View>
          );
        })}
    </View>
  );
};

export default Education;

const styles = StyleSheet.create({
  education: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 25,
    marginHorizontal: '3%',
    marginTop: -10,
    borderRadius: 10,
    backgroundColor: COLORS.light,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 11.25,
    shadowRadius: 11.84,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
