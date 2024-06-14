import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Section from './Section';
import {COLORS} from '../../constants/colors';
import CustomText from '../custom-widgets/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Achievements = ({achievements}: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={{marginTop: 5}}>
      <Section
        fromEdit
        label="Achievements"
        iconLeft="trophy-outline"
        iconRight="add-outline"
        navigationScreen="AchievementScreen"
      />
      {achievements &&
        achievements?.length > 0 &&
        achievements.map((ach: any, ind: number) => {
          return (
            <View style={styles.about} key={ind}>
              <Divider style={{marginTop: -5, marginBottom: 5}} />
              <View style={styles.expHeader}>
                <CustomText
                  label={ach.achievement}
                  customStyle={{fontSize: 18, color: COLORS.title}}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('AchievementScreen', ach)}>
                  <Icon name="create-outline" color={COLORS.yellow} size={30} />
                </TouchableOpacity>
              </View>
              {/* <CustomText
                label={ach?.organization}
                customStyle={{
                  fontSize: 15,
                  color: COLORS.dark700,
                  marginTop: 5,
                }}
              /> */}
              <CustomText
                label={ach.date}
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

export default Achievements;

const styles = StyleSheet.create({
  about: {
    paddingTop: 5,
    marginTop: -10,
    borderRadius: 10,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowRadius: 11.84,
    shadowOpacity: 11.25,
    paddingHorizontal: 20,
    marginHorizontal: '3%',
    backgroundColor: COLORS.light,
    shadowOffset: {width: 10, height: 10},
  },
  expHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
