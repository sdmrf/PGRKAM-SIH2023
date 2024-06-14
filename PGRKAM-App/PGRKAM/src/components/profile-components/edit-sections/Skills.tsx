import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Section from '../Section';
import {COLORS} from '../../../constants/colors';
import {Divider} from '@rneui/base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const Skills = () => {
  const {skills, email} = useSelector((state: any) => state.profile);
  const [totSkills, setTotSkills] = useState(7);

  return (
    <View style={{marginTop: 5}}>
      <Section
        fromEdit
        label="Skills"
        iconLeft="snow-outline"
        iconRight="create-outline"
        navigationScreen="SkillsScreen"
      />

      <Divider
        style={{marginTop: -15, marginBottom: 5, marginHorizontal: '6%'}}
      />

      <View style={styles.skills}>
        {skills &&
          skills
            .filter((tag: string, ind: any) => ind <= totSkills)
            .map((tag: string, ind: number) => (
              <View style={styles.tag} key={ind}>
                <Text style={{color: COLORS.dark}}>{tag}</Text>
              </View>
            ))}
        {skills && skills.length > 7 && totSkills != skills.length && (
          <View style={{width: '100%', alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                setTotSkills(skills?.length);
              }}>
              <Text style={styles.more}>Show More</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Skills;

const styles = StyleSheet.create({
  skills: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 25,
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
