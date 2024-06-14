import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Section from '../Section';
import {COLORS} from '../../../constants/colors';
import {Divider} from '@rneui/base';
const AboutMe = ({about}: any) => {
  return (
    <View style={{marginTop: 15}}>
      <Section
        fromEdit
        label="About Me"
        iconLeft="person-circle-outline"
        iconRight={
          about && about.trim().length > 0 ? 'create-outline' : 'add-outline'
        }
        navigationScreen="AboutMeScreen"
      />
      {about && (
        <View style={styles.about}>
          <Divider style={{marginTop: -10, marginBottom: 10}} />
          <Text numberOfLines={4} style={styles.text}>
            {about}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AboutMe;

const styles = StyleSheet.create({
  about: {
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
  text: {
    textAlign: 'justify',
    color: COLORS.dark,
    lineHeight: 21,
    fontFamily: 'DMSans-SemiBold',
  },
});
