import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Section from '../Section';
import {COLORS} from '../../../constants/colors';
import {Divider} from '@rneui/base';
import Icon from 'react-native-vector-icons/Ionicons';

const Languages = ({languages}: any) => {
  return (
    <View style={{marginTop: 5}}>
      <Section
        fromEdit
        label="Languages"
        iconLeft="language-outline"
        iconRight={
          languages && languages.length == 0 ? 'add-outline' : 'create-outline'
        }
        navigationScreen="LanguageScreen"
      />
      {languages && languages.length > 0 && (
        <Divider
          style={{marginTop: -15, marginBottom: 5, marginHorizontal: '6%'}}
        />
      )}
      <View
        style={[
          styles.langoages,
          {paddingBottom: languages.length > 0 ? 25 : 0},
        ]}>
        {languages &&
          languages.map((tag: string, ind: number) => (
            <View style={styles.tag} key={ind}>
              <Text style={{color: COLORS.dark}}>{tag}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default Languages;

const styles = StyleSheet.create({
  langoages: {
    paddingHorizontal: 20,
    paddingTop: 12,
    marginHorizontal: '3%',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
  tag: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#ededed',
  },
  more: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: COLORS.dark,
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    marginTop: 10,
  },
});
