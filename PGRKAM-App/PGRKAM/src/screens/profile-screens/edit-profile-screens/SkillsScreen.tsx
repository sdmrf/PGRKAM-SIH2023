import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../components/custom-widgets/CustomText';
import {Input} from '@rneui/base';
import {COLORS} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../components/custom-widgets/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {handleUpdate} from '../../../utils/update';
import {setProfileData} from '../../../redux/slices/profileSlice';
const SkillsScreen = ({navigation}: any) => {
  const {email, skills: allSkills} = useSelector((state: any) => state.profile);
  const [inputValue, setInputValue] = useState<any>();
  const [skills, setSkills] = useState<any>(allSkills);
  const dispatch = useDispatch();
  const route = useRoute();
  const isFromHome = route.params;

  const inputSubmit = () => {
    if (inputValue.trim().length > 0) {
      setSkills([...skills, inputValue]);
      setInputValue('');
    }
  };

  const saveSkills = async () => {
    const updatedData = await handleUpdate(email, {skills: skills});
    dispatch(setProfileData(updatedData));
    if (isFromHome) {
      navigation.navigate('ExperienceScreen', {
        isFromHome: true,
      });
    } else navigation.goBack();
  };

  const removeTag = (ind: number) => {
    setSkills(
      skills.filter((skill: string, skillInd: number) => {
        return ind != skillInd;
      }),
    );
  };
  return (
    <View style={{flex: 1}}>
      {!isFromHome ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.back}>
            <MaterialCommunityIcons
              name="arrow-left"
              color={COLORS.dark}
              size={25}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.back}></View>
      )}
      <CustomText label="Add Skills" customStyle={styles.titleStyle} />
      <View style={styles.skills}>
        <Input
          style={[styles.inputStyle]}
          placeholder="Enter skills"
          onChangeText={(value: any) => {
            setInputValue(value);
          }}
          inputContainerStyle={{borderBottomWidth: 0}}
          returnKeyType="search"
          autoFocus={true}
          value={inputValue}
          onSubmitEditing={inputSubmit}
          clearButtonMode="while-editing"
        />
        {skills.map((tag: string, ind: number) => (
          <View style={styles.tag} key={ind}>
            <Text style={{color: COLORS.dark}}>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(ind)}>
              <Icon
                name="close-outline"
                color={COLORS.dark}
                style={{padding: 1}}
                size={20}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.bottomButton}>
        <CustomButton
          label="Save"
          customStyle={{backgroundColor: COLORS.dark}}
          onPress={saveSkills}
        />
      </View>
    </View>
  );
};

export default SkillsScreen;

const styles = StyleSheet.create({
  inputStyle: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginLeft: -10,
    fontSize: 20,
    borderRadius: 8,
    marginBottom: -20,
    borderBottomWidth: 1,
    borderColor: '#cdcccc',
    backgroundColor: COLORS.white,
  },
  skills: {
    paddingHorizontal: 13,
    paddingBottom: 25,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    shadowColor: '#000',
    marginHorizontal: '0%',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 11.25,
    shadowRadius: 11.84,
  },
  tag: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#ededed',
  },
  titleStyle: {
    fontSize: 25,
    color: COLORS.title,
    fontFamily: 'DMSans-Bold',
    marginBottom: 20,
    marginHorizontal: 13,
  },
  back: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    color: COLORS.dark,
  },
  bottomButton: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
  },
});
